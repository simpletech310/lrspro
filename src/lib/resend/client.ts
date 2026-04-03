import { Resend } from 'resend'
export const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789')
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@lrsservepros.com'
export const FROM_NAME = 'Left Right Serve & Sign Pros'