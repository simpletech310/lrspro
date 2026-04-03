import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import { CaseStatus, CasePriority } from '@/types/database'

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
}
export function formatDate(date: string | Date): string { return format(new Date(date), 'MMM d, yyyy') }
export function formatDateTime(date: string | Date): string { return format(new Date(date), 'MMM d, yyyy h:mm a') }
export function timeAgo(date: string | Date): string { return formatDistanceToNow(new Date(date), { addSuffix: true }) }

export const STATUS_LABELS: Record<CaseStatus, string> = {
  received:'Received', assigned:'Assigned', in_progress:'In Progress', attempted:'Attempted',
  served:'Served', sub_served:'Sub-Served', notarized:'Notarized', filed:'Filed',
  complete:'Complete', unable_to_serve:'Unable to Serve', cancelled:'Cancelled',
}
export const STATUS_COLORS: Record<CaseStatus, string> = {
  received:'bg-blue-100 text-blue-800', assigned:'bg-purple-100 text-purple-800',
  in_progress:'bg-amber-100 text-amber-800', attempted:'bg-orange-100 text-orange-800',
  served:'bg-green-100 text-green-800', sub_served:'bg-teal-100 text-teal-800',
  notarized:'bg-green-100 text-green-800', filed:'bg-green-100 text-green-800',
  complete:'bg-emerald-100 text-emerald-800', unable_to_serve:'bg-red-100 text-red-800',
  cancelled:'bg-gray-100 text-gray-600',
}
export const PRIORITY_LABELS: Record<CasePriority, string> = { standard:'Standard', rush:'Rush', same_day:'Same Day' }
export const PRIORITY_COLORS: Record<CasePriority, string> = {
  standard:'bg-slate-100 text-slate-700', rush:'bg-orange-100 text-orange-700', same_day:'bg-red-100 text-red-700',
}