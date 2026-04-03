ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
$$;

CREATE OR REPLACE FUNCTION is_staff_or_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','staff'))
$$;

-- PROFILES
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "profiles_select_admin" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "profiles_update_admin" ON profiles FOR UPDATE USING (is_admin());
CREATE POLICY "profiles_insert_admin" ON profiles FOR INSERT WITH CHECK (is_admin());

-- SERVICES (public read, admin write)
CREATE POLICY "services_select_all" ON services FOR SELECT USING (true);
CREATE POLICY "services_write_admin" ON services FOR ALL USING (is_admin());

-- CASES
CREATE POLICY "cases_select_client" ON cases FOR SELECT USING (
  client_id = auth.uid() OR assigned_staff_id = auth.uid() OR is_admin()
);
CREATE POLICY "cases_insert_client" ON cases FOR INSERT WITH CHECK (client_id = auth.uid() OR is_admin());
CREATE POLICY "cases_update_staff" ON cases FOR UPDATE USING (assigned_staff_id = auth.uid() OR is_admin());
CREATE POLICY "cases_all_admin" ON cases FOR ALL USING (is_admin());

-- CASE ATTEMPTS
CREATE POLICY "attempts_select" ON case_attempts FOR SELECT USING (
  is_staff_or_admin() OR
  EXISTS (SELECT 1 FROM cases WHERE id = case_id AND client_id = auth.uid())
);
CREATE POLICY "attempts_insert_staff" ON case_attempts FOR INSERT WITH CHECK (
  staff_id = auth.uid() AND is_staff_or_admin()
);
CREATE POLICY "attempts_update_staff" ON case_attempts FOR UPDATE USING (staff_id = auth.uid() OR is_admin());

-- CASE UPDATES
CREATE POLICY "updates_select_client" ON case_updates FOR SELECT USING (
  (is_client_visible = true AND EXISTS (SELECT 1 FROM cases WHERE id = case_id AND client_id = auth.uid()))
  OR is_staff_or_admin()
);
CREATE POLICY "updates_insert_staff" ON case_updates FOR INSERT WITH CHECK (
  author_id = auth.uid() AND is_staff_or_admin()
);
CREATE POLICY "updates_insert_system" ON case_updates FOR INSERT WITH CHECK (true);

-- CASE DOCUMENTS
CREATE POLICY "documents_select" ON case_documents FOR SELECT USING (
  (is_client_visible = true AND EXISTS (SELECT 1 FROM cases WHERE id = case_id AND client_id = auth.uid()))
  OR is_staff_or_admin()
  OR uploaded_by = auth.uid()
);
CREATE POLICY "documents_insert" ON case_documents FOR INSERT WITH CHECK (
  uploaded_by = auth.uid() AND (
    is_staff_or_admin() OR
    EXISTS (SELECT 1 FROM cases WHERE id = case_id AND client_id = auth.uid())
  )
);

-- CASE CHECKLIST
CREATE POLICY "checklist_select" ON case_checklist_items FOR SELECT USING (
  is_staff_or_admin() OR
  EXISTS (SELECT 1 FROM cases WHERE id = case_id AND client_id = auth.uid())
);
CREATE POLICY "checklist_update_staff" ON case_checklist_items FOR UPDATE USING (is_staff_or_admin());

-- CONTACT
CREATE POLICY "contact_insert_public" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_select_admin" ON contact_submissions FOR SELECT USING (is_admin());
