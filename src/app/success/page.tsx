import type { Metadata } from "next";
import SuccessStories from "../../components/sections/success/SuccessStories";

export const metadata: Metadata = { title: "Student Success" };

export default function SuccessPage() {
  return <main id="main-content"><SuccessStories /></main>;
}
