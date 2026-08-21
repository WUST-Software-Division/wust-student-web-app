import type { Metadata } from "next";
import CommunityDirectory from "../../components/common/CommunityDirectory";

export const metadata: Metadata = { title: "Organizations" };
export default function OrganizationsPage() { return <main id="main-content"><CommunityDirectory kind="organizations" /></main>; }
