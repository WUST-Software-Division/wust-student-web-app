import type { Metadata } from "next";
import CareerBoard from "../../components/common/CareerBoard";

export const metadata: Metadata = { title: "Career" };

export default function CareerPage() {
  return <main id="main-content"><CareerBoard /></main>;
}
