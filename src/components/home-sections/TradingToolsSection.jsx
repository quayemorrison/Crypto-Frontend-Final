import { Link } from "react-router-dom";
import tradingToolsImage from "../../assets/images/trading-tools.png";

const TradingToolsSection = () => {
  return (
    <section className="w-full min-h-[85vh] flex flex-col justify-center bg-white px-6 lg:px-10 py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 xl:gap-16 xl:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="flex justify-center xl:justify-end order-2 xl:order-1">
          <div className="w-full max-w-[580px] rounded-[24px] xl:rounded-[40px] bg-black p-4 xl:p-5">
            <img
              src={tradingToolsImage}
              alt="Trading tools"
              className="w-full rounded-[18px] lg:rounded-[26px] object-contain"
            />
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="flex justify-center xl:justify-start order-1 xl:order-2">
          <div className="max-w-[520px] flex flex-col items-center xl:items-start text-center xl:text-left">
            <h2 className="text-[32px] md:text-[40px] xl:text-[42px] font-normal leading-[1.1] xl:leading-[1.02] tracking-[-0.04em] text-black">
              Powerful tools, designed
              <br className="hidden xl:block" />
              for the advanced trader.
            </h2>

            <p className="mt-5 xl:mt-6 text-[16px] xl:text-[18px] leading-[1.5] text-[#5b616e]">
              Powerful analytical tools with the safety and security of Coinbase
              deliver the ultimate trading experience. Tap into sophisticated
              charting capabilities, real-time order books, and deep liquidity
              across hundreds of markets.
            </p>

            <Link 
              to="/signin"
              className="mt-7 xl:mt-8 inline-flex items-center justify-center h-[50px] xl:h-[54px] rounded-full bg-black px-8 text-[16px] font-semibold text-white hover:bg-[#111] transition-colors w-full sm:w-auto"
            >
              Start trading
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingToolsSection;
