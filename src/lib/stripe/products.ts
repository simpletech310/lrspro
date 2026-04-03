export const STRIPE_PRICES: Record<string, Record<string, string>> = {
  'process-serving': { standard: process.env.STRIPE_PRICE_PROCESS_STANDARD||'', rush: process.env.STRIPE_PRICE_PROCESS_RUSH||'', same_day: process.env.STRIPE_PRICE_PROCESS_SAME_DAY||'' },
  'notary': { standard: process.env.STRIPE_PRICE_NOTARY_STANDARD||'', rush: process.env.STRIPE_PRICE_NOTARY_RUSH||'', same_day: process.env.STRIPE_PRICE_NOTARY_LOAN_SIGN||'' },
  'skip-trace': { standard: process.env.STRIPE_PRICE_SKIP_BASIC||'', rush: process.env.STRIPE_PRICE_SKIP_ENHANCED||'' },
  'court-courier': { standard: process.env.STRIPE_PRICE_COURIER_STANDARD||'', rush: process.env.STRIPE_PRICE_COURIER_EMERGENCY||'' },
  'legal-document-service': { standard: process.env.STRIPE_PRICE_DOCS_STANDARD||'' },
}
export function getPriceId(serviceSlug: string, priority: string): string {
  return STRIPE_PRICES[serviceSlug]?.[priority] || ''
}