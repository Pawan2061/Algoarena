import { Hero } from "../components/Hero";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import StdRanking from "../components/StdRanking";

function LandingPage() {
  return (
    <div>
      <Navbar />

      <Hero />
      <div className="bg-black">
        <div className="flex w-[90%] mx-auto justify-between">
          <Table />
          <StdRanking />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
