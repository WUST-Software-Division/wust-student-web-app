import type { Metadata } from "next";
import CommunityDirectory from "../../components/common/CommunityDirectory";

export const metadata: Metadata = { title: "Groups" };
export default function GroupsPage() { return <main id="main-content"><CommunityDirectory kind="groups" /></main>; }
