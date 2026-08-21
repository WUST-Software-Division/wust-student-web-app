import type { Metadata } from "next";
import AlumniNetwork from "../../components/sections/alumni/AlumniNetwork";

export const metadata: Metadata = { title: "Alumni Network" };

export default function AlumniPage() {
  return <main id="main-content"><AlumniNetwork /></main>;
}
