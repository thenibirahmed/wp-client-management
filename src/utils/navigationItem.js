import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const navigationItems = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Client", href: "#/client", icon: UsersIcon, current: false },
  { name: "Projects", href: "#/project", icon: FolderIcon, current: false },
  {
    name: "Estimates & Invoices",
    href: "#/invoice",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Schedules",
    href: "#/schedule",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: "Reports",
    children: [
      { name: "Engineering", href: "#" },
      { name: "Human Resources", href: "#" },
      { name: "Customer Success", href: "#" },
    ],
    href: "#/report",
    icon: ChartPieIcon,
    current: false,
  },
  { name: "Contacts", href: "#/contact", icon: ChartPieIcon, current: false },
  { name: "Docs", href: "#", icon: ChartPieIcon, current: false },
  { name: "Support", href: "#", icon: ChartPieIcon, current: false },
];

export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];
