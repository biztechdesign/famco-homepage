import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import CategoryStrip from "@/components/CategoryStrip";
import Hero from "@/components/Hero";
import SplitFlag from "@/components/SplitFlag";
import LiveInspection from "@/components/LiveInspection";
import FeatureBlocks from "@/components/FeatureBlocks";
import SellShowcase from "@/components/SellShowcase";
import GetInTouch from "@/components/GetInTouch";
import LatestNews from "@/components/LatestNews";
import PopularCategories from "@/components/PopularCategories";
import TrustpilotReviews from "@/components/TrustpilotReviews";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <UtilityBar />
      <Header />
      <CategoryStrip />
      <main>
        <Hero />
        <SplitFlag />
        <LiveInspection />
        <TrustpilotReviews />
        <FeatureBlocks />
        <SellShowcase />
        <GetInTouch />
        <LatestNews />
        <PopularCategories />
      </main>
      <Footer />
    </>
  );
}
