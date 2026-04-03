-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
CREATE TABLE profiles (
  id            UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role          TEXT NOT NULL CHECK (role IN ('admin','staff','client')) DEFAULT 'client',
  full_name     TEXT NOT NULL DEFAULT '',
  email         TEXT NOT NULL DEFAULT '',
  phone         TEXT,
  company       TEXT,
  bar_number    TEXT,
  license_type  TEXT,
  avatar_url    TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- SERVICES CATALOG
CREATE TABLE services (
  id                   UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug                 TEXT UNIQUE NOT NULL,
  name                 TEXT NOT NULL,
  short_description    TEXT NOT NULL,
  long_description     TEXT,
  icon_name            TEXT,
  base_price           INTEGER NOT NULL,
  rush_price           INTEGER,
  same_day_price       INTEGER,
  stripe_price_id      TEXT,
  stripe_rush_price_id TEXT,
  stripe_same_day_price_id TEXT,
  checklist_template   JSONB DEFAULT '[]',
  form_schema          JSONB DEFAULT '{}',
  estimated_turnaround TEXT,
  is_active            BOOLEAN DEFAULT true,
  sort_order           INTEGER DEFAULT 0,
  created_at           TIMESTAMPTZ DEFAULT now(),
  updated_at           TIMESTAMPTZ DEFAULT now()
);

-- CASES
CREATE TABLE cases (
  id                      UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_number             TEXT UNIQUE NOT NULL DEFAULT '',
  client_id               UUID REFERENCES profiles(id) NOT NULL,
  assigned_staff_id       UUID REFERENCES profiles(id),
  service_id              UUID REFERENCES services(id) NOT NULL,
  service_type            TEXT NOT NULL,
  status                  TEXT NOT NULL DEFAULT 'received'
                            CHECK (status IN ('received','assigned','in_progress','attempted','served','sub_served','notarized','filed','complete','unable_to_serve','cancelled')),
  priority                TEXT NOT NULL DEFAULT 'standard'
                            CHECK (priority IN ('standard','rush','same_day')),
  subject_name            TEXT,
  subject_address         TEXT,
  subject_city            TEXT,
  subject_state           TEXT DEFAULT 'CA',
  subject_zip             TEXT,
  subject_phone           TEXT,
  subject_dob             TEXT,
  subject_employer        TEXT,
  court_case_number       TEXT,
  court_name              TEXT,
  plaintiff_name          TEXT,
  defendant_name          TEXT,
  documents_description   TEXT,
  appointment_date        TIMESTAMPTZ,
  appointment_location    TEXT,
  appointment_notes       TEXT,
  served_at               TIMESTAMPTZ,
  served_to_name          TEXT,
  served_to_relationship  TEXT,
  serve_method            TEXT,
  affidavit_ready         BOOLEAN DEFAULT false,
  amount_paid             INTEGER,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT UNIQUE,
  invoice_number          TEXT UNIQUE,
  special_instructions    TEXT,
  internal_notes          TEXT,
  deadline                TIMESTAMPTZ,
  completed_at            TIMESTAMPTZ,
  cancelled_reason        TEXT,
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now()
);

CREATE SEQUENCE case_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_case_number()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.case_number := 'LRS-' || TO_CHAR(now(), 'YYYY') || '-' ||
                     LPAD(nextval('case_number_seq')::TEXT, 5, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_case_number
  BEFORE INSERT ON cases
  FOR EACH ROW
  WHEN (NEW.case_number IS NULL OR NEW.case_number = '')
  EXECUTE FUNCTION generate_case_number();

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER cases_updated_at
  BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- CASE ATTEMPTS
CREATE TABLE case_attempts (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id      UUID REFERENCES cases(id) ON DELETE CASCADE NOT NULL,
  staff_id     UUID REFERENCES profiles(id) NOT NULL,
  attempt_num  INTEGER NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL,
  address_used TEXT NOT NULL,
  outcome      TEXT NOT NULL CHECK (outcome IN ('no_answer','door_answered_refused','sub_served','personally_served','wrong_address','moved','vacant','business_closed','other')),
  contact_name TEXT,
  notes        TEXT,
  gps_lat      DECIMAL(10,8),
  gps_lng      DECIMAL(11,8),
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- CASE UPDATES
CREATE TABLE case_updates (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id           UUID REFERENCES cases(id) ON DELETE CASCADE NOT NULL,
  author_id         UUID REFERENCES profiles(id),
  update_type       TEXT NOT NULL CHECK (update_type IN ('status_change','note','document_upload','attempt_logged','assignment','payment','system')),
  title             TEXT NOT NULL,
  content           TEXT,
  old_status        TEXT,
  new_status        TEXT,
  is_client_visible BOOLEAN DEFAULT false,
  metadata          JSONB DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- CASE DOCUMENTS
CREATE TABLE case_documents (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id      UUID REFERENCES cases(id) ON DELETE CASCADE NOT NULL,
  uploaded_by  UUID REFERENCES profiles(id) NOT NULL,
  file_name    TEXT NOT NULL,
  file_size    INTEGER,
  file_type    TEXT,
  storage_path TEXT NOT NULL,
  storage_url  TEXT,
  doc_type     TEXT NOT NULL CHECK (doc_type IN ('intake_document','evidence_photo','video_evidence','affidavit','proof_of_service','notarized_document','conformed_copy','skip_trace_report','court_receipt','client_upload','other')),
  is_client_visible BOOLEAN DEFAULT false,
  description  TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- CASE CHECKLISTS
CREATE TABLE case_checklist_items (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id      UUID REFERENCES cases(id) ON DELETE CASCADE NOT NULL,
  label        TEXT NOT NULL,
  description  TEXT,
  is_complete  BOOLEAN DEFAULT false,
  completed_by UUID REFERENCES profiles(id),
  completed_at TIMESTAMPTZ,
  sort_order   INTEGER DEFAULT 0,
  is_required  BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- CONTACT SUBMISSIONS
CREATE TABLE contact_submissions (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  company         TEXT,
  service_interest TEXT,
  message         TEXT NOT NULL,
  is_read         BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_cases_client_id ON cases(client_id);
CREATE INDEX idx_cases_staff_id ON cases(assigned_staff_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_service_type ON cases(service_type);
CREATE INDEX idx_cases_created_at ON cases(created_at DESC);
CREATE INDEX idx_case_updates_case_id ON case_updates(case_id);
CREATE INDEX idx_case_documents_case_id ON case_documents(case_id);
CREATE INDEX idx_case_attempts_case_id ON case_attempts(case_id);
CREATE INDEX idx_case_checklist_case_id ON case_checklist_items(case_id);
CREATE INDEX idx_profiles_role ON profiles(role);
