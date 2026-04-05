import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Parse .env.local manually to avoid dotenv dependency
const envPath = resolve(__dirname, '../.env.local')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) {
    const key = match[1].trim()
    let val = match[2].trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
      val = val.slice(1, -1)
    process.env[key] = val
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('🌱 Seeding LRSPro database...\n')

  // Step 1: Create auth users
  const users = [
    { email: 'lradmin@lrspro.com', password: 'power123', role: 'admin', full_name: 'LR Admin', phone: '(951) 555-0001', company: 'Left Right Serve & Sign Pros, LLC' },
    { email: 'tj@lrspro.com', password: 'power123', role: 'staff', full_name: 'TJ', phone: '(951) 555-0002', company: '' },
    { email: 'client@lrspro.com', password: 'power123', role: 'client', full_name: 'Sarah Johnson', phone: '(951) 555-0099', company: 'Johnson Law Group' },
  ]

  const created: Record<string, string> = {}

  // The handle_new_user trigger may cause issues — we'll handle profiles manually

  // Try using the REST API directly to create users
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  for (const u of users) {
    // Check if user already exists
    const { data: list } = await supabase.auth.admin.listUsers()
    const existing = list?.users?.find(x => x.email === u.email)

    if (existing) {
      console.log(`  ⚠ ${u.email} already exists (${existing.id.slice(0, 8)}...)`)
      created[u.role] = existing.id
    } else {
      // Use the GoTrue admin API directly
      const res = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceKey}`,
          'apikey': serviceKey,
        },
        body: JSON.stringify({
          email: u.email,
          password: u.password,
          email_confirm: true,
          user_metadata: { full_name: u.full_name },
        }),
      })
      const body = await res.json()
      if (!res.ok) {
        console.error(`  ✗ Failed to create ${u.email}:`, body.msg || body.message || JSON.stringify(body))
        continue
      }
      created[u.role] = body.id
      console.log(`  ✓ Created ${u.role}: ${u.email} (${body.id})`)
    }
  }

  if (!created.admin || !created.staff || !created.client) {
    console.error('\n✗ Missing user IDs, cannot continue.')
    process.exit(1)
  }

  // Step 2: Upsert profiles with correct roles and details
  for (const u of users) {
    const id = created[u.role]
    const { error } = await supabase.from('profiles').upsert({
      id,
      role: u.role,
      full_name: u.full_name,
      email: u.email,
      phone: u.phone,
      company: u.company,
    }, { onConflict: 'id' })
    if (error) console.error(`  ✗ Failed to upsert profile for ${u.role}:`, error.message)
    else console.log(`  ✓ Profile set: ${u.role} → ${u.full_name}`)
  }

  // Step 3: Look up Process Serving service
  const { data: service } = await supabase
    .from('services')
    .select('id, name')
    .eq('slug', 'process-serving')
    .single()

  if (!service) {
    console.error('\n✗ Process Serving service not found. Run migrations first.')
    process.exit(1)
  }
  console.log(`\n  ✓ Found service: ${service.name} (${service.id})`)

  // Step 4: Create a case
  const { data: caseData, error: caseError } = await supabase.from('cases').insert({
    client_id: created.client,
    assigned_staff_id: created.staff,
    service_id: service.id,
    service_type: 'process_serving',
    status: 'in_progress',
    priority: 'standard',
    subject_name: 'John Smith',
    subject_address: '4050 Main Street',
    subject_city: 'Riverside',
    subject_state: 'CA',
    subject_zip: '92501',
    subject_phone: '(951) 555-7890',
    court_name: 'Riverside County Superior Court',
    court_case_number: 'RIV-2024-00123',
    plaintiff_name: 'Sarah Johnson',
    defendant_name: 'John Smith',
    special_instructions: 'Subject works from home. Best time to attempt service is between 9 AM and 12 PM.',
    amount_paid: 8900,
  }).select().single()

  if (caseError) {
    console.error('\n✗ Failed to create case:', caseError.message)
    process.exit(1)
  }
  console.log(`  ✓ Created case: ${caseData.case_number} (${caseData.id})`)

  // Step 5: Add a case update
  const { error: updateError } = await supabase.from('case_updates').insert({
    case_id: caseData.id,
    author_id: created.admin,
    update_type: 'assignment',
    title: 'Case assigned to TJ',
    content: 'Case has been reviewed and assigned to TJ for service.',
    is_client_visible: true,
  })

  if (updateError) console.error('  ✗ Failed to add update:', updateError.message)
  else console.log('  ✓ Added case update: "Case assigned to TJ"')

  console.log('\n✅ Seed complete!\n')
  console.log('Login credentials:')
  console.log('  Admin:  lradmin@lrspro.com / power123')
  console.log('  Staff:  tj@lrspro.com / power123')
  console.log('  Client: client@lrspro.com / power123')
  console.log(`\n  Case: ${caseData.case_number} — Process Serving, assigned to TJ`)
}

seed().catch(console.error)
