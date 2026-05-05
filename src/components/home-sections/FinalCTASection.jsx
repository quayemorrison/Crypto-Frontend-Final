import { Link } from "react-router-dom";
import portfolioImage from "../../assets/images/portfolio-cta.png";

const FinalCTASection = () => {
  return (
    <section className="w-full min-h-[85vh] flex flex-col justify-center bg-white px-6 lg:px-10 py-16 lg:py-32 overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 xl:gap-16 xl:grid-cols-2">
        {/* LEFT TEXT */}
        <div className="max-w-[520px] flex flex-col items-center xl:items-start text-center xl:text-left">
          <h2 className="text-[36px] md:text-[56px] xl:text-[72px] font-normal leading-[1.1] xl:leading-[0.98] tracking-[-0.04em] text-black">
            Take control{" "}
            <br className="hidden xl:block" />
            of your money
          </h2>

          <p className="mt-5 xl:mt-6 text-[18px] xl:text-[20px] text-[#5b616e]">
            Start your portfolio today and discover crypto
          </p>

          <form className="mt-8 xl:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
            <input
              type="email"
              placeholder="satoshi@nakamoto.com"
              className="h-[56px] w-full sm:w-[320px] xl:w-[360px] rounded-xl border border-[#cfd3d8] px-4 text-[16px] outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
            />

            <Link 
              to="/signup"
              className="flex items-center justify-center h-[56px] w-full sm:w-auto rounded-full bg-[#1652f0] px-10 text-[17px] font-semibold text-white hover:bg-[#1448d8] transition-colors whitespace-nowrap shadow-sm"
            >
              Sign up
            </Link>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center w-full">
          <img
            src={portfolioImage}
            alt="Crypto portfolio"
            className="w-full max-w-[520px] object-contain rounded-2xl xl:rounded-none"
          />
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
