import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/Hero__4_.png";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signup", { state: { prefilledEmail: email } });
  };

  return (
    <section className="w-full min-h-[85vh] flex flex-col justify-center px-4 lg:px-10 pt-8 lg:pt-10 pb-16 lg:pb-20 overflow-hidden">
      <div className="mx-auto grid max-w-[1500px] items-center gap-10 xl:gap-12 xl:grid-cols-[1.05fr_0.95fr]">
        {/* Left side - Image */}
        <div className="flex justify-start order-2 xl:order-1 w-full">
          <div className="w-full xl:max-w-[680px]">
            <img
              src={heroImage}
              alt="Coinbase hero"
              className="w-full rounded-[20px] xl:rounded-[36px] object-contain shadow-xl xl:shadow-none"
            />
            <p className="mt-4 text-[12px] xl:text-[13px] text-[#5b616e] text-center xl:text-left px-4 xl:px-0">
              Stocks and prediction markets not available in your jurisdiction.
            </p>
          </div>
        </div>

        {/* Right side - Text and Form */}
        <div className="w-full xl:max-w-[560px] order-1 xl:order-2 flex flex-col items-center xl:items-start text-center xl:text-left">
          <h1 className="text-[36px] md:text-[56px] xl:text-[72px] font-medium tracking-[-0.04em] leading-[1.1] xl:leading-[1.02] text-black">
            The future of finance is here.
          </h1>

          <p className="mt-4 xl:mt-7 text-[18px] md:text-[20px] xl:text-[22px] leading-[1.4] xl:leading-[1.35] text-black w-full xl:max-w-[480px]">
            Trade crypto and more on a platform you can trust.
          </p>

          <form onSubmit={handleSignUp} className="mt-7 xl:mt-10 flex flex-col sm:flex-row w-full xl:max-w-[620px] items-center gap-3 xl:gap-4">
            <input
              type="email"
              placeholder="satoshi@nakamoto.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[54px] w-full rounded-xl border border-[#cfd3d8] px-4 text-[17px] xl:text-[18px] text-[#5b616e] outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
            />

            <button 
              type="submit"
              className="flex items-center justify-center h-[54px] w-full sm:w-auto rounded-full bg-[#1652f0] px-9 text-[17px] xl:text-[18px] font-semibold text-white hover:bg-[#1448d8] transition-colors whitespace-nowrap shadow-sm"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
