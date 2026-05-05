import { Link } from "react-router-dom";
import MarketCard from "../crypto/MarketCard.jsx";

const ExploreSection = () => {
  return (
    <section className="w-full min-h-[90vh] flex flex-col justify-center bg-[#f5f5f2] px-4 lg:px-10 py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-[1500px] grid items-center gap-12 xl:gap-16 xl:grid-cols-[0.95fr_0.9fr]">
        {/* LEFT TEXT CONTAINER */}
        <div className="w-full flex flex-col items-center xl:items-start text-center xl:text-left">
          <h2 className="text-[32px] md:text-[40px] xl:text-[45px] font-normal leading-[1.1] xl:leading-[1.02] tracking-[-0.04em] text-black w-full xl:max-w-[700px]">
            Explore crypto like Bitcoin,
            <br className="hidden xl:block" />
            Ethereum, and Dogecoin.
          </h2>

          <p className="mt-6 xl:mt-8 text-[18px] xl:text-[20px] leading-[1.45] text-[#5b616e] w-full xl:max-w-[500px]">
            Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
          </p>

          <Link 
            to="/explore"
            className="mt-8 xl:mt-10 inline-flex items-center justify-center h-[54px] xl:h-[60px] rounded-full bg-black px-10 xl:px-12 text-[18px] xl:text-[20px] font-semibold text-white hover:bg-[#111] transition-colors w-full sm:w-auto shadow-sm"
          >
            See more assets
          </Link>
        </div>

        {/* RIGHT CARD CONTAINER */}
        <div className="flex justify-center xl:justify-end w-full">
          <div className="w-full max-w-[500px] mx-auto xl:mx-0">
            <MarketCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
