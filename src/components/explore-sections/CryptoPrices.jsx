import React from "react";
import { ChevronDown } from "lucide-react";

const CryptoPrices = ({ coins, assetCharts }) => {
  return (
    <div className="px-4 md:px-9 pt-8 md:pt-16 pb-0">
      <div>
        <h2 className="text-[28px] md:text-[34px] font-semibold text-black">
          Crypto market prices
          <span className="ml-3 text-[16px] md:text-[18px] font-normal text-[#6b7280]">
            18,561 assets
          </span>
        </h2>

        <p className="mt-3 md:mt-4 max-w-[900px] text-[15px] md:text-[18px] text-[#5b616e]">
          The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24 trillion, representing a 0.34% increase from last week.
        </p>

        <button className="mt-4 text-[15px] md:text-[16px] font-medium text-[#1652f0]">
          Read more
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 md:gap-3">
        <button className="flex items-center gap-2 rounded-full bg-[#f1f3f5] px-4 md:px-5 py-2 md:py-3 text-[13px] md:text-[14px] font-medium">
          All assets <ChevronDown size={14} />
        </button>

        <button className="flex items-center gap-2 rounded-full bg-[#f1f3f5] px-4 md:px-5 py-2 md:py-3 text-[13px] md:text-[14px] font-medium">
          1D <ChevronDown size={14} />
        </button>

        <button className="flex items-center gap-2 rounded-full bg-[#f1f3f5] px-4 md:px-5 py-2 md:py-3 text-[13px] md:text-[14px] font-medium">
          GHS <ChevronDown size={14} />
        </button>

        <button className="hidden sm:flex items-center gap-2 rounded-full bg-[#f1f3f5] px-4 md:px-5 py-2 md:py-3 text-[13px] md:text-[14px] font-medium">
          10 rows <ChevronDown size={14} />
        </button>
      </div>

      <div className="mt-10 w-full overflow-hidden">
        <div className="w-full">
          <div className="grid grid-cols-[1.5fr_1fr_0.7fr] md:grid-cols-[30px_1.5fr_1fr_0.8fr_0.7fr_0.8fr_0.8fr_80px] items-center border-b border-[#e5e7eb] pb-3 text-[12px] md:text-[13px] font-medium text-[#6b7280]">
            <div className="hidden md:block"></div>
            <div>Asset</div>
            <div className="text-right md:text-left">Price</div>
            <div className="hidden md:block">Chart</div>
            <div className="text-right md:text-left">Change</div>
            <div className="hidden md:block text-[#1652f0]">Mkt cap</div>
            <div className="hidden md:block">Volume</div>
            <div className="hidden md:block">Actions</div>
          </div>

          {coins.map((coin, index) => (
            <div
              key={coin.name}
              className="grid grid-cols-[1.5fr_1fr_0.7fr] md:grid-cols-[30px_1.5fr_1fr_0.8fr_0.7fr_0.8fr_0.8fr_80px] items-center border-b border-[#e5e7eb] py-4"
            >
              <div className="hidden md:block text-[18px] text-[#6b7280]">☆</div>

              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-[32px] md:h-[36px] w-[32px] md:w-[36px] items-center justify-center rounded-full bg-[#f1f3f5]">
                  {coin.logo && (
                    <img
                      src={coin.logo}
                      alt={coin.name}
                      className="h-5 md:h-6 w-5 md:w-6 object-contain"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[13.5px] md:text-[14.5px] font-semibold text-black truncate">
                    {coin.name}
                  </div>
                  <div className="text-[11px] md:text-[12px] text-[#6b7280]">
                    {coin.symbol}
                  </div>
                </div>
              </div>

              <div className="text-[13px] md:text-[14px] text-black text-right md:text-left">
                {coin.price}
              </div>

              <div className="hidden md:flex justify-center">
                <img 
                  src={assetCharts[index % assetCharts.length]} 
                  alt="Price chart" 
                  className="h-10 w-24 object-contain"
                />
              </div>

              <div className={`text-[13px] md:text-[14px] font-medium text-right md:text-left transition-all duration-500 ${coin.flash === 'up' ? 'text-[#098551]' : coin.flash === 'down' ? 'text-[#ea3943]' : coin.changeColor}`}>
                {coin.change}
              </div>

              <div className="hidden md:block text-[14px] text-black">{coin.cap}</div>

              <div className="hidden md:block text-[14px] text-black">{coin.volume}</div>

              <div className="hidden md:block">
                <button className="rounded-full bg-[#1652f0] px-4 py-2 text-[13px] font-semibold text-white">
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-5 pb-16">
        <div className="flex items-center gap-8 text-[18px] text-black">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1652f0] text-white">
            1
          </button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>1,857</button>
          <button className="text-[#6b7280]">›</button>
        </div>

        <p className="text-[14px] text-[#6b7280]">
          1-10 of 18,561 assets
        </p>
      </div>
    </div>
  );
};

export default CryptoPrices;
