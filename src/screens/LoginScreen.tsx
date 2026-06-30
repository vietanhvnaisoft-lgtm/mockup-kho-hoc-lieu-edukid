import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '../config';
import { 
  BookOpen, 
  ArrowRight, 
  User, 
  Heart, 
  Cloud, 
  Star, 
  Flower2,
  Shapes,
  Puzzle,
  Type,
  Pencil,
  Ruler,
  Palette,
  Calculator,
  Music,
  Smile,
  Sun,
  School,
  TreePine,
  TreeDeciduous
} from 'lucide-react';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if session exists and is valid (rolling 30 days)
    const sessionStr = localStorage.getItem('edu_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        const lastActive = new Date(session.user.last_active).getTime();
        const now = new Date().getTime();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        if (now - lastActive < thirtyDays) {
           navigate('/app');
        }
      } catch (e) {
        // Invalid session data, ignore and force login
      }
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    
    // Create session
    const uuid = crypto.randomUUID();
    const now = new Date().toISOString();
    const session = {
      uuid,
      user: {
        name: name.trim(),
        created_at: now,
        last_active: now,
      },
      preferences: {},
      saved_content: []
    };
    
    localStorage.setItem('edu_session', JSON.stringify(session));
    
    // Log event conceptually
    console.log({ event: "login", user_name: name.trim(), uuid, timestamp: now });
    
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF2E6] via-[#FDF5E6] to-[#E6F9F0] relative flex flex-col items-center p-3 sm:p-6 md:p-8 font-sans overflow-x-hidden">
      
      {/* Background Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top Left Area */}
        <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[8%] left-[5%] md:left-[10%] text-[#FFD166]/40">
          <Sun size={90} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ x: [0, 15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[18%] left-[12%] md:left-[22%] text-white/60">
          <Cloud size={100} fill="currentColor" />
        </motion.div>

        {/* Top Right Area */}
        <motion.div animate={{ x: [0, -20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[12%] right-[5%] md:right-[15%] text-white/50">
          <Cloud size={120} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0], rotate: [15, 0, 15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[25%] right-[15%] md:right-[25%] text-[#FFD166]/30">
          <Ruler size={64} />
        </motion.div>

        {/* Bottom Left Area */}
        <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] left-[5%] md:left-[10%] text-[#FF7A90]/20">
          <School size={110} />
        </motion.div>
        <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] left-[18%] md:left-[22%] text-[#34D399]/30">
          <TreePine size={80} />
        </motion.div>

        {/* Bottom Right Area */}
        <motion.div animate={{ rotate: [2, -2, 2] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[15%] right-[5%] md:right-[12%] text-[#34D399]/30">
          <TreeDeciduous size={100} />
        </motion.div>
        <motion.div animate={{ y: [0, -10, 0], rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-[25%] right-[20%] md:right-[28%] text-[#007AFF]/20">
          <Pencil size={70} />
        </motion.div>

        {/* Floating Accents */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute top-[40%] left-[8%] md:left-[15%] text-[#FFD166]/35">
          <Star size={40} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[45%] right-[8%] md:right-[18%] text-[#34D399]/30">
          <Music size={55} />
        </motion.div>
        <motion.div animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-[40%] left-[30%] md:left-[35%] text-[#FFD166]/30">
          <Puzzle size={60} />
        </motion.div>
      </div>

      {/* Hero Illustration Area */}
      <div className="w-full max-w-[460px] md:max-w-[600px] lg:max-w-[700px] h-[140px] sm:h-[240px] md:h-[280px] lg:h-[320px] relative z-10 flex items-center justify-center mt-2 sm:mt-8 md:mt-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Main Illustration */}
          <div className="w-full h-full flex justify-center items-end relative z-20">
            <img 
              src="/me_va_be.png" 
              alt="Mẹ và bé cùng học" 
              className="max-h-[160px] sm:max-h-[280px] md:max-h-[320px] w-auto object-contain z-20 drop-shadow-xl"
              style={{ transform: "translateY(10px)" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-full max-w-[460px] md:max-w-[580px] lg:max-w-[700px] bg-white rounded-[32px] sm:rounded-[40px] md:rounded-[48px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-5 sm:p-8 md:p-14 lg:p-16 relative z-20 mb-4 sm:mb-8"
      >
        {/* School Logo */}
        <div className="flex justify-center mb-4 sm:mb-6 -mt-10 sm:-mt-16 md:-mt-20 relative z-30">
          <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-full p-2 md:p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-pink-50 flex items-center justify-center border border-pink-100 overflow-hidden">
              <img src="/logo_edukid.png" alt="Logo Trường" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Headers */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-[#FF7A90] font-bold tracking-[0.2em] text-[12px] md:text-[16px] uppercase mb-2 sm:mb-3">
            Kho Học Liệu Số
          </h2>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-3 sm:mb-6 tracking-tight py-1 md:py-2">
            <span className="bg-gradient-to-r from-[#FF7A90] via-[#FFB6C1] to-[#FFD166] text-transparent bg-clip-text drop-shadow-sm filter">
              {APP_CONFIG.SCHOOL_NAME}
            </span>
          </h1>
          
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <div className="w-12 h-1.5 md:h-2.5 bg-[#FFD166] rounded-full"></div>
            <div className="w-1.5 h-1.5 md:h-2.5 md:w-2.5 bg-[#FFD166] rounded-full"></div>
          </div>

          <p className="text-[#6B7280] text-[14px] md:text-[18px] leading-relaxed px-1 md:px-8 font-medium">
            Đồng hành cùng phụ huynh trong hành trình phát triển của bé.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label htmlFor="parentName" className="block text-[14px] md:text-[17px] font-bold text-[#1C325B] ml-1">
              Tên phụ huynh
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className={`h-[22px] w-[22px] md:h-[24px] md:w-[24px] transition-colors ${error ? 'text-red-400' : 'text-[#9CA3AF] group-focus-within:text-[#007AFF]'}`} />
              </div>
              <input
                id="parentName"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Ví dụ: Nguyễn Văn A"
                className={`w-full h-[50px] md:h-[64px] pl-12 md:pl-14 pr-4 bg-white border-2 rounded-[20px] md:rounded-[24px] outline-none transition-all text-[15px] md:text-[18px] text-[#1C325B] placeholder:text-[#9CA3AF] font-medium ${
                  error 
                    ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100/50' 
                    : 'border-gray-200 focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/15 hover:border-gray-300'
                }`}
                maxLength={100}
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-[13px] md:text-[15px] mt-2 ml-2 font-bold flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                Vui lòng nhập tên phụ huynh
              </motion.p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full h-[50px] md:h-[64px] mt-1 sm:mt-4 bg-[#007AFF] hover:bg-[#0066CC] active:bg-[#0052A3] text-white font-bold text-[16px] md:text-[20px] rounded-[20px] md:rounded-[24px] shadow-[0_6px_20px_rgba(0,122,255,0.25)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98] transition-all flex justify-center items-center gap-2.5 group"
          >
            <BookOpen size={20} strokeWidth={2.5} className="opacity-90" />
            <span>Vào xem học liệu</span>
            <ArrowRight size={20} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1 opacity-90" />
          </button>
        </form>
        
        {/* Footer */}
        <div className="mt-4 sm:mt-8 text-center w-full pb-1 sm:pb-2">
          <p className="text-[13px] sm:text-[14px] font-medium text-[#9CA3AF] flex items-center justify-center gap-2">
            <Heart size={14} className="text-[#FF7A90]" fill="currentColor" />
            Học vui mỗi ngày cùng bé.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

