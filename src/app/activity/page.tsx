import type { Metadata } from "next";
import ActivityDirectory from "../../components/sections/activity/ActivityDirectory";

export const metadata: Metadata = { title: "Activities" };

export default function ActivityPage() {
  return <main id="main-content"><ActivityDirectory /></main>;
}
