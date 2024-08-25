import {
  AnalysisTextLinkIcon,
  Calendar02Icon,
  ContactBookIcon,
  Invoice01Icon,
  PieChartIcon,
  Task01Icon,
  UserMultipleIcon,
} from "./icons";

export const navigationItems = [
  {
    name: "Dashboard",
    href: "#/",
    link: "dashboard",
    icon: PieChartIcon,
    current: true,
  },
  {
    name: "Clients",
    href: "#/clients",
    link: "clients",
    icon: UserMultipleIcon,
    current: false,
  },
  {
    name: "Projects",
    href: "#/projects",
    link: "projects",
    icon: Task01Icon,
    current: false,
  },
  {
    name: "Estimates & Invoices",
    href: "#/invoices",
    link: "invoices",
    icon: Invoice01Icon,
    current: false,
  },
  {
    name: "Schedules",
    href: "#/schedules",
    link: "schedules",
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
    link: "contact",
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
