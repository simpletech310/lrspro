import Stripe from 'stripe'
// @ts-expect-error - API version may differ between Stripe SDK and account
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20', typescript: true })