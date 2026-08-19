import type { Metadata } from "next";
import OrganizationDirectory from "../../components/sections/organization/OrganizationDirectory";

export const metadata: Metadata = { title: "Organizations" };

export default function OrganizationPage() {
  return <main id="main-content"><OrganizationDirectory /></main>;
}
