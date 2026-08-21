export type NavigationItem = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string; description: string; initials: string; count: string }[];
};

export const navigation: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Student Forum", href: "/discussion" },
  { label: "Activity", href: "/activity" },
  { label: "Success", href: "/success" },
  { label: "Career", href: "/career" },
  {
    label: "Community",
    href: "/organization",
    children: [
      { label: "Groups", href: "/groups", description: "Open student communities, study circles, and shared interests.", initials: "GR", count: "12 communities" },
      { label: "Clubs", href: "/clubs", description: "Student-led activities, creative programs, and recurring events.", initials: "CL", count: "18 active clubs" },
      { label: "Organizations", href: "/organizations", description: "Recognized student organizations, leadership, and campus initiatives.", initials: "OR", count: "9 organizations" },
    ],
  },
  { label: "Alumni", href: "/alumni" },
] as const;
