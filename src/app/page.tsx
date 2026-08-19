import HomeHero from "../components/sections/home/HomeHero";
import AboutWust from "../components/sections/home/AboutWust";
import LeadershipQuote from "../components/sections/home/LeadershipQuote";
import ActivitySpotlight from "../components/sections/home/ActivitySpotlight";
import EventsZigzag from "../components/sections/home/EventsZigzag";
import StudentSuccess from "../components/sections/home/StudentSuccess";
import GalleryCarousel from "../components/sections/home/GalleryCarousel";

export default function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />
      <AboutWust />
      <LeadershipQuote />
      <ActivitySpotlight />
      <EventsZigzag />
      <StudentSuccess />
      <GalleryCarousel />
    </main>
  );
}
