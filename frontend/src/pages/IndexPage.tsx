import Navbar from "../components/layouts/Navbar";
import BlendedCarousal from "./landing/BlendedCarousal";
import Typo from "./landing/Typo";
import FeatureCards from "./landing/FeatureCards";
import PHNavigation from "../components/custom/PHNavigation";
// import LoggedInNav from "../components/layouts/LoggedInNav";

function IndexPage() {
  return (
    <>
      <PHNavigation />
      <Navbar />
      {/* <LoggedInNav /> */}
      <BlendedCarousal />
      <Typo />
      <FeatureCards />
    </>
  );
}

export default IndexPage;
