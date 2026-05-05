import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Home, TrendingUp, LayoutGrid, FileText, MoreVertical, BarChart2,
  Search, Bell, HelpCircle, Grid, ChevronRight, Plus,
  ArrowUp, ArrowDown, LogOut, ArrowRight, Globe, ChevronDown,
  UserPlus, Settings, Moon, X, ArrowLeftRight, Menu
} from "lucide-react";
import buysNotSupportedImg from "../assets/images/buys_not_supported.png";
import watchlistImg from "../assets/images/watchlist.png";

function Profile() {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('token');
      
      if (!token) {
        navigate("/signin", { replace: true });
        return;
      }

      try {
        const [profileRes, cryptoRes] = await Promise.all([
          axios.get("/api/auth/profile", {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("/api/crypto")
        ]);
        setUser(profileRes.data);
        setCoins(cryptoRes.data);
      } catch (err) {
        setError("Not authorized or session expired. Please log in.");
        navigate("/signin", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      sessionStorage.removeItem('token');
      localStorage.removeItem("cookieBannerDismissed");
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-gray-500 text-lg">Loading dashboard...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-red-500 text-lg">{error}</div>
    </div>
  );

  const popularCoins = coins.filter(c => ["BTC", "ETH"].includes(c.symbol)).slice(0, 2);
  const mostTraded = coins.find(c => c.symbol === "BNB") || coins[3];

  return (
    <div className="h-screen overflow-hidden bg-white text-[#0A0B0D] font-sans flex">

      {/* Left Sidebar - Hidden on Mobile */}
      <aside className="hidden md:flex w-[88px] h-screen sticky top-0 border-r border-gray-200 flex flex-col items-center py-6 shrink-0 z-50 bg-white">
        {/* Coinbase Logo */}
        <Link to="/" className="w-14 h-14 flex items-center justify-center mb-6 cursor-pointer shrink-0 hover:opacity-80 transition-opacity">
          <svg viewBox="0 0 32 32" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0c8.083 0 14.773 5.992 15.86 13.82h-9.141c-.818-3.053-3.6-5.32-6.719-5.32-3.866 0-7 3.134-7 7s3.134 7 7 7c3.12 0 5.9-2.267 6.719-5.32h9.141C29.773 26.008 23.083 32 16 32z" fill="#0052FF"/>
          </svg>
        </Link>

        {/* Nav Icons */}
        <nav className="flex flex-col items-center gap-4 w-full">
          {/* Home */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full bg-[#F3F5F7] group-hover:bg-[#E2E8F0] flex items-center justify-center transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#0052FF" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L22 10.5V22H15V14C15 13.4477 14.5523 13 14 13H10C9.44772 13 9 13.4477 9 14V22H2V10.5L12 2Z" />
              </svg>
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Home
            </div>
          </div>
          
          {/* Trade */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 17 9 11 13 15 21 7"></polyline>
                <polyline points="14 7 21 7 21 14"></polyline>
                <line x1="3" y1="22" x2="21" y2="22"></line>
              </svg>
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Trade
            </div>
          </div>
          
          {/* Lend */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="10" rx="1"></rect>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
                <line x1="6" y1="12" x2="6.01" y2="12"></line>
                <line x1="18" y1="12" x2="18.01" y2="12"></line>
              </svg>
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Lend
            </div>
          </div>
          
          {/* Transactions */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 2h14v20l-3-2-3 2-3-2-3 2-3-2V2z"></path>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="9" y1="12" x2="13" y2="12"></line>
              </svg>
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Transactions
            </div>
          </div>
          
          {/* See more */}
          <div className="relative flex justify-center w-full group">
            <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
              <MoreVertical size={30} strokeWidth={1.5} />
            </button>
            <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              See more
            </div>
          </div>
        </nav>

        {/* Bottom - Advanced */}
        <div className="mt-auto pt-10 flex flex-col items-center gap-1 pb-4 relative group w-full shrink-0">
          <button className="w-14 h-14 rounded-full text-[#0A0B0D] hover:bg-gray-100 flex items-center justify-center transition-colors">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="8" width="4" height="8" rx="0.5"></rect>
              <line x1="8" y1="4" x2="8" y2="8"></line>
              <line x1="8" y1="16" x2="8" y2="20"></line>
              <rect x="14" y="6" width="4" height="8" rx="0.5"></rect>
              <line x1="16" y1="4" x2="16" y2="6"></line>
              <line x1="16" y1="14" x2="16" y2="20"></line>
            </svg>
          </button>
          <span className="text-[12px] font-bold text-[#0A0B0D] mt-1">Advanced</span>
          <div className="w-[44px] h-[24px] mt-2 bg-[#D0D5DD] rounded-full relative cursor-pointer transition-colors">
            <div className="w-[20px] h-[20px] bg-white rounded-full absolute left-[2px] top-[2px] shadow-sm" />
          </div>
          
          {/* Advanced Tooltip */}
          <div className="absolute left-[100px] top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0A0B0D] text-white text-[13px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            Turn Coinbase Advanced on
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen max-w-full overflow-hidden relative">
        
        {/* Top Header */}
        <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 bg-white sticky top-0 z-40">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu - Mobile Only */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center -ml-2 text-[#0A0B0D]"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-[20px] md:text-[24px] font-bold">Home</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input - Responsive */}
            <div className="hidden sm:flex items-center gap-3 bg-[#F3F5F7] hover:bg-[#E2E8F0] transition-colors rounded-full px-5 h-[44px] md:h-[48px] w-[180px] md:w-[360px] cursor-text">
              <Search size={18} className="text-[#0A0B0D]" strokeWidth={2} />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none outline-none text-[15px] md:text-[16px] w-full text-[#0A0B0D] placeholder-[#5B616E]"
                readOnly
              />
            </div>
            
            {/* Mobile Search Icon */}
            <button className="flex sm:hidden w-10 h-10 rounded-full bg-[#F3F5F7] hover:bg-[#E2E8F0] items-center justify-center text-[#0A0B0D] transition-colors">
              <Search size={18} strokeWidth={2.5} />
            </button>
            
            <button className="w-10 h-10 rounded-full bg-[#F3F5F7] hover:bg-[#E2E8F0] flex items-center justify-center text-[#0A0B0D] transition-colors">
              <Bell size={18} strokeWidth={2.5} />
            </button>
            <button className="hidden md:flex w-10 h-10 rounded-full bg-[#F3F5F7] hover:bg-[#E2E8F0] items-center justify-center text-[#0A0B0D] transition-colors">
              <span className="text-[20px] font-semibold leading-none pb-[2px]">?</span>
            </button>
            
            {/* Avatar & Dropdown */}
            <div className="relative">
              <div 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center text-[16px] font-bold text-white cursor-pointer ml-1 hover:brightness-90 transition-all"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {isProfileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-[calc(100%+12px)] w-[320px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {/* User Info */}
                    <div className="px-5 py-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#0052FF] flex items-center justify-center text-[20px] font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-[#0A0B0D]">{user.name}</span>
                        <span className="text-[14px] text-[#5B616E]">{user.email}</span>
                        <button className="text-[14px] font-bold text-[#0052FF] hover:text-[#0041CC] mt-0.5 text-left">Manage account</button>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100 my-1" />

                    {/* Menu Items */}
                    <button className="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 flex items-center justify-center text-[#0A0B0D]">
                        <UserPlus size={22} strokeWidth={1.5} />
                      </div>
                      <span className="text-[16px] font-semibold text-[#0A0B0D]">Add account</span>
                    </button>

                    <button className="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 flex items-center justify-center text-[#0A0B0D]">
                        <Settings size={22} strokeWidth={1.5} />
                      </div>
                      <span className="text-[16px] font-semibold text-[#0A0B0D]">Settings</span>
                    </button>

                    <div className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 flex items-center justify-center text-[#0A0B0D]">
                          <Moon size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-[16px] font-semibold text-[#0A0B0D]">Dark mode</span>
                      </div>
                      <div className="w-[44px] h-[24px] bg-[#D0D5DD] rounded-full relative transition-colors">
                        <div className="w-[20px] h-[20px] bg-white rounded-full absolute left-[2px] top-[2px] shadow-sm" />
                      </div>
                    </div>

                    <button 
                      onClick={handleLogout}
                      className="w-full px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors group text-[#DF2038]"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <LogOut size={22} strokeWidth={2} />
                      </div>
                      <span className="text-[16px] font-bold">Sign out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Body - Unified scroll area */}
        <div className="flex flex-1 overflow-y-auto">
          
          {/* Center Column */}
          <div className="flex-1 w-full pb-[80px] md:pb-0">
            <div className="w-full px-4 md:px-12 py-6 md:py-10">
              
              {/* Balance */}
              <div className="mb-2">
                <h2 className="text-[48px] font-normal tracking-tight text-[#0A0B0D]">GHS 0.00</h2>
              </div>

              {/* Asset Categories */}
              <div className="mb-4">
                {/* Crypto Row */}
                <div className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-50 transition-colors group -mx-4 md:-mx-12 px-4 md:px-12">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0B0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="12" r="7"></circle>
                        <circle cx="15" cy="12" r="7"></circle>
                      </svg>
                    </div>
                    <span className="text-[17px] font-semibold">Crypto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] text-[#0A0B0D]">GHS 0.00</span>
                    <ChevronRight size={20} className="text-[#5B616E] group-hover:text-[#0A0B0D] transition-colors" />
                  </div>
                </div>

                {/* Cash Row */}
                <div className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-50 transition-colors group -mx-4 md:-mx-12 px-4 md:px-12">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0B0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[17px] font-semibold">Cash</span>
                      <span className="text-[14px] text-[#05B169]">
                        • 3.35% APY
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] font-bold text-[#0052FF]">Deposit</span>
                    <ChevronRight size={20} className="text-[#5B616E] group-hover:text-[#0A0B0D] transition-colors" />
                  </div>
                </div>

                {/* Derivatives Row */}
                <div className="flex items-center justify-between py-1 cursor-pointer hover:bg-gray-50 transition-colors group -mx-4 md:-mx-12 px-4 md:px-12">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0B0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <span className="text-[17px] font-semibold">Derivatives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] text-[#0A0B0D]">0 positions</span>
                    <ChevronRight size={20} className="text-[#5B616E] group-hover:text-[#0A0B0D] transition-colors" />
                  </div>
                </div>
              </div>

              {/* Full-width dividing line */}
              <div className="w-full h-[1px] bg-gray-200"></div>

              {/* Re-open container for Watchlist */}
              <div className="w-full pt-8 pb-10">
                
                {/* Watchlist Section */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-10 cursor-pointer group mt-2">
                    <h3 className="text-[20px] font-bold text-[#0A0B0D]">Watchlist</h3>
                    <div className="w-8 h-8 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <ArrowRight size={18} className="text-[#0A0B0D]" strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="flex flex-col items-center pb-8">
                    <div className="w-[120px] h-[120px] mb-6 relative flex items-center justify-center">
                      <img 
                        src={watchlistImg} 
                        alt="Watchlist" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <h4 className="text-[22px] font-bold mb-2 text-[#0A0B0D]">Build your watchlist</h4>
                    <p className="text-[15px] text-[#5B616E] text-center mb-10 leading-relaxed">
                      Keep track of crypto prices by adding assets to your watchlist
                    </p>
                    <button className="w-full py-4 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[16px] font-bold rounded-full transition-colors">
                      Add to watchlist
                    </button>
                  </div>
                </div>

                {/* Crypto Section */}
                <div className="mb-8">
                  <div className="border-t border-gray-100 -mx-4 md:-mx-12 mb-4" />
                  <div className="flex items-center justify-between mb-2 cursor-pointer group">
                    <div>
                      <h3 className="text-[20px] font-bold">Crypto</h3>
                      <p className="text-[15px] text-[#5B616E] mt-1">Trade millions of assets</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <ArrowRight size={18} className="text-[#0A0B0D]" strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="mt-4">
                    {popularCoins.map((coin) => (
                      <Link
                        key={coin._id}
                        to={`/assets/${coin.name.toLowerCase()}`}
                        className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition-colors group -mx-4 md:-mx-12 px-4 md:px-12"
                      >
                        <div className="flex items-center gap-4">
                          <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="text-[17px] font-bold">{coin.name}</p>
                            <p className="text-[15px] text-[#5B616E]">Most popular</p>
                          </div>
                        </div>
                        <button className="px-5 py-2 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[15px] font-bold rounded-full transition-colors">
                          Buy
                        </button>
                      </Link>
                    ))}

                    {mostTraded && (
                      <Link
                        to={`/assets/${mostTraded.name.toLowerCase()}`}
                        className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition-colors group -mx-4 md:-mx-12 px-4 md:px-12"
                      >
                        <div className="flex items-center gap-4">
                          <img src={mostTraded.image} alt={mostTraded.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="text-[17px] font-bold">{mostTraded.name}</p>
                            <p className="text-[15px] text-[#5B616E]">Most traded today</p>
                          </div>
                        </div>
                        <button className="px-5 py-2 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[15px] font-bold rounded-full transition-colors">
                          Buy
                        </button>
                      </Link>
                    )}
                  </div>

                  <Link
                    to="/explore"
                    className="block w-full py-3 mt-4 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[16px] font-bold rounded-full text-center transition-colors"
                  >
                    Explore all crypto
                  </Link>
                </div>

                {/* Cash Section */}
                <div className="mb-8">
                  <div className="border-t border-gray-100 -mx-4 md:-mx-12 mb-4" />
                  <div className="flex flex-col hover:bg-gray-50 transition-colors group py-2.5 -mx-4 md:-mx-12 px-4 md:px-12 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[20px] font-bold text-[#0A0B0D]">Cash</h3>
                        <p className="text-[15px] text-[#5B616E] mt-0.5">
                          Earn <span className="text-[#05B169]">3.35% APY</span>
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                        <ArrowRight size={18} className="text-[#0A0B0D]" strokeWidth={2.5} />
                      </div>
                    </div>
                    <button className="w-full mt-5 py-3.5 bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#0A0B0D] text-[16px] font-bold rounded-full transition-colors">
                      Deposit cash
                    </button>
                  </div>
                </div>

                {/* Derivatives Section */}
                <div className="mb-8">
                  <div className="border-t border-gray-100 -mx-4 md:-mx-12 mb-4" />
                  <div className="flex items-center justify-between mb-2 cursor-pointer group hover:bg-gray-50 transition-colors py-2.5 -mx-4 md:-mx-12 px-4 md:px-12">
                    <div>
                      <h3 className="text-[20px] font-bold text-[#0A0B0D]">Derivatives</h3>
                      <p className="text-[15px] text-[#5B616E] mt-0.5">Trade with up to 50x leverage</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#F3F5F7] flex items-center justify-center group-hover:bg-[#E2E8F0] transition-colors">
                      <ArrowRight size={18} className="text-[#0A0B0D]" strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="mt-2">
                    {/* Perpetual Assets */}
                    {[
                      { name: "BTC Perpetual", symbol: "INTX", color: "#F7931A", icon: "BTC" },
                      { name: "ETH Perpetual", symbol: "INTX", color: "#627EEA", icon: "ETH" },
                      { name: "SOL Perpetual", symbol: "INTX", color: "#000000", icon: "SOL" }
                    ].map((asset) => (
                      <div key={asset.name} className="flex items-center justify-between py-2.5 hover:bg-gray-50 transition-colors group -mx-4 md:-mx-12 px-4 md:px-12 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center`} style={{ backgroundColor: asset.color }}>
                            <span className="text-white text-[10px] font-bold">{asset.icon}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-[17px] font-bold text-[#0A0B0D]">{asset.name}</p>
                              <span className="px-1.5 py-0.5 bg-[#F3F5F7] text-[#0A0B0D] text-[12px] font-bold rounded">50x</span>
                            </div>
                            <p className="text-[15px] text-[#5B616E]">{asset.symbol}</p>
                          </div>
                        </div>
                        <button className="px-5 py-2 bg-[#F3F5F7] hover:bg-[#E2E8F0] text-[#0A0B0D] text-[15px] font-bold rounded-full transition-colors">
                          Trade
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 -mx-4 md:-mx-12 mt-12" />
                </div>
                
                {/* Footer Links */}
                <div className="pt-4 pb-6 flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3 text-[12px] text-[#5B616E] flex-wrap">
                    <a href="#" className="hover:text-black underline transition-all">Careers</a>
                    <a href="#" className="hover:text-black underline transition-all">Legal & Privacy</a>
                    <a href="#" className="hover:text-black underline transition-all">Accessibility Statement</a>
                    <span>© 2026 Coinbase</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F3F5F7] rounded-full text-[13px] font-bold text-[#0A0B0D] cursor-pointer hover:bg-[#E2E8F0] transition-all">
                    <span>English</span>
                    <ChevronDown size={14} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Sticky and Pinned */}
          <div className="w-[460px] border-l border-gray-200 p-8 shrink-0 hidden lg:block bg-white sticky top-0 self-start h-screen overflow-y-auto custom-scrollbar-hidden">
            
            {/* Buy/Sell/Convert Tabs */}
            <div className="flex bg-[#F3F5F7] p-1 rounded-full mb-8">
              {["buy", "sell", "convert"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-full text-[15px] font-bold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#0A0B0D] text-white shadow-md"
                      : "text-[#5B616E] hover:text-[#0A0B0D]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dynamic Card Content */}
            <div className="bg-white rounded-[16px] p-8 mb-8 text-left">
              <div className="w-60 h-60 mx-auto relative mb-0">
                <img 
                  src={buysNotSupportedImg} 
                  alt="Quick Actions" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[26px] font-bold mb-2 text-[#0A0B0D]">Quick Actions</h3>
              <p className="text-[17px] text-[#5B616E] mb-8 leading-relaxed">
                Connect your account to start trading assets directly from your dashboard.
              </p>
              <button className="w-full py-4 bg-[#0052FF] text-white text-[17px] font-bold rounded-full hover:bg-blue-700 transition-colors">
                Get started
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 mt-4">
              <button className="flex items-center gap-4 w-full py-3 px-3 rounded-2xl hover:bg-[#F3F5F7] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center flex-shrink-0">
                  <ArrowUp size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[16px] font-bold text-[#0A0B0D]">Send crypto</span>
              </button>
              <button className="flex items-center gap-4 w-full py-3 px-3 rounded-2xl hover:bg-[#F3F5F7] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center flex-shrink-0">
                  <ArrowDown size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[16px] font-bold text-[#0A0B0D]">Receive crypto</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Trading Focused */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[80px] bg-white border-t border-gray-200 flex items-center justify-between z-50 px-4 gap-2.5 pb-2">
        <button 
          onClick={() => { setActiveTab('buy'); setIsQuickActionsOpen(true); }}
          className="flex-1 h-[52px] rounded-2xl bg-[#0052FF] text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-sm"
        >
          <Plus size={18} strokeWidth={3} />
          <span className="text-[15px] font-bold">Buy</span>
        </button>
        <button 
          onClick={() => { setActiveTab('sell'); setIsQuickActionsOpen(true); }}
          className="flex-1 h-[52px] rounded-2xl bg-[#F3F5F7] text-[#0A0B0D] flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95"
        >
          <div className="w-5 h-[2px] bg-[#0A0B0D] rounded-full" />
          <span className="text-[15px] font-bold">Sell</span>
        </button>
        <button 
          onClick={() => { setActiveTab('convert'); setIsQuickActionsOpen(true); }}
          className="flex-1 h-[52px] rounded-2xl bg-[#F3F5F7] text-[#0A0B0D] flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95"
        >
          <ArrowLeftRight size={18} strokeWidth={2.5} />
          <span className="text-[15px] font-bold">Convert</span>
        </button>
      </div>

      {/* Mobile Sidebar Drawer Overlay */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[80] animate-in fade-in duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar Drawer */}
          <div className="fixed inset-y-0 left-0 w-[280px] z-[90] bg-white shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
            <div className="p-6 flex items-center justify-between mb-2">
              <Link to="/" className="cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
                <svg viewBox="0 0 32 32" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0c8.083 0 14.773 5.992 15.86 13.82h-9.141c-.818-3.053-3.6-5.32-6.719-5.32-3.866 0-7 3.134-7 7s3.134 7 7 7c3.12 0 5.9-2.267 6.719-5.32h9.141C29.773 26.008 23.083 32 16 32z" fill="#0052FF"/>
                </svg>
              </Link>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
              {/* Home */}
              <Link 
                to="/dashboard" 
                className="flex items-center gap-4 px-5 py-3.5 text-[#0052FF] bg-[#F3F7FF] rounded-full font-bold transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L22 10.5V22H15V14C15 13.4477 14.5523 13 14 13H10C9.44772 13 9 13.4477 9 14V22H2V10.5L12 2Z" />
                </svg>
                <span className="text-[17px]">Home</span>
              </Link>

              {/* Trade */}
              <Link 
                to="/explore" 
                className="flex items-center gap-4 px-5 py-3.5 text-[#0A0B0D] hover:bg-gray-50 rounded-full font-bold transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <TrendingUp size={24} strokeWidth={2} />
                <span className="text-[17px]">Trade</span>
              </Link>

              {/* Lend */}
              <button className="flex items-center justify-between w-full px-5 py-3.5 text-[#0A0B0D] hover:bg-gray-50 rounded-full font-bold transition-colors">
                <div className="flex items-center gap-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M6 12h.01M18 12h.01"></path>
                  </svg>
                  <span className="text-[17px]">Lend</span>
                </div>
                <span className="bg-[#0052FF] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">New</span>
              </button>

              {/* Transactions */}
              <button className="flex items-center gap-4 px-5 py-3.5 text-[#0A0B0D] hover:bg-gray-50 rounded-full font-bold transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"></path>
                  <path d="M14 8H8"></path>
                  <path d="M14 12H8"></path>
                  <path d="M14 16H8"></path>
                </svg>
                <span className="text-[17px]">Transactions</span>
              </button>

              {/* See more */}
              <button className="flex items-center gap-4 px-5 py-3.5 text-[#0A0B0D] hover:bg-gray-50 rounded-full font-bold transition-colors">
                <MoreVertical size={24} strokeWidth={2} />
                <span className="text-[17px]">See more</span>
              </button>
            </nav>

            <div className="p-6 border-t border-gray-100 space-y-6">
              {/* Advanced Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-[#0A0B0D] font-bold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="8" width="4" height="8" rx="0.5"></rect>
                    <line x1="8" y1="4" x2="8" y2="8"></line>
                    <line x1="8" y1="16" x2="8" y2="20"></line>
                    <rect x="14" y="6" width="4" height="8" rx="0.5"></rect>
                    <line x1="16" y1="4" x2="16" y2="6"></line>
                    <line x1="16" y1="14" x2="16" y2="20"></line>
                  </svg>
                  <span className="text-[17px]">Advanced</span>
                </div>
                <div className="w-[44px] h-[24px] bg-[#D0D5DD] rounded-full relative cursor-pointer">
                  <div className="w-[20px] h-[20px] bg-white rounded-full absolute left-[2px] top-[2px] shadow-sm" />
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-4 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-colors"
              >
                <LogOut size={22} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Quick Actions Drawer Overlay (Keep for Buy/Sell/Convert logic) */}
      {isQuickActionsOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[95] animate-in fade-in duration-300"
            onClick={() => setIsQuickActionsOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed inset-x-0 bottom-0 z-[100] bg-white rounded-t-[24px] shadow-[0_-8px_30px_rgb(0,0,0,0.12)] animate-in slide-in-from-bottom duration-300 px-6 pt-2 pb-10 max-h-[85vh] overflow-y-auto">
            {/* Handle */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-4" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] font-bold capitalize">{activeTab} crypto</h3>
              <button 
                onClick={() => setIsQuickActionsOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Buy/Sell/Convert Tabs */}
            <div className="flex bg-[#F3F5F7] p-1 rounded-full mb-8">
              {["buy", "sell", "convert"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-full text-[14px] font-bold capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-white text-black shadow-sm"
                      : "text-[#5B616E] hover:text-[#0A0B0D]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Illustrated Action Card */}
            <div className="bg-white text-center pt-4 pb-8 border-b border-gray-100">
              <h4 className="text-[24px] md:text-[28px] font-bold mb-3 leading-tight px-4">
                {activeTab === 'buy' ? 'Ready to trade?' : `You don't have anything to ${activeTab} yet`}
              </h4>
              <p className="text-[15px] md:text-[16px] text-[#5B616E] mb-8 px-6">
                {activeTab === 'buy' 
                  ? 'Connect your account to start trading assets directly from your dashboard.' 
                  : 'Get started by exploring our inventory of crypto assets'}
              </p>
              
              <div className="w-48 h-48 mx-auto relative mb-10">
                <img 
                  src={buysNotSupportedImg} 
                  alt="Quick Actions" 
                  className="w-full h-full object-contain"
                />
              </div>

              <button className="w-full py-4 bg-[#0052FF] text-white text-[16px] font-bold rounded-full hover:bg-blue-700 transition-colors shadow-sm">
                Explore assets
              </button>
            </div>

            {/* List Actions */}
            <div className="mt-6 space-y-4">
              <button className="flex items-center justify-between w-full p-2 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center text-white">
                    <ArrowUp size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-[18px] font-bold">Send crypto</span>
                </div>
              </button>
              
              <button className="flex items-center justify-between w-full p-2 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center text-white">
                    <ArrowDown size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-[18px] font-bold">Receive crypto</span>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
