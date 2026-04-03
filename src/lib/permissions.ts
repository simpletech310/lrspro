import { UserRole } from '@/types/database'
export const canAccessDashboard = (role: UserRole) => role === 'admin' || role === 'staff'
export const canAccessPortal = (role: UserRole) => role === 'client' || role === 'admin'
export const isAdmin = (role: UserRole) => role === 'admin'
export const canUpdateCase = (role: UserRole) => role === 'admin' || role === 'staff'
export const canManageStaff = (role: UserRole) => role === 'admin'
export const canViewAllCases = (role: UserRole) => role === 'admin'
export function getRedirectPath(role: UserRole): string {
  switch(role) { case 'admin': case 'staff': return '/dashboard'; case 'client': return '/portal/dashboard'; default: return '/' }
}