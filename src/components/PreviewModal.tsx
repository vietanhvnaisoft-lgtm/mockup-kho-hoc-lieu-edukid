import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Minimize2,
  Maximize2,
  X,
  Bookmark,
  Eye,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize,
  RotateCcw,
  Info,
} from "lucide-react";

export interface PreviewModalProps {
  selectedResourceIndex: number | null;
  setSelectedResourceIndex: (index: number | null) => void;
  filteredMaterials: any[];
  CATEGORIES: any[];
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
  handleToggleBookmark: (id: number, e: React.MouseEvent) => void;
  formatViews: (views: number) => string;
}

export default function PreviewModal({
  selectedResourceIndex,
  setSelectedResourceIndex,
  filteredMaterials,
  CATEGORIES,
  isFullscreen,
  setIsFullscreen,
  handleToggleBookmark,
  formatViews,
}: PreviewModalProps) {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const resetPDF = () => {
    setZoomLevel(100);
    setPanPosition({ x: 0, y: 0 });
  };

  if (selectedResourceIndex === null) return null;
  const item = filteredMaterials[selectedResourceIndex];
  const category = CATEGORIES.find((c) => c.id === item.type);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetPDF();
    setIsDescExpanded(false);
    if (selectedResourceIndex > 0)
      setSelectedResourceIndex(selectedResourceIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetPDF();
    setIsDescExpanded(false);
    if (selectedResourceIndex < filteredMaterials.length - 1)
      setSelectedResourceIndex(selectedResourceIndex + 1);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 400));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 25));
  const handleFitPage = () => {
    setZoomLevel(100);
    setPanPosition({ x: 0, y: 0 });
  };
  const handleFitWidth = () => {
    setZoomLevel(150);
    setPanPosition({ x: 0, y: 0 });
  };

  // Mouse and Touch Event Handlers for PDF Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 100) return;
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPosition.x;
    const dy = e.clientY - lastPosition.y;
    setPanPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -10 : 10;
      setZoomLevel((prev) => Math.min(Math.max(prev + delta, 25), 400));
    }
  };

  const handleDoubleClick = () => {
    if (zoomLevel > 100) resetPDF();
    else setZoomLevel(200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4"
      >
        {/* Blur Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setSelectedResourceIndex(null);
            setIsFullscreen(false);
            resetPDF();
          }}
          className="absolute inset-0 bg-black backdrop-blur-[8px]"
        />

        {/* Modal Container */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{
            opacity: 1,
            scale: 1,
            width: isFullscreen ? "calc(100% - 16px)" : "min(96vw, 1800px)",
            height: isFullscreen ? "calc(100% - 16px)" : "min(94vh, 1200px)",
            borderRadius: isFullscreen ? "4px" : "16px",
          }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="bg-white shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative z-10"
        >
          {/* Minimal Header */}
          <header className="h-[60px] shrink-0 border-b border-[#EEF2F8] px-5 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              {category && (
                <div
                  className={`flex w-7 h-7 md:w-8 md:h-8 rounded-full items-center justify-center ${category.badgeColor} text-white shrink-0 shadow-sm border border-white/20 transition-all duration-300`}
                >
                  <category.icon size={14} strokeWidth={2.5} />
                </div>
              )}
              <div className="w-px h-4 bg-[#EEF2F8]" />
              <h2 className="text-[#223654] font-bold text-[14px] md:text-[15px] truncate max-w-[140px] md:max-w-[300px] xl:max-w-[600px]">
                {item.title}
              </h2>
            </div>

            <div className="flex items-center gap-1 md:gap-1.5 shrink-0">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#F8FAFD" }}
                whileTap={{ scale: 0.95 }}
                disabled={selectedResourceIndex === 0}
                onClick={handlePrev}
                className={`flex items-center justify-center gap-1 w-8 h-8 md:w-auto md:px-3 md:py-1.5 rounded-lg border border-[#EEF2F8] transition-colors ${selectedResourceIndex === 0 ? "text-gray-200" : "text-[#223654] hover:text-[#007AFF] hover:border-[#007AFF]/30"}`}
                title="Học liệu trước"
              >
                <ChevronLeft size={16} />
                <span className="text-[11px] font-bold hidden md:inline">
                  Trước
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#F8FAFD" }}
                whileTap={{ scale: 0.95 }}
                disabled={
                  selectedResourceIndex === filteredMaterials.length - 1
                }
                onClick={handleNext}
                className={`flex items-center justify-center gap-1 w-8 h-8 md:w-auto md:px-3 md:py-1.5 rounded-lg border border-[#EEF2F8] transition-colors ${selectedResourceIndex === filteredMaterials.length - 1 ? "text-gray-200" : "text-[#223654] hover:text-[#007AFF] hover:border-[#007AFF]/30"}`}
                title="Học liệu sau"
              >
                <span className="text-[11px] font-bold hidden md:inline">
                  Sau
                </span>
                <ChevronRight size={16} />
              </motion.button>
              <div className="w-px h-6 bg-[#EEF2F8] mx-0.5 md:mx-1" />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#F8FAFD" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg border border-[#EEF2F8] text-[#223654] transition-colors hover:border-[#007AFF]/30 hover:text-[#007AFF]"
                title="Toàn màn hình"
              >
                {isFullscreen ? (
                  <Minimize2 size={16} />
                ) : (
                  <Maximize2 size={16} />
                )}
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  rotate: 90,
                  backgroundColor: "#FEE2E2",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedResourceIndex(null);
                  setIsFullscreen(false);
                  resetPDF();
                }}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-slate-50 text-[#223654] transition-colors hover:text-red-600"
              >
                <X size={16} />
              </motion.button>
            </div>
          </header>

          {/* Immersive Modal Content */}
          <div className="flex-1 overflow-hidden bg-[#0A0F1E] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col relative"
              >
                {item.type === "video" && (
                  <div className="flex-1 flex flex-col bg-black relative">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full h-full aspect-video bg-black overflow-hidden flex items-center justify-center">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${item.url}?autoplay=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="max-h-full max-w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {item.type === "game" && (
                  <div className="flex-1 flex flex-col bg-[#F1F5F9]">
                    <div className="flex-1 relative">
                      <iframe
                        src={item.url}
                        className="absolute inset-0 w-full h-full border-none"
                        title={item.title}
                      />
                    </div>
                  </div>
                )}

                {item.type === "pdf" && (
                  <div
                    className="flex-1 flex flex-col bg-[#94A3B8] overflow-hidden relative cursor-grab active:cursor-grabbing touch-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => {
                      if (zoomLevel <= 100) return;
                      setIsDragging(true);
                      setLastPosition({
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY,
                      });
                    }}
                    onTouchMove={(e) => {
                      if (!isDragging) return;
                      const dx = e.touches[0].clientX - lastPosition.x;
                      const dy = e.touches[0].clientY - lastPosition.y;
                      setPanPosition((prev) => ({
                        x: prev.x + dx,
                        y: prev.y + dy,
                      }));
                      setLastPosition({ x: e.clientX, y: e.clientY });
                    }}
                    onTouchEnd={() => setIsDragging(false)}
                    onWheel={handleWheel}
                    onDoubleClick={handleDoubleClick}
                  >
                    {/* Zoom Toolbar */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
                      <button
                        onClick={handleZoomOut}
                        className="p-2 hover:bg-slate-100 rounded-lg text-[#223654]"
                        title="Zoom Out"
                      >
                        <ZoomOut size={18} />
                      </button>
                      <div className="px-3 min-w-[60px] text-center text-[12px] font-bold text-[#223654] border-x border-[#EEF2F8]">
                        {zoomLevel}%
                      </div>
                      <button
                        onClick={handleZoomIn}
                        className="p-2 hover:bg-slate-100 rounded-lg text-[#223654]"
                        title="Zoom In"
                      >
                        <ZoomIn size={18} />
                      </button>
                      <div className="w-px h-6 bg-[#EEF2F8] mx-1" />
                      <button
                        onClick={handleFitWidth}
                        className="p-2 hover:bg-slate-100 rounded-lg text-[#223654] flex items-center gap-2 text-[11px] font-bold"
                        title="Fit Width"
                      >
                        <Maximize size={16} />{" "}
                        <span className="hidden sm:inline">Vừa chiều rộng</span>
                      </button>
                      <button
                        onClick={handleFitPage}
                        className="p-2 hover:bg-slate-100 rounded-lg text-[#223654] flex items-center gap-2 text-[11px] font-bold"
                        title="Fit Page"
                      >
                        <RotateCcw size={16} />{" "}
                        <span className="hidden sm:inline">Vừa trang</span>
                      </button>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4">
                      <div
                        className="transition-transform duration-100 ease-out origin-center"
                        style={{
                          transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel / 100})`,
                        }}
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="max-w-full max-h-[80vh] shadow-2xl rounded-sm pointer-events-none select-none bg-white"
                        />
                      </div>
                    </div>

                    {item.description && (
                      <div className="absolute bottom-4 left-4 z-30">
                        <button
                          onClick={() => setIsDescExpanded(!isDescExpanded)}
                          className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur rounded-full shadow-lg text-[#223654] hover:text-[#007AFF] transition-colors border border-white/20"
                          title="Thông tin học liệu"
                        >
                          <Info size={20} />
                        </button>
                        <AnimatePresence>
                          {isDescExpanded && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute bottom-12 left-0 w-64 p-4 bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20"
                            >
                              <h4 className="text-[13px] font-bold text-[#223654] mb-2">
                                Mô tả học liệu
                              </h4>
                              <p className="text-[#5F6F87] text-[12px] leading-relaxed">
                                {item.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer - Now shown for all types including video for stability */}
          <footer className="h-[56px] shrink-0 border-t border-[#EEF2F8] px-6 flex items-center justify-between bg-white sticky bottom-0 z-20">
            <div className="flex items-center gap-6">
              <motion.button
                onClick={(e) => handleToggleBookmark(item.id, e)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 font-bold text-[12px] transition-colors ${item.bookmarked ? "text-[#223654]" : "text-[#8A97A8]"}`}
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
                    size={16}
                    className={`transition-all duration-300 ${item.bookmarked ? "fill-[#F6C445] text-[#F6C445]" : "text-[#8A97A8]"}`}
                  />
                </motion.div>
                {item.bookmarked ? "Đã lưu" : "Lưu học liệu"}
              </motion.button>
              <div className="flex items-center gap-2 text-[#8A97A8] font-bold text-[12px]">
                <Eye size={16} />
                {formatViews(item.views || 0)} lượt xem
              </div>
            </div>

            {item.type === "pdf" && (
              <motion.a
                href={item.url}
                download
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white font-black text-[12px] uppercase tracking-widest rounded-xl shadow-[0_8px_20px_rgba(0,122,255,0.3)] hover:bg-blue-700 transition-all"
              >
                <Download size={16} /> Tải PDF
              </motion.a>
            )}
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
