import coinbaseOneImage from "../../assets/images/coinbase-one.png.png";

const CoinbaseOneSection = () => {
  return (
    <section className="w-full min-h-[85vh] flex flex-col justify-center bg-white px-6 lg:px-10 py-16 lg:py-28 overflow-hidden">
      <div className="mx-auto grid max-w-[1300px] items-center gap-12 xl:gap-16 xl:grid-cols-2">
        {/* LEFT TEXT */}
        <div className="max-w-[520px] flex flex-col items-center xl:items-start text-center xl:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e2e5ea] px-4 py-2 text-[12px] xl:text-[13px] font-medium text-[#5b616e]">
            <span className="h-3 w-3 xl:h-4 xl:w-4 rounded-full bg-black" />
            COINBASE ONE
          </div>

          {/* Heading */}
          <h2 className="mt-5 xl:mt-6 text-[32px] md:text-[40px] xl:text-[44px] font-normal leading-[1.1] xl:leading-[1.02] tracking-[-0.04em] text-black">
            Zero trading fees,
            <br className="hidden xl:block" />
            more rewards.
          </h2>

          {/* Paragraph */}
          <p className="mt-5 xl:mt-6 text-[16px] xl:text-[18px] leading-[1.5] text-[#5b616e]">
            Get more out of crypto with one membership: zero trading fees,
            boosted rewards, priority support, and more.
          </p>

          {/* Button */}
          <button className="mt-7 xl:mt-8 h-[50px] xl:h-[54px] rounded-full bg-black px-8 text-[16px] font-semibold text-white hover:bg-[#111] w-full sm:w-auto">
            Claim free trial
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[520px] rounded-[24px] xl:rounded-[36px] bg-[#e9ebef] p-4 xl:p-6">
            <img
              src={coinbaseOneImage}
              alt="Coinbase One"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinbaseOneSection;
