import {
  FileText, Stamp, Search, Truck, FileEdit,
  Shield, Eye, FileCheck, Clock, CheckCircle2,
  Target, Users, Award, Gavel,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Stamp,
  Search,
  Truck,
  FileEdit,
  Shield,
  Eye,
  FileCheck,
  Clock,
  CheckCircle2,
  Target,
  Users,
  Award,
  Gavel,
}

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || FileText
}

export const AVAILABLE_ICONS = Object.keys(ICON_MAP)
