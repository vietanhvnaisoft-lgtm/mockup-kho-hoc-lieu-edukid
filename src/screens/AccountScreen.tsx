import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Edit2,
  Bookmark,
  Eye,
  PlayCircle,
  Gamepad2,
  FileText,
  Check,
  ArrowRight,
  Cloud,
  Star,
  Sparkles,
} from "lucide-react";
import { MATERIALS, CATEGORIES, AGE_GROUPS } from "./ResourcesScreen";
import PreviewModal from "../components/PreviewModal";

export default function AccountScreen() {
  const navigate = useNavigate();
  const [parentName, setParentName] = useState("Nguyễn Văn A");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempParentName, setTempParentName] = useState("Nguyễn Văn A");
  const [selectedResourceIndex, setSelectedResourceIndex] = useState<
    number | null
  >(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedAge, setSelectedAge] = useState("choi");
  const [activeCategory, setActiveCategory] = useState("all");
  const [savedMaterials, setSavedMaterials] = useState(() =>
    MATERIALS.filter((m) => [1, 2, 3, 5].includes(m.id)).map((m) => ({
      ...m,
      bookmarked: true,
    })),
  );

  const formatViews = (views: number) => {
    if (views >= 1000) return (views / 1000).toFixed(1) + "k";
    return views.toString();
  };

  const handleToggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, bookmarked: !m.bookmarked } : m)),
    );
  };

  useEffect(() => {
    const storedSession = localStorage.getItem("edu_session");
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        const name = parsed.user?.name || parsed.name;
        // if (name) setParentName(name); // Kept hardcoded to Nguyễn Văn A as requested
      } catch (e) {}
    }

    const savedAge = localStorage.getItem("edu_selected_age");
    if (savedAge) {
      setSelectedAge(savedAge);
    }
  }, []);

  const handleAgeSelect = (ageId: string) => {
    setSelectedAge(ageId);
    localStorage.setItem("edu_selected_age", ageId);
  };

  const getCategoryBadge = (type: string) => {
    const cat = CATEGORIES.find((c) => c.id === type);
    if (!cat || !cat.icon) return null;
    const Icon = cat.icon;
    return (
      <div
        className={`flex items-center justify-center rounded-full ${cat.badgeColor} text-white shadow-sm border border-white/20 transition-all duration-300
          w-7 h-7 md:w-8 md:h-8 xl:w-auto xl:h-auto xl:px-3 xl:py-1.5 xl:gap-1.5`}
      >
        <Icon size={14} className="xl:w-3 xl:h-3" strokeWidth={2.5} />
        <span className="hidden xl:block text-[10px] font-bold uppercase tracking-wide truncate">
          {cat.name}
        </span>
      </div>
    );
  };

  const filteredSavedMaterials = savedMaterials.filter((m) => {
    if (activeCategory === "all") return true;
    return m.type === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#FFF9F3] relative overflow-x-hidden font-sans text-[#223A66] flex flex-col z-0">
      {/* Background Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFE4D6] via-[#FCE3E7] to-[#DDF1F8] opacity-60" />
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#FFE5B4] opacity-15 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E0F7FA] opacity-15 blur-[120px]" />
        <div className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#FFD1DC] opacity-15 blur-[100px]" />
        <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] rounded-full bg-white opacity-40 blur-[2px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white opacity-30 blur-[2px]" />

        {/* Decorative Doodles */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] left-[3%] md:left-[8%] text-[#FFD166]/40 hidden md:block"
        >
          <Star size={64} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ x: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[22%] left-[10%] md:left-[15%] text-white/60 hidden md:block"
        >
          <Cloud size={90} fill="currentColor" />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[5%] md:left-[10%] text-[#34D399]/30 hidden md:block"
        >
          <Sparkles size={55} />
        </motion.div>

        <motion.div
          animate={{ x: [0, -20, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[35%] right-[2%] md:right-[10%] text-white/50 hidden md:block"
        >
          <Cloud size={110} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[35%] right-[6%] md:right-[12%] text-[#FF7A90]/35 hidden md:block"
        >
          <Star size={70} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, -15, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-[15%] right-[10%] md:right-[15%] text-[#007AFF]/20 hidden md:block"
        >
          <Sparkles size={65} />
        </motion.div>
      </div>

      {/* HEADER */}
      <header className="bg-white/60 backdrop-blur-md border-b border-white/50 sticky top-0 z-40 px-4 md:px-8 h-[72px] flex items-center justify-between shadow-sm">
        <button
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate("/app");
            }
          }}
          className="relative z-50 flex items-center gap-2 text-[#55657A] hover:text-[#223A66] font-bold text-sm transition-all bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm hover:shadow-md cursor-pointer"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Quay lại</span>
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-[#223A66] text-lg uppercase tracking-tight">
          Tài khoản
        </h1>

        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center border border-gray-100 overflow-hidden shrink-0 shadow-sm">
          <img
            src="/logo_edukid.png"
            alt="Logo"
            className="w-full h-full object-contain p-1"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-[800px] w-full mx-auto px-4 py-8 space-y-6">
        {/* THÔNG TIN PHỤ HUYNH */}
        <div className="bg-[#F0F7FF] rounded-[24px] p-6 shadow-[0_12px_24px_rgba(40,60,120,0.04)] border border-white/50">
          <h2 className="text-[13px] font-bold text-[#8A97A8] uppercase tracking-wider mb-4">
            Thông tin phụ huynh
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[#5F6F87] font-medium text-base">Tên:</span>
              {isEditingName ? (
                <input
                  type="text"
                  value={tempParentName}
                  onChange={(e) => setTempParentName(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border-2 border-[#007AFF] outline-none text-[#223A66] font-bold text-lg bg-white shadow-sm focus:ring-4 focus:ring-blue-500/20 transition-all w-full sm:w-[220px]"
                  autoFocus
                />
              ) : (
                <span className="text-[#223A66] font-bold text-lg">
                  {parentName}
                </span>
              )}
            </div>
            {isEditingName ? (
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-4 py-1.5 rounded-full border border-[#D1D5DB] bg-white text-[#5F6F87] font-bold text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    setParentName(tempParentName);
                    setIsEditingName(false);
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#007AFF] text-white font-bold text-sm hover:bg-blue-600 transition-colors shadow-sm"
                >
                  Lưu
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setTempParentName(parentName);
                  setIsEditingName(true);
                }}
                className="flex items-center gap-2 text-[#007AFF] hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-colors group bg-white border border-[#E0E7FF] shadow-sm self-start sm:self-auto"
              >
                <Edit2
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-bold text-sm">Sửa tên</span>
              </button>
            )}
          </div>
        </div>

        {/* BÉ ĐANG HỌC LỚP NÀO? */}
        <div className="bg-[#FFF9F0] rounded-[24px] p-6 shadow-[0_12px_24px_rgba(40,60,120,0.04)] border border-white/50">
          <h2 className="text-[13px] font-bold text-[#8A97A8] uppercase tracking-wider mb-4">
            Bé đang học lớp nào?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AGE_GROUPS.map((group) => {
              const isSelected = group.id === selectedAge;
              return (
                <div
                  key={group.id}
                  onClick={() => handleAgeSelect(group.id)}
                  className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-[20px] border-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 bg-white ${
                    isSelected
                      ? `${group.border} shadow-sm`
                      : "border-[#F1F5F9] hover:border-gray-200"
                  }`}
                >
                  {isSelected && (
                    <div
                      className={`absolute top-2 right-2 w-5 h-5 rounded-full ${group.color.replace("text-", "bg-")} text-white flex items-center justify-center`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-1 flex items-center justify-center">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span
                    className={`font-bold text-sm ${isSelected ? group.color : "text-[#5F6F87]"}`}
                  >
                    {group.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* HỌC LIỆU ĐÃ LƯU */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_24px_rgba(40,60,120,0.04)] border border-white/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-[13px] font-bold text-[#8A97A8] uppercase tracking-wider">
              Học liệu đã lưu
            </h2>
            
            {/* Category Filters */}
            <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:gap-2.5">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const Icon = cat.icon;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCategory(cat.id);
                    }}
                    className={`flex items-center justify-center gap-2 px-3 md:px-4 h-[36px] rounded-full text-[12px] font-bold transition-all border focus:outline-none ${
                      isActive
                        ? `${cat.activeBg} border-transparent ${cat.activeText} shadow-[0_4px_12px_rgba(0,0,0,0.1)]`
                        : `bg-white ${cat.inactiveBorder} ${cat.color} hover:bg-gray-50 shadow-sm`
                    }`}
                  >
                    <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-6">
            {filteredSavedMaterials.length > 0 ? (
              filteredSavedMaterials.map((item, index) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.05, 0.4) }}
                    onClick={() => {
                      const realIndex = savedMaterials.findIndex(m => m.id === item.id);
                      setSelectedResourceIndex(realIndex);
                    }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white rounded-[24px] md:rounded-[28px] border border-[#EEF3FA] shadow-[0_12px_32px_rgba(28,45,90,0.06)] overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 ease-out hover:shadow-[0_20px_48px_rgba(28,45,90,0.12)] min-h-[260px] md:min-h-[340px]"
                  >
                    <div className="relative h-[110px] md:h-[160px] overflow-hidden m-1 md:m-1.5">
                      <div className="absolute inset-0 rounded-[20px] md:rounded-[24px] overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute top-2 left-2 md:top-2.5 md:left-2.5 scale-75 md:scale-100 origin-top-left">
                        {getCategoryBadge(item.type)}
                      </div>
                    </div>

                    <div className="p-3 md:p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-[#223654] text-[13px] md:text-[16px] leading-[1.3] mb-1.5 md:mb-2 line-clamp-2 transition-colors min-h-[34px] md:min-h-[42px]">
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold text-[#8A97A8]/80 mb-3">
                        <Eye size={12} strokeWidth={2.5} />
                        <span>{formatViews(item.views || 0)} lượt xem</span>
                      </div>

                      <div className="mt-auto pt-3 border-t border-[#EEF2F8] flex items-center justify-between">
                        <motion.button
                          onClick={(e) => handleToggleBookmark(item.id, e)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 group/bookmark"
                        >
                          <motion.div
                            animate={
                              item.bookmarked
                                ? {
                                    scale: [1, 1.3, 1],
                                    rotate: [0, 10, -10, 0],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.3 }}
                          >
                            <Bookmark
                              size={18}
                              className={`w-3.5 h-3.5 md:w-[18px] md:h-[18px] transition-all duration-300 ${item.bookmarked ? "fill-[#F6C445] text-[#F6C445] drop-shadow-[0_2px_8px_rgba(246,196,69,0.3)]" : "text-[#8A97A8] group-hover/bookmark:text-[#223654]"}`}
                            />
                          </motion.div>
                          <span className={`hidden sm:inline text-[12px] font-bold transition-colors ${item.bookmarked ? "text-[#223654]" : "text-[#8A97A8] group-hover/bookmark:text-[#223654]"}`}>
                            {item.bookmarked ? "Đã lưu" : "Lưu học liệu"}
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const realIndex = savedMaterials.findIndex(m => m.id === item.id);
                            setSelectedResourceIndex(realIndex);
                          }}
                          className={`w-7 h-7 md:w-8 md:h-8 rounded-full border bg-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow group/cta ${
                            item.type === "game"
                              ? "border-orange-500 text-orange-600"
                              : item.type === "video"
                                ? "border-purple-500 text-purple-600"
                                : "border-blue-500 text-blue-600"
                          }`}
                        >
                          <ArrowRight
                            size={14}
                            strokeWidth={3}
                            className="group-hover/cta:translate-x-0.5 transition-transform"
                          />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-2 py-12 text-center">
                <p className="text-slate-400 font-medium">Chưa có học liệu nào được lưu trong mục này.</p>
              </div>
            )}
            
            {/* Loading Skeletons */}
            {filteredSavedMaterials.length === 0 && activeCategory === "all" && [1, 2].map((i) => (
              <div
                key={`skeleton-${i}`}
                className="bg-white rounded-[24px] md:rounded-[28px] border border-[#EEF3FA] shadow-[0_12px_32px_rgba(28,45,90,0.06)] overflow-hidden flex flex-col min-h-[260px] md:min-h-[340px]"
              >
                <div className="relative h-[110px] md:h-[160px] overflow-hidden m-1 md:m-1.5">
                  <div className="absolute inset-0 rounded-[20px] md:rounded-[24px] overflow-hidden shimmer-container">
                    <div className="shimmer-overlay" />
                  </div>
                </div>

                <div className="p-3 md:p-5 flex flex-col flex-1">
                  <div className="h-4 w-3/4 rounded-full shimmer-container mb-2">
                    <div className="shimmer-overlay" />
                  </div>
                  <div className="h-4 w-1/2 rounded-full shimmer-container mb-4">
                    <div className="shimmer-overlay" />
                  </div>

                  <div className="h-3 w-1/3 rounded-full shimmer-container mb-3 mt-auto">
                    <div className="shimmer-overlay" />
                  </div>

                  <div className="pt-3 border-t border-[#EEF2F8] flex items-center justify-between">
                    <div className="h-6 md:h-8 w-24 md:w-32 rounded-full shimmer-container">
                      <div className="shimmer-overlay" />
                    </div>
                    <div className="h-7 w-7 md:h-8 md:w-8 rounded-full shimmer-container">
                      <div className="shimmer-overlay" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PreviewModal
        selectedResourceIndex={selectedResourceIndex}
        setSelectedResourceIndex={setSelectedResourceIndex}
        filteredMaterials={savedMaterials}
        CATEGORIES={CATEGORIES}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        handleToggleBookmark={handleToggleBookmark}
        formatViews={formatViews}
      />
    </div>
  );
}
