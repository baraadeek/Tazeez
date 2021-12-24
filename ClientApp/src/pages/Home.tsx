import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import LatestBlogPost from "../components/LatestBlogPost";
import Navbar from "../components/Navbar";
import NewsletterForm from "../components/NewsletterForm";
import OurDoctors from "../components/OurDoctors";
import OurExpertise from "../components/OurExpertise";
import Services from "../components/Services";
import Stats from "../components/Stats";
import TopHeader from "../components/TopHeader";
import VideoIntro from "../components/VideoIntro";

const Index = () => {
  return (
    <>
      <TopHeader />

      <Navbar />

      {/* <HeroSlider /> */}

      <Stats />

      <AboutSection />

      <Services />

      <OurExpertise />

      <VideoIntro />

      <OurDoctors />

      <LatestBlogPost />

      <NewsletterForm />

      <Footer />
    </>
  );
};

export default Index;
