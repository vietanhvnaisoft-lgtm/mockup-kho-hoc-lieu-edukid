import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen,
  Info, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Star,
  Sparkles,
  Heart,
  Cloud,
  User,
  LogOut
} from 'lucide-react';

const APP_STORE_LINK = "https://apps.apple.com/vn/app/edukid-qu%E1%BA%A3n-l%C3%BD-m%E1%BA%A7m-non/id6762542581?l=vi";
const GOOGLE_PLAY_LINK = "https://play.google.com/store/apps/details?id=com.vnaisoft.edukid&hl=en";
const PARENTS_CHILD_ILLUSTRATION = "/src/assets/images/parents_child_illustration_1782753238352.jpg";

const SCREENSHOTS = [
  "/src/assets/images/child_tablet_app_screen_1782793936255.jpg",
  "/src/assets/images/child_tablet_app_screen_2_1782793952854.jpg",
  "/src/assets/images/child_tablet_app_screen_3_1782793967620.jpg",
  "/src/assets/images/child_tablet_app_screen_1782793936255.jpg",
  "/src/assets/images/child_tablet_app_screen_2_1782793952854.jpg",
  "/src/assets/images/child_tablet_app_screen_3_1782793967620.jpg"
];

const FEATURES = [
  {
    icon: <img src="/src/assets/images/feature_icon_book_1782793511748.jpg" alt="Book" className="w-full h-full object-cover rounded-full mix-blend-multiply" />,
    title: "Theo dõi hoạt động hằng ngày",
    desc: "Cập nhật các hoạt động, hình ảnh và nhận xét mỗi ngày.",
    bg: "bg-[#F0F7FF]",
    border: "border-[#D1E9FF]",
    titleColor: "text-[#1E40AF]"
  },
  {
    icon: <img src="/src/assets/images/feature_icon_bell_1782793523705.jpg" alt="Bell" className="w-full h-full object-cover rounded-full mix-blend-multiply" />,
    title: "Nhận thông báo từ nhà trường",
    desc: "Nhận thông báo nhanh về lịch học, sự kiện quan trọng.",
    bg: "bg-[#FFF5F7]",
    border: "border-[#FFE4E9]",
    titleColor: "text-[#BE185D]"
  },
  {
    icon: <img src="/src/assets/images/feature_icon_calendar_1782793539532.jpg" alt="Calendar" className="w-full h-full object-cover rounded-full mix-blend-multiply" />,
    title: "Xem thực đơn và lịch học",
    desc: "Theo dõi thực đơn hằng ngày và lịch học dễ dàng.",
    bg: "bg-[#FFF9F0]",
    border: "border-[#FFEDD5]",
    titleColor: "text-[#B45309]"
  },
  {
    icon: <img src="/src/assets/images/feature_icon_chat_1782793548675.jpg" alt="Chat" className="w-full h-full object-cover rounded-full mix-blend-multiply" />,
    title: "Kết nối giáo viên và phụ huynh",
    desc: "Trao đổi, liên lạc với giáo viên mọi lúc mọi nơi.",
    bg: "bg-[#F2FFF4]",
    border: "border-[#DCFCE7]",
    titleColor: "text-[#0F766E]"
  }
];

export default function AboutScreen() {
  const navigate = useNavigate();
  const [parentName, setParentName] = useState('Phụ huynh');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const sessionStr = localStorage.getItem('edu_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        const name = session.user?.name || session.name;
        if (name) setParentName(name);
      } catch (e) {
        console.error("Session error:", e);
      }
    }
  }, []);

  const nextScreenshot = () => {
    setCurrentIdx((prev) => (prev + 1) % SCREENSHOTS.length);
  };

  const prevScreenshot = () => {
    setCurrentIdx((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  };

  const getPhoneIndices = () => {
    const len = SCREENSHOTS.length;
    return {
      left: (currentIdx - 1 + len) % len,
      center: currentIdx,
      right: (currentIdx + 1) % len
    };
  };

  const { left, center, right } = getPhoneIndices();

  return (
    <div className="min-h-screen bg-[#FCFCFD] font-sans flex flex-col relative overflow-hidden">
      {/* Decorative Elements - Soft Pastel Gradients */}
      <div className="absolute top-0 left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#FFE4E1]/80 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[15%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-bl from-[#E0F7FA]/90 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[900px] h-[900px] bg-gradient-to-tr from-[#FFF9C4]/70 to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      {/* Tiny decorations - Clouds and Stars */}
      <div className="absolute top-32 right-[12%] text-pink-300/60 rotate-12 pointer-events-none"><Star size={24} fill="currentColor" /></div>
      <div className="absolute top-48 left-[8%] text-blue-300/50 pointer-events-none"><Cloud size={40} fill="currentColor" /></div>
      <div className="absolute bottom-[25%] right-[15%] text-yellow-400/50 -rotate-12 pointer-events-none"><Star size={20} fill="currentColor" /></div>
      <div className="absolute bottom-[35%] left-[10%] text-blue-200/60 pointer-events-none"><Cloud size={48} fill="currentColor" /></div>
      <div className="absolute top-[50%] left-[6%] text-yellow-300/50 rotate-45 pointer-events-none"><Sparkles size={28} /></div>

      {/* HEADER */}
      <header className="bg-white/60 backdrop-blur-md border-b border-white/50 sticky top-0 z-40 px-4 md:px-8 h-[72px] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/app')}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-50 rounded-full flex items-center justify-center border border-pink-100 overflow-hidden shrink-0 shadow-sm">
            <img src="/logo_edukid.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-[#223A66] text-sm md:text-base leading-none">Kho Học Liệu Số</h1>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Segmented Toggle */}
        <div className="flex lg:hidden absolute left-1/2 -translate-x-1/2 items-center p-1 bg-slate-100/80 rounded-2xl border border-[#EEF3FA] h-11 w-[100px] z-10">
          {/* Active Thumb */}
          <motion.div
            initial={false}
            animate={{ x: 46 }} // Info is active, x should be shifted
            className="absolute h-9 w-[44px] bg-[#FF7A90] rounded-xl shadow-sm z-0 left-1"
          />
          
          <button
            onClick={() => navigate('/app')}
            className="flex-1 h-9 flex items-center justify-center relative z-10 text-[#55657A] hover:text-[#223A66] transition-colors"
            title="Học liệu"
          >
            <BookOpen size={18} strokeWidth={2.5} />
          </button>
          <button
            className="flex-1 h-9 flex items-center justify-center relative z-10 text-white transition-colors"
            title="Giới thiệu Edukid"
          >
            <Info size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 bg-white/40 backdrop-blur-sm p-1 rounded-full border border-white/60 shadow-sm">
          <button 
            onClick={() => navigate('/app')}
            className="flex items-center gap-2 px-6 py-2 rounded-full text-[#55657A] hover:text-[#223A66] font-bold text-sm transition-all"
          >
            <BookOpen size={18} />
            Học liệu
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-[#FF7A90] font-bold text-sm shadow-sm border border-white transition-all">
            <Info size={18} />
            Giới thiệu Edukid
          </button>
        </div>

        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-2 cursor-pointer md:border-l md:border-[#EEF3FA] md:pl-5 hover:bg-gray-50 rounded-lg p-1 transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-9 h-9 rounded-full bg-[#E0F2FE] overflow-hidden border border-[#BAE6FD] flex items-center justify-center shrink-0">
              <span className="text-[#0369A1] font-bold text-sm tracking-tighter">
                {(() => {
                  const parts = parentName.trim().split(' ');
                  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                  return parentName.substring(0, 2).toUpperCase();
                })()}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold leading-tight text-[#223A66]">{parentName}</p>
              <p className="text-xs text-[#8A97A8]">Phụ huynh</p>
            </div>
            <ChevronDown size={16} className={`text-[#8A97A8] hidden sm:block transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-[0_12px_24px_rgba(40,60,120,0.1)] border border-[#EEF3FA] overflow-hidden z-50 origin-top-right"
              >
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/account');
                  }}
                  className="w-full flex items-center justify-between text-left px-4 py-3 text-sm font-bold text-[#223A66] hover:bg-gray-50 transition-colors border-b border-[#EEF3FA]"
                >
                  Tài khoản
                  <User size={16} className="text-[#8A97A8]" />
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    localStorage.removeItem('edu_session');
                    navigate('/'); // Assuming this routes to LoginScreen
                  }}
                  className="w-full flex items-center justify-between text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  Đăng xuất
                  <LogOut size={16} className="text-red-400" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto px-3 md:px-8 py-6 md:py-8 space-y-8 md:space-y-16">
        
        {/* Hero Section - 3 Columns (Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Info & Features (4 cols) */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8 self-start pt-2 md:pt-4">
            <div className="space-y-3 md:space-y-4 text-center lg:text-left px-2 md:px-0">
              <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-display font-bold text-[#1E3A8A] leading-tight tracking-tight">
                Giới thiệu Edukid
              </h1>
              <p className="text-slate-500 text-[14px] md:text-[15px] lg:text-base leading-relaxed font-medium">
                Edukid là giải pháp toàn diện giúp gắn kết nhà trường và phụ huynh, mang đến trải nghiệm theo dõi quá trình khôn lớn của trẻ một cách trọn vẹn nhất.
              </p>
            </div>

            {/* Compact Feature List */}
            <div className="space-y-3.5 md:space-y-5 px-1 md:px-0">
              {FEATURES.map((f, idx) => (
                <div key={idx} className="flex gap-3 md:gap-4 items-start group">
                  <div className={`w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full ${f.bg} flex items-center justify-center border ${f.border} shrink-0 shadow-sm group-hover:scale-105 transition-transform overflow-hidden`}>
                    <div className="w-5 h-5 md:w-6 md:h-6">
                      {f.icon}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className={`font-display font-bold ${f.titleColor} text-[14px] md:text-[15px] lg:text-base leading-none pt-0.5`}>{f.title}</p>
                    <p className="text-slate-500 text-[12px] md:text-[13px] lg:text-sm leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN: App Preview (4 cols) */}
          <div className="md:col-span-2 lg:col-span-4 flex flex-col items-center justify-center space-y-4 md:space-y-6 pt-4 order-3 lg:order-2">
             <div className="relative flex items-center justify-center h-[380px] md:h-[440px] lg:h-[520px] w-full max-w-[600px] mx-auto">
                {/* Layered Phone Mockup Effect */}
                <AnimatePresence mode="popLayout">
                  {/* Left Layered Phone */}
                  <motion.div
                    key={`left-${left}`}
                    initial={{ opacity: 0, x: -20, rotate: -10, scale: 0.8 }}
                    animate={{ opacity: 0.5, x: -110, rotate: -8, scale: 0.85 }}
                    exit={{ opacity: 0, x: -160, rotate: -15, scale: 0.7 }}
                    className="absolute z-10 hidden md:block blur-[1px]"
                  >
                     <div className="relative w-[190px] aspect-[1/2] rounded-[38px] border-[4px] border-[#a3a3a8] bg-[#1a1a1c] p-[4px] shadow-xl ring-1 ring-black/20">
                       <div className="relative h-full w-full rounded-[30px] overflow-hidden bg-white">
                         {/* Dynamic Island */}
                         <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[54px] h-[16px] bg-[#1a1a1c] rounded-full z-10"></div>
                         <img src={SCREENSHOTS[left]} className="w-full h-full object-cover" alt="prev" />
                       </div>
                     </div>
                  </motion.div>

                  {/* Primary Center Phone */}
                  <motion.div
                    key={`center-${center}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) nextScreenshot();
                      else if (info.offset.x > 50) prevScreenshot();
                    }}
                    className="relative z-30 h-full aspect-[1/2] touch-none cursor-grab active:cursor-grabbing"
                  >
                     <div className="relative h-full w-full rounded-[48px] border-[6px] border-[#a3a3a8] bg-[#1a1a1c] p-[6px] shadow-[0_30px_60px_rgba(28,45,90,0.15)] ring-1 ring-black/20">
                       {/* Phone Action Button & Volume Buttons (Subtle left side details) */}
                       <div className="absolute top-[80px] -left-[7px] w-[2px] h-[16px] bg-[#8e8e93] rounded-l-sm" />
                       <div className="absolute top-[110px] -left-[7px] w-[2px] h-[32px] bg-[#8e8e93] rounded-l-sm" />
                       <div className="absolute top-[150px] -left-[7px] w-[2px] h-[32px] bg-[#8e8e93] rounded-l-sm" />
                       {/* Power Button (Right side) */}
                       <div className="absolute top-[120px] -right-[7px] w-[2px] h-[48px] bg-[#8e8e93] rounded-r-sm" />
                       
                       <div className="relative h-full w-full rounded-[38px] overflow-hidden bg-white">
                         {/* Dynamic Island */}
                         <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[76px] h-[22px] bg-[#1a1a1c] rounded-full z-10 flex items-center justify-end px-1.5">
                           <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0c] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
                         </div>
                         <img src={SCREENSHOTS[center]} className="w-full h-full object-cover" alt="current" />
                       </div>
                     </div>
                  </motion.div>

                  {/* Right Layered Phone */}
                  <motion.div
                    key={`right-${right}`}
                    initial={{ opacity: 0, x: 20, rotate: 10, scale: 0.8 }}
                    animate={{ opacity: 0.5, x: 110, rotate: 8, scale: 0.85 }}
                    exit={{ opacity: 0, x: 160, rotate: 15, scale: 0.7 }}
                    className="absolute z-10 hidden md:block blur-[1px]"
                  >
                     <div className="relative w-[190px] aspect-[1/2] rounded-[38px] border-[4px] border-[#a3a3a8] bg-[#1a1a1c] p-[4px] shadow-xl ring-1 ring-black/20">
                       <div className="relative h-full w-full rounded-[30px] overflow-hidden bg-white">
                         {/* Dynamic Island */}
                         <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[54px] h-[16px] bg-[#1a1a1c] rounded-full z-10"></div>
                         <img src={SCREENSHOTS[right]} className="w-full h-full object-cover" alt="next" />
                       </div>
                     </div>
                  </motion.div>
                </AnimatePresence>

                {/* Minimal Arrows - Moved closer to the mockup for tablet/desktop */}
                <button 
                  onClick={prevScreenshot}
                  className="absolute left-4 lg:left-[-10px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-[#223A66] hover:bg-white hover:scale-110 transition-all z-40"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={nextScreenshot}
                  className="absolute right-4 lg:right-[-10px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-[#223A66] hover:bg-white hover:scale-110 transition-all z-40"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
             </div>

             {/* Minimal Pagination Dots */}
             <div className="flex justify-center gap-2">
                {SCREENSHOTS.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIdx ? 'bg-[#FF7A90] w-4' : 'bg-gray-300'}`}
                  />
                ))}
             </div>
          </div>

          {/* RIGHT COLUMN: Download CTA (4 cols) */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col justify-center self-start pt-6 md:pt-4 lg:pt-12 relative px-2 md:px-0 order-2 lg:order-3">
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[24px] p-6 md:p-8 border border-gray-100 shadow-[0_20px_40px_rgba(28,45,90,0.06)] space-y-5 md:space-y-6 w-full max-w-[340px] mx-auto relative lg:mt-0 md:mt-2"
             >
                {/* Mascot Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: -5 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute -top-8 -right-4 md:-top-10 md:-right-6 w-16 h-16 md:w-20 md:h-20 z-20 pointer-events-none hidden sm:block"
                >
                  <img src="/logo_edukid.png" alt="Edukid Logo" className="w-full h-full object-contain drop-shadow-lg" />
                </motion.div>

                <div className="text-center space-y-1 relative z-10">
                   <h4 className="text-xl md:text-2xl font-display font-bold text-[#1E3A8A]">Tải ngay Edukid</h4>
                   <p className="text-slate-500 text-[13px] md:text-sm font-medium">Đồng hành cùng nhà trường mọi lúc.</p>
                </div>

                <div className="space-y-3 md:space-y-4 pt-1 md:pt-2">
                   <div className="relative">
                     {/* Ribbon Badge */}
                     <div className="absolute -top-2.5 -right-1.5 bg-[#FF6B9D] text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-md z-10 rotate-12 border-2 border-white pointer-events-none">
                       Miễn phí
                     </div>
                     <a 
                      href={APP_STORE_LINK} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative flex items-center gap-3 bg-[#1A1D23] text-white px-5 md:px-6 h-[48px] md:h-[54px] rounded-full shadow-[0_8px_16px_rgba(26,29,35,0.15)] hover:shadow-[0_12px_24px_rgba(26,29,35,0.2)] transition-all hover:-translate-y-0.5 active:scale-95 group w-full"
                    >
                      <svg viewBox="0 0 384 512" className="w-[22px] h-[22px] md:w-[26px] md:h-[26px]" fill="currentColor">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                      </svg>
                      <div className="text-left">
                        <p className="text-[8px] uppercase font-bold opacity-60 tracking-wider">Tải trên</p>
                        <p className="text-[15px] md:text-[17px] font-black leading-none">App Store</p>
                      </div>
                    </a>
                   </div>
                  <a 
                    href={GOOGLE_PLAY_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#1A1D23] text-white px-5 md:px-6 h-[48px] md:h-[54px] rounded-full shadow-[0_8px_16px_rgba(26,29,35,0.15)] hover:shadow-[0_12px_24px_rgba(26,29,35,0.2)] transition-all hover:-translate-y-0.5 active:scale-95 group w-full"
                  >
                    <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                      <path fill="#FBBC04" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z"/>
                      <path fill="#4285F4" d="M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z"/>
                      <path fill="#34A853" d="M13.544 10.989l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z"/>
                      <path fill="#EA4335" d="M13.544 13.056l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-[8px] uppercase font-bold opacity-60 tracking-wider">Tải trên</p>
                      <p className="text-[15px] md:text-[17px] font-black leading-none">Google Play</p>
                    </div>
                  </a>
                </div>

                <div className="pt-3 md:pt-4 flex justify-center border-t border-gray-50 relative mt-1 md:mt-2">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,157,0.15)_0%,transparent_70%)] blur-md pointer-events-none" />
                   
                   {/* Doodles */}
                   <div className="absolute top-2 left-6 text-pink-400 opacity-80 -rotate-12"><Heart size={16} fill="currentColor" /></div>
                   <div className="absolute top-10 right-4 text-yellow-400 opacity-80 rotate-12"><Star size={14} fill="currentColor" /></div>
                   <div className="absolute bottom-2 left-2 text-blue-300 opacity-80 -rotate-45"><Sparkles size={12} /></div>
                   
                   <img 
                    src={PARENTS_CHILD_ILLUSTRATION} 
                    alt="Illustration" 
                    className="max-w-[140px] md:max-w-[170px] w-full h-auto rounded-2xl object-cover opacity-95 relative z-10 transition-transform hover:scale-105"
                   />
                </div>
             </motion.div>
          </div>
        </div>

        {/* Footer - Simplified */}
        <footer className="text-center border-t border-white/50 pt-10 pb-6">
           <p className="text-[13px] text-slate-500 font-bold tracking-wide flex items-center justify-center gap-2">
             © 2024 Edukid <span className="text-gray-200">•</span> VNAISOFT
           </p>
        </footer>
      </main>
    </div>
  );
}
