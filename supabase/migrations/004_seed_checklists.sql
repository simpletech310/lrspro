CREATE SEQUENCE invoice_number_seq START 1000;

CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.stripe_payment_intent_id IS NOT NULL AND NEW.invoice_number IS NULL THEN
    NEW.invoice_number := 'INV-' || TO_CHAR(now(), 'YYYY') || '-' || LPAD(nextval('invoice_number_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_invoice_number
  BEFORE INSERT OR UPDATE ON cases
  FOR EACH ROW WHEN (NEW.stripe_payment_intent_id IS NOT NULL AND NEW.invoice_number IS NULL)
  EXECUTE FUNCTION generate_invoice_number();

CREATE OR REPLACE FUNCTION populate_case_checklist()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  service_row services%ROWTYPE;
  item jsonb;
BEGIN
  SELECT * INTO service_row FROM services WHERE id = NEW.service_id;
  IF service_row.checklist_template IS NOT NULL THEN
    FOR item IN SELECT * FROM jsonb_array_elements(service_row.checklist_template) LOOP
      INSERT INTO case_checklist_items (case_id, label, sort_order, is_required)
      VALUES (NEW.id, item->>'label', (item->>'sort_order')::integer, COALESCE((item->>'is_required')::boolean, true));
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER auto_populate_checklist AFTER INSERT ON cases FOR EACH ROW EXECUTE FUNCTION populate_case_checklist();

CREATE OR REPLACE FUNCTION log_status_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO case_updates (case_id, update_type, title, content, old_status, new_status, is_client_visible)
    VALUES (NEW.id, 'status_change', 'Status Updated: ' || NEW.status, 'Case status changed from ' || COALESCE(OLD.status,'') || ' to ' || NEW.status, OLD.status, NEW.status, true);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER auto_log_status_change AFTER UPDATE ON cases FOR EACH ROW EXECUTE FUNCTION log_status_change();

CREATE OR REPLACE FUNCTION log_assignment()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE staff_name TEXT;
BEGIN
  IF OLD.assigned_staff_id IS DISTINCT FROM NEW.assigned_staff_id AND NEW.assigned_staff_id IS NOT NULL THEN
    SELECT full_name INTO staff_name FROM profiles WHERE id = NEW.assigned_staff_id;
    INSERT INTO case_updates (case_id, update_type, title, is_client_visible)
    VALUES (NEW.id, 'assignment', 'Case assigned to ' || COALESCE(staff_name, 'staff member'), true);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER auto_log_assignment AFTER UPDATE ON cases FOR EACH ROW EXECUTE FUNCTION log_assignment();
