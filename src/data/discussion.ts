export type ForumSpace = "Group" | "Club" | "Organization" | "Rules & Terms";

export type ForumReply = {
  id: number;
  author: string;
  body: string;
  time: string;
};

export type DiscussionPost = {
  id: number;
  space: Exclude<ForumSpace, "Rules & Terms">;
  community?: string;
  category: string;
  title: string;
  author: string;
  body: string;
  time: string;
  likes: number;
  image?: string;
  attachment?: string;
  replies: ForumReply[];
};

export const forumCommunities: Record<Exclude<ForumSpace, "Rules & Terms">, string[]> = {
  Group: ["Data Analytics Study Circle", "International Student Network", "Weekend Wellness Group"],
  Club: ["Photography Club", "Innovation & Technology Club", "Cultural Exchange Club"],
  Organization: ["Student Government Association", "Graduate Business Network", "WUST Volunteer Council"],
};

export const forumSpaces: { label: ForumSpace; id: string; description: string }[] = [
  { label: "Group", id: "groups", description: "Study circles, shared interests, and informal peer communities." },
  { label: "Club", id: "clubs", description: "Student-led clubs, activities, events, and creative collaborations." },
  { label: "Organization", id: "organizations", description: "Recognized organizations, leadership, and campus initiatives." },
  { label: "Rules & Terms", id: "rules", description: "Community expectations, posting guidance, and student safety." },
];

export const discussionPosts: DiscussionPost[] = [
  {
    id: 1,
    space: "Group",
    category: "Study Group",
    title: "Forming a weekend data analytics study circle",
    author: "Maya R.",
    body: "I’m looking for four or five students who want to review practical datasets together on Saturday mornings. Beginners are welcome.",
    time: "18 min ago",
    likes: 14,
    image: "/images/student-life/wise-workshop.webp",
    replies: [
      { id: 11, author: "Daniel K.", body: "I’m interested. I can bring a few sample dashboards for us to review.", time: "8 min ago" },
      { id: 12, author: "Aisha N.", body: "Could we also create a shared resource folder after the first meeting?", time: "3 min ago" },
    ],
  },
  {
    id: 2,
    space: "Club",
    category: "Creative Club",
    title: "Photography walk and beginner editing session",
    author: "Leo S.",
    body: "We’re planning a student photo walk followed by a simple editing workshop. Reply with your preferred weekday and the kind of photos you enjoy taking.",
    time: "1 hr ago",
    likes: 22,
    image: "/images/student-life/student-craft-night.webp",
    attachment: "Photo-walk-outline.pdf",
    replies: [{ id: 21, author: "Sofia M.", body: "Thursday evenings work for me. I’d love to practice portraits.", time: "36 min ago" }],
  },
  {
    id: 3,
    space: "Organization",
    category: "Leadership",
    title: "Volunteers needed for the new-student welcome team",
    author: "Student Government Association",
    body: "Help welcome incoming students, guide campus tours, and answer questions during orientation. Training and schedules will be shared with selected volunteers.",
    time: "Yesterday",
    likes: 31,
    image: "/images/student-life/fall-orientation-community.webp",
    replies: [{ id: 31, author: "Amara O.", body: "I volunteered last term and would be happy to help with training.", time: "Yesterday" }],
  },
  {
    id: 4,
    space: "Club",
    category: "Career & Tech",
    title: "Innovation challenge team needs a product designer",
    author: "Jordan L.",
    body: "Our team is working on a student support concept. We have research and engineering covered and need someone interested in product design.",
    time: "2 days ago",
    likes: 18,
    image: "/images/student-life/aws-community-day.webp",
    replies: [],
  },
];

export const forumRules = [
  { title: "Be constructive", description: "Challenge ideas respectfully. Personal attacks, harassment, or discriminatory language are not allowed." },
  { title: "Protect privacy", description: "Do not post private student information, access credentials, grades, or personal contact details without consent." },
  { title: "Keep posts useful", description: "Choose the right space, use a clear title, and add enough context for other students to respond." },
  { title: "Share responsibly", description: "Upload only files and media you have permission to share. Report suspicious or unsafe content to Student Services." },
];
