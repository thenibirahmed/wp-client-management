import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  AnalysisTextLinkIcon,
  Calendar02Icon,
  ContactBookIcon,
  CustomerService01Icon,
  GoogleDocIcon,
  Invoice01Icon,
  PieChartIcon,
  Task01Icon,
  UserMultipleIcon,
} from "./icons";

export const navigationItems = [
  { name: "Dashboard", href: "#/", icon: PieChartIcon, current: true },
  {
    name: "Clients",
    href: "#/clients",
    icon: UserMultipleIcon,
    current: false,
  },
  { name: "Projects", href: "#/projects", icon: Task01Icon, current: false },
  {
    name: "Estimates & Invoices",
    href: "#/invoices",
    icon: Invoice01Icon,
    current: false,
  },
  {
    name: "Schedules",
    href: "#/schedules",
    icon: Calendar02Icon,
    current: false,
  },
  {
    name: "Reports",
    children: [
      {
        name: "Client Report",
        href: "#/report/#/client-report",
        current: false,
      },
      { name: "Revenue", href: "#/report/#/revenue", current: false },
      { name: "Expense", href: "#/report/#/expense", current: false },
      { name: "Profit/Loss", href: "#/report/#/profit", current: false },
    ],
    href: "#/report/#/client-report",
    icon: AnalysisTextLinkIcon,
    current: false,
  },
  {
    name: "Contacts",
    href: "#/contact",
    icon: ContactBookIcon,
    current: false,
  },
  // { name: "Docs", href: "#/docs", icon: GoogleDocIcon, current: false },
  // {
  //   name: "Support",
  //   href: "#/support",
  //   icon: CustomerService01Icon,
  //   current: false,
  // },
];

export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];
