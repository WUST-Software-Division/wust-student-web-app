import type { Metadata } from "next";
import DiscussionForum from "../../components/sections/discussion/DiscussionForum";

export const metadata: Metadata = { title: "Student Forum" };

export default function StudentForumPage() {
  return <main id="main-content"><DiscussionForum /></main>;
}
