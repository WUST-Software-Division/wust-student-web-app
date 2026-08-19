export type CareerCategory = "IT" | "Business" | "Humanities";

export type CareerComment = {
  id: number;
  author: string;
  body: string;
  time: string;
};

export type CareerJob = {
  id: number;
  title: string;
  company: string;
  category: CareerCategory;
  type: string;
  location: string;
  postedAt: string;
  description: string;
  applyUrl: string;
  comments: CareerComment[];
};

export const careerCategories: readonly CareerCategory[] = ["IT", "Business", "Humanities"] as const;

// Dummy/sample listings for the frontend preview. Once the admin panel is
// connected, these will be replaced by posts created and managed by the team
// career staff instead of hard-coded data.
export const careerJobs: CareerJob[] = [
  {
    id: 1,
    title: "Junior Software Engineer",
    company: "BrightPath Technologies",
    category: "IT",
    type: "Full-time",
    location: "Alexandria, VA (Hybrid)",
    postedAt: "2 days ago",
    description: "Join a small engineering team building internal tools with React and Node.js. A great fit for a recent graduate who wants hands-on mentorship.",
    applyUrl: "https://careers.example.com/brightpath/junior-software-engineer",
    comments: [
      { id: 101, author: "Ayesha K.", body: "Applied last week — the team responded really fast.", time: "1 day ago" },
    ],
  },
  {
    id: 2,
    title: "IT Support Intern",
    company: "Capital Region Health Network",
    category: "IT",
    type: "Internship",
    location: "Arlington, VA",
    postedAt: "5 days ago",
    description: "Support the campus help desk, assist with hardware setup, and shadow the network administration team over the summer.",
    applyUrl: "https://careers.example.com/crhn/it-support-intern",
    comments: [],
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Ledger & Co.",
    category: "IT",
    type: "Full-time",
    location: "Remote (US)",
    postedAt: "1 week ago",
    description: "Work with the analytics team to build dashboards and reporting pipelines for internal stakeholders. SQL and Python experience preferred.",
    applyUrl: "https://careers.example.com/ledgerco/data-analyst",
    comments: [
      { id: 102, author: "Marcus D.", body: "Does this role require prior internship experience?", time: "4 days ago" },
      { id: 103, author: "Priya S.", body: "Doesn't look like it — the posting just asks for relevant coursework.", time: "3 days ago" },
    ],
  },
  {
    id: 4,
    title: "Marketing Coordinator",
    company: "Northgate Retail Group",
    category: "Business",
    type: "Full-time",
    location: "Washington, DC",
    postedAt: "3 days ago",
    description: "Coordinate campaigns across email, social, and in-store promotions. Ideal for a business or communications student ready to start full-time.",
    applyUrl: "https://careers.example.com/northgate/marketing-coordinator",
    comments: [],
  },
  {
    id: 5,
    title: "Finance Intern",
    company: "Meridian Capital Partners",
    category: "Business",
    type: "Internship",
    location: "Tysons, VA",
    postedAt: "6 days ago",
    description: "Support the finance team with reporting, budgeting, and vendor reconciliation during a 10-week summer program.",
    applyUrl: "https://careers.example.com/meridian/finance-intern",
    comments: [
      { id: 104, author: "Daniel K.", body: "Great program — a friend did this last summer and loved it.", time: "5 days ago" },
    ],
  },
  {
    id: 6,
    title: "Operations Associate",
    company: "Harborline Logistics",
    category: "Business",
    type: "Full-time",
    location: "Alexandria, VA",
    postedAt: "1 week ago",
    description: "Rotate across procurement, scheduling, and vendor management while learning the full operations cycle.",
    applyUrl: "https://careers.example.com/harborline/operations-associate",
    comments: [],
  },
  {
    id: 7,
    title: "Communications Assistant",
    company: "Riverbend Nonprofit Alliance",
    category: "Humanities",
    type: "Part-time",
    location: "Washington, DC",
    postedAt: "4 days ago",
    description: "Help draft newsletters, coordinate community events, and support outreach for a network of local nonprofits.",
    applyUrl: "https://careers.example.com/riverbend/communications-assistant",
    comments: [],
  },
  {
    id: 8,
    title: "Archives & Research Intern",
    company: "Potomac Historical Society",
    category: "Humanities",
    type: "Internship",
    location: "Alexandria, VA",
    postedAt: "1 week ago",
    description: "Assist with cataloging historical documents and supporting public research requests. Strong writing skills required.",
    applyUrl: "https://careers.example.com/potomac-historical/archives-intern",
    comments: [
      { id: 105, author: "Sofia M.", body: "Is this open to first-year students too?", time: "2 days ago" },
    ],
  },
  {
    id: 9,
    title: "ESL Program Coordinator",
    company: "Bridgeway Community Services",
    category: "Humanities",
    type: "Full-time",
    location: "Fairfax, VA",
    postedAt: "2 weeks ago",
    description: "Coordinate class scheduling and volunteer tutors for an adult English-language program serving the local community.",
    applyUrl: "https://careers.example.com/bridgeway/esl-coordinator",
    comments: [],
  },
];
