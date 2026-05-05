import { useState, useEffect } from "react";
import axios from "axios";

function MarketCard() {
  const [activeTab, setActiveTab] = useState("tradable");
  const [data, setData] = useState({
    tradable: [],
    gainers: [],
    new: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allRes, gainersRes, newRes] = await Promise.all([
          axios.get("/api/crypto"),
          axios.get("/api/crypto/gainers"),
          axios.get("/api/crypto/new"),
        ]);

        const format = (arr) => arr.map(coin => ({
          ...coin,
          logo: coin.image,
          price: `GHS ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          change: coin.change24h === 0
            ? "--"
            : `${coin.change24h >= 0 ? "↗" : "↙"} ${Math.abs(coin.change24h).toFixed(2)}%`,
          flash: null,
        }));

        setData({
          tradable: format(allRes.data),
          gainers: format(gainersRes.data),
          new: format(newRes.data),
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Real-time simulation loop
  useEffect(() => {
    if (loading) return;

    const parsePrice = (str) => parseFloat(str.replace(/[^0-9.-]+/g, ""));
    const parseChange = (str) => str === "--" ? 0 : parseFloat(str.replace(/[^0-9.-]+/g, ""));

    const interval = setInterval(() => {
      setData(prevData => {
        const mutateArray = (arr) => arr.map(item => {
          const shouldUpdate = Math.random() <= 0.4;
          
          const currentPrice = parsePrice(item.price);
          const currentChange = parseChange(item.change);

          if (!shouldUpdate) {
            const defaultArrow = currentChange >= 0 ? "↗ " : "↙ ";
            const formatted = currentChange === 0 ? "--" : `${defaultArrow}${Math.abs(currentChange).toFixed(2)}%`;
            return { ...item, change: formatted, flash: null };
          }

          const visiblePriceChange = (Math.random() * 1.45) + 0.05;
          const isUp = Math.random() > 0.5;
          
          const newPrice = Math.max(0.01, currentPrice + (isUp ? visiblePriceChange : -visiblePriceChange));
          const newChange24h = currentChange + (isUp ? 0.25 : -0.25);

          const flashState = isUp ? 'up' : 'down';
          const arrow = flashState === 'up' ? "↗ " : "↙ ";
          const formattedChange = newChange24h === 0 ? "--" : `${arrow}${Math.abs(newChange24h).toFixed(2)}%`;

          return {
            ...item,
            price: `GHS ${newPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: formattedChange,
            flash: flashState
          };
        });

        return {
          tradable: mutateArray(prevData.tradable),
          gainers: mutateArray(prevData.gainers),
          new: mutateArray(prevData.new)
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [loading]);

  const tabs = [
    { id: "tradable", label: "Tradable" },
    { id: "gainers", label: "Top gainers" },
    { id: "new", label: "New on Coinbase" },
  ];

  const getCoins = () => {
    if (activeTab === "tradable") return data.tradable;
    if (activeTab === "gainers") return data.gainers;
    return data.new;
  };

  const coins = getCoins();

  return (
    <div className="w-full lg:max-w-[680px] rounded-[24px] lg:rounded-[40px] bg-black px-3 sm:px-4 lg:px-10 py-6 lg:py-9 text-white">
      {/* Tabs */}
      <div className="flex items-center gap-2 lg:gap-4 text-[14px] lg:text-[18px] font-medium overflow-x-auto custom-scrollbar-hidden pb-2 lg:pb-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-3 lg:px-6 py-1.5 lg:py-3 transition whitespace-nowrap ${
                isActive ? "bg-[#23262d] text-white" : "text-gray-400 hover:bg-[#181b20] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Coin list */}
      <div className="mt-6 lg:mt-10 space-y-5 lg:space-y-7">
        {loading ? (
          <div className="text-center text-gray-400 py-10">Loading market data...</div>
        ) : coins.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No data available</div>
        ) : (
          coins.map((coin) => {
            const isPositive = coin.change.includes("↗");
            const isNeutral = coin.change === "--";

            return (
              <div key={coin.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 lg:gap-5 min-w-0">
                  <div className="flex h-7 w-7 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-white shrink-0 overflow-hidden">
                    <img
                      src={coin.logo}
                      alt={coin.name}
                      className="h-4 w-4 lg:h-7 lg:w-7 object-contain"
                    />
                  </div>

                  <span className="text-[16px] lg:text-[30px] font-normal tracking-[-0.04em] truncate">
                    {coin.name}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-[15px] lg:text-[22px] font-normal">{coin.price}</p>

                  <p
                    className={`text-[13px] lg:text-[17px] transition-all duration-500 mt-0.5 lg:mt-1 ${
                      coin.flash === 'up'
                        ? "text-[#16c784]"
                        : coin.flash === 'down'
                        ? "text-[#ff4d5a]"
                        : isNeutral
                        ? "text-[#8b93a6]"
                        : isPositive
                        ? "text-[#16c784]"
                        : "text-[#ff4d5a]"
                    }`}
                  >
                    {coin.change}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MarketCard;