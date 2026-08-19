import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SupportChatbot from "../components/common/SupportChatbot";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Student Life",
    template: "%s | Student Life",
  },
  description:
    "Discover student activities, organizations, success stories, discussion, and support.",
  icons: {
    icon: "/images/wust/wust-logo.png",
    shortcut: "/images/wust/wust-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <SupportChatbot />
      </body>
    </html>
  );
}
