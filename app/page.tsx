import { Footer } from "@/src/components/footer";
import HeroSection from "@/src/components/heroSection";
import { Navbar } from "@/src/components/navbar";
import FAQSection from "@/src/features/landing/faq";
import FeatureHighlights from "@/src/features/landing/featuresHighlight";
import HowItWorks from "@/src/features/landing/howitworks";
import "@ant-design/compatible";
import "antd/dist/reset.css"; 
export default function Home() {
  return (
   <div>
     <Navbar/>
<HeroSection/>
<FeatureHighlights/>
<HowItWorks/>
<FAQSection/>
<Footer/>
   </div>
  );
}
