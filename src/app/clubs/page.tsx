import type { Metadata } from "next";
import CommunityDirectory from "../../components/common/CommunityDirectory";

export const metadata: Metadata = { title: "Clubs" };
export default function ClubsPage() { return <main id="main-content"><CommunityDirectory kind="clubs" /></main>; }
