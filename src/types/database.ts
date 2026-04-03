export type UserRole = 'admin' | 'staff' | 'client'
export type CaseStatus = 'received'|'assigned'|'in_progress'|'attempted'|'served'|'sub_served'|'notarized'|'filed'|'complete'|'unable_to_serve'|'cancelled'
export type CasePriority = 'standard'|'rush'|'same_day'
export type ServiceType = 'process-serving'|'notary'|'skip-trace'|'court-courier'|'legal-document-service'
export type DocType = 'intake_document'|'evidence_photo'|'video_evidence'|'affidavit'|'proof_of_service'|'notarized_document'|'conformed_copy'|'skip_trace_report'|'court_receipt'|'client_upload'|'other'
export type AttemptOutcome = 'no_answer'|'door_answered_refused'|'sub_served'|'personally_served'|'wrong_address'|'moved'|'vacant'|'business_closed'|'other'

export interface Profile {
  id: string; role: UserRole; full_name: string; email: string; phone?: string; company?: string;
  bar_number?: string; license_type?: string; avatar_url?: string; is_active: boolean; notes?: string;
  created_at: string; updated_at: string;
}
export interface ChecklistTemplateItem { label: string; sort_order: number; is_required: boolean; }
export interface FormField {
  name: string; label: string; type: 'text'|'textarea'|'select'|'date'|'time'|'tel'|'number'|'checkbox';
  required: boolean; options?: string[]; default?: string; placeholder?: string;
}
export interface FormSchema { fields: FormField[]; }
export interface Service {
  id: string; slug: string; name: string; short_description: string; long_description?: string;
  icon_name?: string; base_price: number; rush_price?: number; same_day_price?: number;
  stripe_price_id?: string; checklist_template: ChecklistTemplateItem[]; form_schema: FormSchema;
  estimated_turnaround?: string; is_active: boolean; sort_order: number;
}
export interface Case {
  id: string; case_number: string; client_id: string; assigned_staff_id?: string;
  service_id: string; service_type: ServiceType; status: CaseStatus; priority: CasePriority;
  subject_name?: string; subject_address?: string; subject_city?: string; subject_state?: string;
  subject_zip?: string; subject_phone?: string; subject_dob?: string; subject_employer?: string;
  court_case_number?: string; court_name?: string; plaintiff_name?: string; defendant_name?: string;
  documents_description?: string; appointment_date?: string; appointment_location?: string;
  appointment_notes?: string; served_at?: string; served_to_name?: string; served_to_relationship?: string;
  serve_method?: string; affidavit_ready: boolean; amount_paid?: number; stripe_payment_intent_id?: string;
  stripe_checkout_session_id?: string; invoice_number?: string; special_instructions?: string;
  internal_notes?: string; deadline?: string; completed_at?: string; cancelled_reason?: string;
  created_at: string; updated_at: string;
  client?: Profile; assigned_staff?: Profile; service?: Service;
  attempts?: CaseAttempt[]; updates?: CaseUpdate[]; documents?: CaseDocument[]; checklist?: CaseChecklistItem[];
}
export interface CaseAttempt {
  id: string; case_id: string; staff_id: string; attempt_num: number; attempted_at: string;
  address_used: string; outcome: AttemptOutcome; contact_name?: string; notes?: string;
  gps_lat?: number; gps_lng?: number; created_at: string; staff?: Profile;
}
export interface CaseUpdate {
  id: string; case_id: string; author_id?: string;
  update_type: 'status_change'|'note'|'document_upload'|'attempt_logged'|'assignment'|'payment'|'system';
  title: string; content?: string; old_status?: string; new_status?: string;
  is_client_visible: boolean; metadata?: Record<string, unknown>; created_at: string; author?: Profile;
}
export interface CaseDocument {
  id: string; case_id: string; uploaded_by: string; file_name: string; file_size?: number;
  file_type?: string; storage_path: string; storage_url?: string; doc_type: DocType;
  is_client_visible: boolean; description?: string; created_at: string; uploader?: Profile;
}
export interface CaseChecklistItem {
  id: string; case_id: string; label: string; description?: string; is_complete: boolean;
  completed_by?: string; completed_at?: string; sort_order: number; is_required: boolean; created_at: string;
}
export interface ContactSubmission {
  id: string; name: string; email: string; phone?: string; company?: string;
  service_interest?: string; message: string; is_read: boolean; created_at: string;
}
export interface ApiResponse<T> { data?: T; error?: string; message?: string; }