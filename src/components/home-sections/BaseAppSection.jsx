import baseAppImage from "../../assets/images/base-app.png";

const BaseAppSection = () => {
  return (
    <section className="w-full bg-white px-6 lg:px-10 py-16 lg:py-28 overflow-hidden">
      <div className="mx-auto grid max-w-[1300px] items-center gap-12 lg:gap-16 lg:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="flex justify-center order-2 lg:order-1 w-full">
          <div className="w-full max-w-[520px] rounded-[24px] lg:rounded-[36px] bg-[#e9ebef] p-4 lg:p-6">
            <img
              src={baseAppImage}
              alt="Base App"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="max-w-[520px] order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e2e5ea] px-4 py-2 text-[12px] lg:text-[13px] font-medium text-[#5b616e]">
            <span className="h-3 w-3 lg:h-4 lg:w-4 rounded-full bg-black" />
            BASE APP
          </div>

          {/* Heading */}
          <h2 className="mt-5 lg:mt-6 text-[32px] md:text-[40px] lg:text-[44px] font-normal leading-[1.1] lg:leading-[1.02] tracking-[-0.04em] text-black">
            Countless ways to earn
            <br className="hidden lg:block" />
            crypto with the Base App.
          </h2>

          {/* Paragraph */}
          <p className="mt-5 lg:mt-6 text-[16px] lg:text-[18px] leading-[1.5] text-[#5b616e]">
            An everything app to trade, create, discover, and chat, all in one place.
          </p>

          {/* Button */}
          <button className="mt-7 lg:mt-8 h-[50px] lg:h-[54px] rounded-full bg-black px-8 text-[16px] font-semibold text-white hover:bg-[#111] w-full sm:w-auto">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default BaseAppSection;
