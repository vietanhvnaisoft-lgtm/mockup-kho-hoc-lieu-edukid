import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Bell,
  BookOpen,
  Info,
  ChevronDown,
  Edit2,
  Calendar,
  PlayCircle,
  Gamepad2,
  FileText,
  Printer,
  Music,
  Eye,
  Bookmark,
  LayoutGrid,
  List,
  X,
  Clock,
  ChevronLeft,
  ChevronRight,
  Minimize2,
  Maximize2,
  Play,
  Download,
  Share2,
  Copy,
  ZoomIn,
  ZoomOut,
  Maximize,
  RotateCcw,
  Sun,
  Cloud,
  Ruler,
  School,
  TreePine,
  TreeDeciduous,
  Pencil,
  Star,
  Puzzle,
  Home,
  Users,
  Briefcase,
  Dog,
  Leaf,
  Flower2,
  Car,
  Globe,
  Map,
  Check,
  ArrowRight,
  User,
  LogOut,
} from "lucide-react";
import { APP_CONFIG } from "../config";
import PreviewModal from "../components/PreviewModal";

export const AGE_GROUPS = [
  {
    id: "nhatre",
    name: "Nhà trẻ",
    age: "3-36 tháng tuổi",
    color: "text-[#00A3FF]",
    bg: "bg-gradient-to-b from-[#E5F3FF] to-[#F5FAFF]",
    border: "border-[#00A3FF]",
    image: "/nha_tre.png",
  },
  {
    id: "mam",
    name: "Mầm",
    age: "3-4 tuổi",
    color: "text-[#00C46A]",
    bg: "bg-gradient-to-b from-[#E8F8EE] to-[#F6FCF8]",
    border: "border-[#00C46A]",
    image: "/mam.png",
  },
  {
    id: "choi",
    name: "Chồi",
    age: "4-5 tuổi",
    color: "text-[#FF9800]",
    bg: "bg-gradient-to-b from-[#FFF3E0] to-[#FFFBF5]",
    border: "border-[#FF9800]",
    image: "/choi.png",
  },
  {
    id: "la",
    name: "Lá",
    age: "5-6 tuổi",
    color: "text-[#FF7A90]",
    bg: "bg-gradient-to-b from-[#FFE8EC] to-[#FFF5F7]",
    border: "border-[#FF7A90]",
    image: "/la.png",
  },
];

const TOPICS = [
  {
    id: "9",
    name: "Trường mầm non • Bản thân",
    shortName: "Trường học",
    month: "Tháng 9",
    count: 32,
    icon: School,
    color: "text-[#3B82F6]",
    bg: "bg-[#EFF6FF]",
    border: "border-[#BFDBFE]",
  },
  {
    id: "10",
    name: "Gia đình bé",
    shortName: "Gia đình",
    month: "Tháng 10",
    count: 28,
    icon: Users,
    color: "text-[#EC4899]",
    bg: "bg-[#FDF2F8]",
    border: "border-[#FBCFE8]",
  },
  {
    id: "11",
    name: "Nghề nghiệp",
    shortName: "Nghề nghiệp",
    month: "Tháng 11",
    count: 30,
    icon: Briefcase,
    color: "text-[#F97316]",
    bg: "bg-[#FFF7ED]",
    border: "border-[#FFEDD5]",
  },
  {
    id: "12",
    name: "Động vật",
    shortName: "Động vật",
    month: "Tháng 12",
    count: 27,
    icon: Dog,
    color: "text-[#10B981]",
    bg: "bg-[#ECFDF5]",
    border: "border-[#D1FAE5]",
  },
  {
    id: "1",
    name: 'Thực vật "Hoa quả"',
    shortName: "Thực vật",
    month: "Tháng 1",
    count: 29,
    icon: Leaf,
    color: "text-[#84CC16]",
    bg: "bg-[#F7FEE7]",
    border: "border-[#ECFCCB]",
  },
  {
    id: "2",
    name: "Tết mùa xuân",
    shortName: "Mùa xuân",
    month: "Tháng 2",
    count: 31,
    icon: Flower2,
    color: "text-[#EF4444]",
    bg: "bg-[#FEF2F2]",
    border: "border-[#FECACA]",
  },
  {
    id: "3",
    name: "Phương tiện giao thông",
    shortName: "Giao thông",
    month: "Tháng 3",
    count: 26,
    icon: Car,
    color: "text-[#EAB308]",
    bg: "bg-[#FEFCE8]",
    border: "border-[#FEF08A]",
  },
  {
    id: "4",
    name: "Thế giới tự nhiên",
    shortName: "Tự nhiên",
    month: "Tháng 4",
    count: 35,
    icon: TreeDeciduous,
    color: "text-[#14B8A6]",
    bg: "bg-[#F0FDFA]",
    border: "border-[#CCFBF1]",
  },
  {
    id: "5",
    name: "Quê hương",
    shortName: "Quê hương",
    month: "Tháng 5",
    count: 24,
    icon: Map,
    color: "text-[#0EA5E9]",
    bg: "bg-[#F0F9FF]",
    border: "border-[#BAE6FD]",
  },
];

export const CATEGORIES = [
  {
    id: "all",
    name: "Tất cả",
    icon: LayoutGrid,
    color: "text-blue-600",
    activeBg: "bg-blue-600",
    activeText: "text-white",
    inactiveBg: "bg-white",
    inactiveBorder: "border-blue-200",
  },
  {
    id: "pdf",
    name: "Mẫu in PDF",
    icon: FileText,
    color: "text-blue-600",
    badgeColor: "bg-blue-500",
    activeBg: "bg-blue-500",
    activeText: "text-white",
    inactiveBg: "bg-white",
    inactiveBorder: "border-blue-200",
  },
  {
    id: "game",
    name: "Trò chơi tương tác",
    icon: Gamepad2,
    color: "text-orange-600",
    badgeColor: "bg-orange-500",
    activeBg: "bg-orange-500",
    activeText: "text-white",
    inactiveBg: "bg-white",
    inactiveBorder: "border-orange-200",
  },
  {
    id: "video",
    name: "Video",
    icon: PlayCircle,
    color: "text-purple-600",
    badgeColor: "bg-purple-500",
    activeBg: "bg-purple-500",
    activeText: "text-white",
    inactiveBg: "bg-white",
    inactiveBorder: "border-purple-200",
  },
];

const TOPIC_THEMES: Record<
  string,
  {
    gradient: string;
    bg: string;
    accent: string;
    lightAccent: string;
    text: string;
    border: string;
    decorations: string[];
  }
> = {
  "9": {
    // School
    gradient: "from-[#F5FBFF] to-[#DDEEFF]",
    bg: "bg-[#F5FBFF]",
    accent: "bg-[#007AFF]",
    lightAccent: "bg-[#F2F8FF]",
    text: "text-[#007AFF]",
    border: "border-[#B8D7FF]",
    decorations: ["🎒", "🖍️", "✏️", "🏫"],
  },
  "10": {
    // Family
    gradient: "from-[#FFF7F9] to-[#FFE8F2]",
    bg: "bg-[#FFF7F9]",
    accent: "bg-[#FF7A90]",
    lightAccent: "bg-[#FFF5F7]",
    text: "text-[#FF7A90]",
    border: "border-[#FFD6DD]",
    decorations: ["❤️", "🏠", "⭐", "👨‍👩‍👧‍👦"],
  },
  "11": {
    // Jobs
    gradient: "from-[#FFF8EF] to-[#FFE8C8]",
    bg: "bg-[#FFF8EF]",
    accent: "bg-[#EA580C]",
    lightAccent: "bg-[#FFF7ED]",
    text: "text-[#EA580C]",
    border: "border-[#FED7AA]",
    decorations: ["⭐", "🛠️", "🧩", "🎨"],
  },
  "12": {
    // Animals
    gradient: "from-[#F5FFF6] to-[#DDF8E7]",
    bg: "bg-[#F5FFF6]",
    accent: "bg-[#059669]",
    lightAccent: "bg-[#F0FDF4]",
    text: "text-[#059669]",
    border: "border-[#A7F3D0]",
    decorations: ["🐾", "🍃", "☁️", "🦁"],
  },
  "1": {
    // Plants
    gradient: "from-[#F8FFF1] to-[#E7FAD8]",
    bg: "bg-[#F8FFF1]",
    accent: "bg-[#16A34A]",
    lightAccent: "bg-[#F7FEE7]",
    text: "text-[#16A34A]",
    border: "border-[#D9F99D]",
    decorations: ["🌸", "🍃", "🦋", "🌱"],
  },
  "2": {
    // Tet/Spring
    gradient: "from-[#FFF5F5] to-[#FFE0E0]",
    bg: "bg-[#FFF5F5]",
    accent: "bg-[#EF4444]",
    lightAccent: "bg-[#FEF2F2]",
    text: "text-[#EF4444]",
    border: "border-[#FECACA]",
    decorations: ["🏮", "🧧", "🌸", "🧨"],
  },
  "3": {
    // Transportation
    gradient: "from-[#FFFBEB] to-[#FEF3C7]",
    bg: "bg-[#FFFBEB]",
    accent: "bg-[#EAB308]",
    lightAccent: "bg-[#FEFCE8]",
    text: "text-[#EAB308]",
    border: "border-[#FEF08A]",
    decorations: ["☁️", "✈️", "🚦", "🚗"],
  },
  "4": {
    // Nature
    gradient: "from-[#F0FDFA] to-[#CCFBF1]",
    bg: "bg-[#F0FDFA]",
    accent: "bg-[#14B8A6]",
    lightAccent: "bg-[#F0FDFA]",
    text: "text-[#14B8A6]",
    border: "border-[#99F6E4]",
    decorations: ["🌈", "☀️", "💧", "⚡"],
  },
  "5": {
    // Country
    gradient: "from-[#F0F9FF] to-[#E0F2FE]",
    bg: "bg-[#F0F9FF]",
    accent: "bg-[#0EA5E9]",
    lightAccent: "bg-[#F0F9FF]",
    text: "text-[#0EA5E9]",
    border: "border-[#BAE6FD]",
    decorations: ["🇻🇳", "🌏", "🏯", "🛶"],
  },
};

export const MATERIALS = [
  {
    id: 1,
    type: "game",
    title: "Nối quả với màu phù hợp",
    ageGroup: "Lớp Chồi",
    views: 892,
    thumbnail:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=600&auto=format&fit=crop",
    url: "https://edukid.vietnamai.com.vn/Game_Html_Edukid/N%E1%BB%91i%20qu%E1%BA%A3%20v%E1%BB%9Bi%20m%C3%A0u%20ph%C3%B9%20h%E1%BB%A3p.html",
    description:
      "Trò chơi tương tác giúp bé nhận biết các loại quả và phân loại chúng theo màu sắc tương ứng.",
    bookmarked: false,
  },
  {
    id: 2,
    type: "video",
    title: "Video học tập: Khám phá thế giới động vật",
    ageGroup: "Lớp Lá",
    views: 1200,
    thumbnail: "https://img.youtube.com/vi/3b3TkFbfvfE/hqdefault.jpg",
    url: "3b3TkFbfvfE",
    description:
      "Cùng bé khám phá những điều thú vị về thế giới động vật quanh ta qua video sinh động.",
    bookmarked: false,
  },
  {
    id: 3,
    type: "pdf",
    title: "Số lượng phạm vi 5",
    ageGroup: "Lớp Mầm",
    views: 2000,
    thumbnail:
      "https://edukid.vietnamai.com.vn/Edukid/Nhan_thuc_print/Noi_so_luong_voi_o_vuong/4.%20%C4%90%E1%BB%99ng%20v%E1%BA%ADt/4-5t-S%E1%BB%91%20l%C6%B0%E1%BB%A3ng%20ph%E1%BA%A1m%20vi%205.png",
    url: "https://edukid.vietnamai.com.vn/Edukid/Nhan_thuc_print/Noi_so_luong_voi_o_vuong/4.%20%C4%90%E1%BB%99ng%20v%E1%BA%ADt/4-5t-S%E1%BB%91%20l%C6%B0%E1%BB%A3ng%20ph%E1%BA%A1m%20vi%205.png",
    description:
      "Mẫu in PDF giúp bé tập làm quen với các con số và đếm số lượng trong phạm vi 5.",
    bookmarked: false,
  },
  {
    id: 4,
    type: "game",
    title: "Phân loại đồ chơi",
    ageGroup: "Lớp Chồi",
    views: 754,
    thumbnail:
      "https://images.unsplash.com/photo-1537735319906-aba8a39fca29?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Giúp bé phân loại các món đồ chơi theo kích thước và chủng loại.",
    bookmarked: false,
  },
  {
    id: 5,
    type: "video",
    title: "Kể chuyện: Chú thỏ thông minh",
    ageGroup: "Lớp Lá",
    views: 3100,
    thumbnail: "https://img.youtube.com/vi/fX_w3YVl6_Y/hqdefault.jpg",
    url: "fX_w3YVl6_Y",
    description:
      "Câu chuyện kể về sự thông minh và nhanh trí của chú thỏ trước bác gấu hung dữ.",
    bookmarked: false,
  },
  {
    id: 6,
    type: "pdf",
    title: "Tập tô màu bảng chữ cái",
    ageGroup: "Lớp Mầm",
    views: 1500,
    thumbnail:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Bộ học liệu tập tô giúp bé làm quen với các mặt chữ cái tiếng Việt.",
    bookmarked: false,
  },
  {
    id: 7,
    type: "game",
    title: "Tìm hình giống nhau",
    ageGroup: "Lớp Chồi",
    views: 920,
    thumbnail:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Rèn luyện khả năng quan sát và trí nhớ cho bé qua trò chơi tìm cặp hình trùng khớp.",
    bookmarked: false,
  },
  {
    id: 8,
    type: "video",
    title: "Bài hát: Cả tuần đều ngoan",
    ageGroup: "Lớp Lá",
    views: 4500,
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    url: "dQw4w9WgXcQ",
    description:
      "Giai điệu vui tươi giúp bé hào hứng học tập và rèn luyện đạo đức mỗi ngày.",
    bookmarked: false,
  },
  {
    id: 9,
    type: "pdf",
    title: "Nối số với vật tương ứng",
    ageGroup: "Lớp Mầm",
    views: 2800,
    thumbnail:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Bài tập nối giúp bé phát triển tư duy logic và khả năng nhận biết số lượng.",
    bookmarked: false,
  },
  {
    id: 10,
    type: "game",
    title: "Xếp hình khối cơ bản",
    ageGroup: "Lớp Chồi",
    views: 1100,
    thumbnail:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Làm quen với các hình khối tròn, vuông, tam giác qua trò chơi xếp hình vui nhộn.",
    bookmarked: false,
  },
  {
    id: 11,
    type: "video",
    title: "Thực hành: Rửa tay đúng cách",
    ageGroup: "Lớp Lá",
    views: 5600,
    thumbnail:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
    url: "p_8y_X_Z_08",
    description:
      "Video hướng dẫn bé các bước vệ sinh tay sạch sẽ để bảo vệ sức khỏe.",
    bookmarked: false,
  },
  {
    id: 12,
    type: "pdf",
    title: "Phân biệt to - nhỏ",
    ageGroup: "Lớp Mầm",
    views: 1900,
    thumbnail:
      "https://images.unsplash.com/photo-1490312278390-ab6414f8d2f5?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Bài tập giúp bé rèn luyện khả năng so sánh kích thước các vật thể xung quanh.",
    bookmarked: false,
  },
  {
    id: 13,
    type: "game",
    title: "Phòng tránh nguy hiểm",
    ageGroup: "Lớp Chồi",
    views: 1300,
    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Trò chơi giáo dục kỹ năng sống giúp bé nhận biết các tình huống nguy hiểm.",
    bookmarked: false,
  },
  {
    id: 14,
    type: "video",
    title: "Khám phá: Vòng đời của bướm",
    ageGroup: "Lớp Lá",
    views: 2400,
    thumbnail:
      "https://images.unsplash.com/photo-1536715615418-494d4d12c222?q=80&w=600&auto=format&fit=crop",
    url: "v_K_Y_h_P_u_8",
    description:
      "Hành trình kỳ diệu từ chú sâu nhỏ biến thành nàng bướm xinh đẹp qua thước phim sống động.",
    bookmarked: false,
  },
  {
    id: 15,
    type: "pdf",
    title: "Nhận biết các loại phương tiện",
    ageGroup: "Lớp Mầm",
    views: 3200,
    thumbnail:
      "https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Bộ tranh ảnh về các phương tiện giao thông đường bộ, đường thủy và đường hàng không.",
    bookmarked: false,
  },
  {
    id: 16,
    type: "game",
    title: "Âm thanh của các loài vật",
    ageGroup: "Lớp Chồi",
    views: 1600,
    thumbnail:
      "https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Bé tập lắng nghe và đoán tên con vật qua tiếng kêu đặc trưng của chúng.",
    bookmarked: false,
  },
  {
    id: 17,
    type: "video",
    title: "Thí nghiệm: Núi lửa phun trào",
    ageGroup: "Lớp Lá",
    views: 6700,
    thumbnail:
      "https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=600&auto=format&fit=crop",
    url: "l_O_M_R_o_I_U",
    description:
      "Cùng bé thực hiện các thí nghiệm khoa học đơn giản và thú vị ngay tại lớp.",
    bookmarked: false,
  },
  {
    id: 18,
    type: "pdf",
    title: "Tư duy logic: Tìm đường trong mê cung",
    ageGroup: "Lớp Mầm",
    views: 2100,
    thumbnail:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Thử thách trí thông minh của bé qua các bài tập tìm đường thoát khỏi mê cung.",
    bookmarked: false,
  },
  {
    id: 19,
    type: "game",
    title: "Làm quen với các chữ số",
    ageGroup: "Lớp Chồi",
    views: 1800,
    thumbnail:
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Trò chơi tương tác giúp bé bước đầu nhận diện mặt các chữ số cơ bản.",
    bookmarked: false,
  },
  {
    id: 20,
    type: "video",
    title: "Học tiếng Anh: Màu sắc (Colors)",
    ageGroup: "Lớp Lá",
    views: 8900,
    thumbnail:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
    url: "ybt2jhLu_Hw",
    description:
      "Bé tập gọi tên các màu sắc bằng tiếng Anh qua những hình ảnh vui nhộn.",
    bookmarked: false,
  },
  {
    id: 21,
    type: "pdf",
    title: "Giáo dục cảm xúc: Bé đang cảm thấy thế nào?",
    ageGroup: "Lớp Mầm",
    views: 1400,
    thumbnail:
      "https://images.unsplash.com/photo-1494451930944-8998632c212e?q=80&w=600&auto=format&fit=crop",
    url: "#",
    description:
      "Bộ tranh giúp bé nhận biết và thể hiện các trạng thái cảm xúc của bản thân.",
    bookmarked: false,
  },
];

export default function ResourcesScreen() {
  const navigate = useNavigate();
  const [parentName, setParentName] = useState("Nguyễn Văn A");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedAgeTemp, setSelectedAgeTemp] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("9");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResourceIndex, setSelectedResourceIndex] = useState<
    number | null
  >(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [materials, setMaterials] = useState(MATERIALS);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedMonth, activeCategory, selectedAge]);

  const filteredMaterials = materials.filter((m) => {
    const matchesCategory =
      activeCategory === "all" || m.type === activeCategory;
    const matchesSearch = m.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, bookmarked: !m.bookmarked } : m)),
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedResourceIndex === null) return;

      if (e.key === "Escape") {
        setSelectedResourceIndex(null);
        setIsFullscreen(false);
      } else if (e.key === "ArrowRight") {
        if (selectedResourceIndex < filteredMaterials.length - 1) {
          setSelectedResourceIndex((prev) => (prev !== null ? prev + 1 : null));
        }
      } else if (e.key === "ArrowLeft") {
        if (selectedResourceIndex > 0) {
          setSelectedResourceIndex((prev) => (prev !== null ? prev - 1 : null));
        }
      } else if (e.key === "f" || e.key === "F") {
        setIsFullscreen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedResourceIndex, filteredMaterials.length]);

  useEffect(() => {
    const storedSession = localStorage.getItem("edu_session");
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        const name = parsed.user?.name || parsed.name;
        if (name) setParentName(name);
      } catch (e) {}
    }
    const savedAge = localStorage.getItem("edu_selected_age");
    if (savedAge) {
      setSelectedAge(savedAge);
      setIsModalOpen(false);
    }
  }, []);

  const handleConfirmAge = () => {
    if (selectedAgeTemp) {
      setSelectedAge(selectedAgeTemp);
      setIsModalOpen(false);
      localStorage.setItem("edu_selected_age", selectedAgeTemp);
    }
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

  const formatViews = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  const SkeletonBase: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`shimmer-container ${className}`}>
      <div className="shimmer-overlay" />
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-white rounded-[24px] md:rounded-[28px] border border-[#EEF2F7] overflow-hidden flex flex-col min-h-[260px] md:min-h-[340px] shadow-sm">
      <div className="relative h-[110px] md:h-[160px] m-1 md:m-1.5 overflow-hidden rounded-[20px] md:rounded-[24px]">
        <SkeletonBase className="absolute inset-0" />
      </div>
      <div className="p-3 md:p-5 flex flex-col flex-1">
        <SkeletonBase className="h-4 md:h-5 w-3/4 rounded-full mb-3" />
        <div className="flex flex-col gap-2 mb-4">
          <SkeletonBase className="h-3 w-1/2 rounded-full" />
          <SkeletonBase className="h-3 w-1/3 rounded-full" />
        </div>
        <div className="mt-auto pt-2 md:pt-3 border-t border-[#EEF2F8] flex items-center justify-between">
          <div className="flex gap-2">
            <SkeletonBase className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
          </div>
          <SkeletonBase className="h-7 w-7 xl:w-24 rounded-full" />
        </div>
      </div>
    </div>
  );

  const SkeletonHero = ({ delay }: { delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white rounded-[32px] p-6 md:px-7 md:py-6 border border-[#EEF2F7] shadow-[0_12px_24px_rgba(40,60,120,0.04)] relative overflow-hidden flex flex-col md:flex-row items-center gap-6"
    >
      <div className="flex-1 space-y-4 w-full">
        <SkeletonBase className="h-6 w-32 rounded-full" />
        <SkeletonBase className="h-10 w-3/4 rounded-xl" />
        <div className="space-y-2">
          <SkeletonBase className="h-4 w-full rounded-full" />
          <SkeletonBase className="h-4 w-2/3 rounded-full" />
        </div>
        <div className="flex gap-3 pt-2">
          <SkeletonBase className="h-10 w-28 rounded-full" />
          <SkeletonBase className="h-10 w-28 rounded-full" />
        </div>
      </div>
      <SkeletonBase className="w-40 h-40 rounded-[32px] hidden md:block" />
    </motion.div>
  );

  const SkeletonTopicHeader = ({ delay }: { delay: number }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <SkeletonBase className="w-12 h-12 rounded-2xl" />
          <SkeletonBase className="h-8 w-64 rounded-xl" />
        </div>
        <SkeletonBase className="h-4 w-48 rounded-full" />
      </div>
      <div className="flex gap-3">
        <SkeletonBase className="h-10 w-32 rounded-full" />
        <SkeletonBase className="h-10 w-24 rounded-full" />
      </div>
    </motion.div>
  );

  const SkeletonFilter = ({ delay }: { delay: number }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="flex gap-3 overflow-hidden pb-1"
    >
      {[1, 2, 3, 4].map((i) => (
        <SkeletonBase key={i} className="h-10 w-28 rounded-full shrink-0" />
      ))}
    </motion.div>
  );

  const SkeletonSidebar = ({ delay }: { delay: number }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="space-y-5"
    >
      <div className="bg-[#FFF5F7] border-[#FF7A90]/20 rounded-[24px] p-5 h-48 flex flex-col items-center justify-center gap-3">
        <SkeletonBase className="w-10 h-10 rounded-full" />
        <SkeletonBase className="h-5 w-24 rounded-full" />
        <SkeletonBase className="h-9 w-32 rounded-full" />
      </div>
      <div className="bg-white rounded-[28px] p-6 border border-[#EEF2F7] space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <SkeletonBase className="w-9 h-9 rounded-xl" />
          <SkeletonBase className="h-5 w-32 rounded-full" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3.5 items-center">
            <SkeletonBase className="w-10 h-10 rounded-[14px] shrink-0" />
            <div className="flex-1 space-y-2.5">
              <SkeletonBase className="h-4 w-3/4 rounded-full" />
              <SkeletonBase className="h-3 w-1/2 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const EmptyState = ({ type }: { type: "topic" | "filter" | "search" }) => {
    const config = {
      topic: {
        illustration: "📦",
        subIllustration: "🧸",
        title: "Chủ đề đang được cập nhật",
        description:
          "Chúng mình sẽ sớm bổ sung thêm học liệu thú vị cho bé nhé.",
        primaryButton: "Khám phá chủ đề khác",
        action: () => {
          const months = Object.keys(TOPIC_THEMES);
          const next =
            months[(months.indexOf(selectedMonth) + 1) % months.length];
          setSelectedMonth(next);
        },
      },
      filter: {
        illustration: "🔍",
        subIllustration: "✨",
        title: `Không tìm thấy ${activeCategory === "video" ? "Video" : activeCategory === "game" ? "Trò chơi" : "Mẫu in"}`,
        description: `Thử xem các ${activeCategory === "video" ? "Trò chơi hoặc Mẫu in PDF" : "Video hoặc học liệu"} khác nhé.`,
        primaryButton: "Xem tất cả học liệu",
        action: () => setActiveCategory("all"),
      },
      search: {
        illustration: "🕵️‍♂️",
        subIllustration: "📦",
        title: "Không tìm thấy kết quả",
        description: "Bé thử tìm kiếm với từ khóa khác xem sao nhé.",
        primaryButton: "Xóa bộ lọc tìm kiếm",
        action: () => setSearchQuery(""),
      },
    }[type];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-full py-16 px-8 flex flex-col items-center justify-center text-center bg-white rounded-[28px] border border-[#EEF3FA] shadow-[0_12px_40px_rgba(28,45,90,0.05)] relative overflow-hidden"
      >
        {/* Decorations */}
        <div className="absolute top-10 left-10 opacity-10 pointer-events-none text-4xl">
          🌈
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none text-4xl">
          ☁️
        </div>
        <div className="absolute top-1/2 right-20 opacity-5 pointer-events-none text-6xl">
          ✨
        </div>

        <div className="relative mb-8">
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-8xl filter drop-shadow-xl"
          >
            {config.illustration}
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-2 -right-2 text-4xl bg-white rounded-full p-2 shadow-lg"
          >
            {config.subIllustration}
          </motion.div>
        </div>

        <h3 className="text-[28px] font-bold text-[#2B3A67] mb-3 leading-tight">
          {config.title}
        </h3>
        <p className="text-[#8A97A8] text-[18px] max-w-md mx-auto mb-10 font-medium">
          {config.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={config.action}
            className="px-10 py-4 bg-[#007AFF] text-white font-black rounded-2xl shadow-[0_12px_24px_rgba(0,122,255,0.25)] hover:bg-[#0066D6] transition-all text-[15px] tracking-wide uppercase"
          >
            {config.primaryButton}
          </motion.button>

          {type !== "topic" && (
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="px-10 py-4 bg-slate-50 text-[#5F6F87] font-bold rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all text-[15px]"
            >
              Về mặc định
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF9F3] relative overflow-hidden flex flex-col z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#E0F2FE_0%,_transparent_40%),radial-gradient(circle_at_bottom_left,_#FDF2F8_0%,_transparent_40%)] opacity-60 pointer-events-none" />
        <header className="h-[70px] bg-white/80 backdrop-blur-md border-b border-[#EEF3FA] flex items-center px-6" />

        <main className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6">
          <aside className="w-full md:w-[250px] lg:w-[270px] flex-shrink-0">
            <SkeletonSidebar delay={0.1} />
          </aside>

          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <SkeletonHero delay={0.1} />
            <div className="space-y-6 mt-2">
              <SkeletonTopicHeader delay={0.18} />
              <SkeletonFilter delay={0.25} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <SkeletonCard />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F3] relative overflow-x-hidden font-sans text-[#223A66] flex flex-col z-0">
      {/* Background Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F3] via-[#FFF5F7] to-[#F0FAF5] opacity-80" />
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#FFE5B4] opacity-15 blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E0F7FA] opacity-15 blur-[120px]" />
        <div className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#FFD1DC] opacity-15 blur-[100px]" />
        <div className="absolute top-[-5%] left-[-10%] w-[400px] h-[400px] rounded-full bg-white opacity-40 blur-[2px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white opacity-30 blur-[2px]" />

        <div className="absolute top-[8%] left-[4%] md:left-[8%] opacity-[0.06]">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sun
              size={90}
              className="text-[#D97706] absolute -top-8 -left-8"
              strokeWidth={1.2}
            />
          </motion.div>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Cloud
              size={110}
              className="text-[#2563EB] absolute top-2 left-12"
              strokeWidth={1.2}
            />
          </motion.div>
          <Cloud
            size={70}
            className="text-[#3B82F6] absolute top-20 left-36 opacity-70"
            strokeWidth={1.2}
          />
        </div>

        <div className="absolute top-[12%] right-[20%] md:right-[15%] opacity-[0.08]">
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="140"
              height="70"
              viewBox="0 0 140 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 right-0"
            >
              <path
                d="M10 70A60 60 0 0 1 130 70"
                stroke="#E11D48"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M28 70A42 42 0 0 1 112 70"
                stroke="#D97706"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M46 70A24 24 0 0 1 94 70"
                stroke="#059669"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>

        <div className="absolute bottom-[20%] md:bottom-[15%] left-[8%] md:left-[6%] opacity-[0.08]">
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen
              size={100}
              className="text-[#047857] absolute bottom-0 left-0"
              strokeWidth={1.2}
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Puzzle
              size={80}
              className="text-[#1D4ED8] absolute bottom-20 left-24"
              strokeWidth={1.2}
            />
          </motion.div>
        </div>

        <div className="absolute bottom-[25%] md:bottom-[20%] right-[12%] md:right-[10%] opacity-[0.08]">
          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <TreeDeciduous
              size={120}
              className="text-[#15803D] absolute bottom-0 right-12"
              strokeWidth={1.2}
            />
          </motion.div>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#EEF3FA] sticky top-0 z-40 px-4 md:px-8 h-[72px] flex items-center justify-between shadow-[0_8px_30px_rgba(28,45,90,0.05)]">
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-50 rounded-full flex items-center justify-center border border-pink-100 overflow-hidden shrink-0">
              <img
                src="/logo_edukid.png"
                alt="Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-[#223A66] text-sm md:text-base leading-none">
                Kho Học Liệu Số
              </h1>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Segmented Toggle */}
        <div className="flex lg:hidden absolute left-1/2 -translate-x-1/2 items-center p-1 bg-slate-100/80 rounded-2xl border border-[#EEF3FA] h-11 w-[100px] z-10">
          {/* Active Thumb */}
          <motion.div
            initial={false}
            animate={{ x: 0 }} // Since we don't have a route change here for 'About', we assume 'Resources' is active
            className="absolute h-9 w-[44px] bg-[#FF7A90] rounded-xl shadow-sm z-0 left-1"
          />
          
          <button
            className="flex-1 h-9 flex items-center justify-center relative z-10 text-white transition-colors"
            title="Học liệu"
          >
            <BookOpen size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => navigate("/about")}
            className="flex-1 h-9 flex items-center justify-center relative z-10 text-[#55657A] hover:text-[#223A66] transition-colors"
            title="Giới thiệu Edukid"
          >
            <Info size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 bg-[#F8FAFD] p-1 rounded-full border border-[#EEF3FA]">
          <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-[#FF7A90] font-bold text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#EEF3FA] transition-all">
            <BookOpen size={18} />
            Học liệu
          </button>
          <button
            onClick={() => navigate("/about")}
            className="flex items-center gap-2 px-6 py-2 rounded-full text-[#55657A] hover:text-[#223A66] font-bold text-sm transition-all"
          >
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
              <p className="text-sm font-bold leading-tight text-[#223A66]">
                {parentName}
              </p>
              <p className="text-xs text-[#8A97A8]">Phụ huynh</p>
            </div>
            <ChevronDown
              size={16}
              className={`text-[#8A97A8] hidden sm:block transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
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
                    navigate("/account");
                  }}
                  className="w-full flex items-center justify-between text-left px-4 py-3 text-sm font-bold text-[#223A66] hover:bg-gray-50 transition-colors border-b border-[#EEF3FA]"
                >
                  Tài khoản
                  <User size={16} className="text-[#8A97A8]" />
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    localStorage.removeItem("edu_session");
                    navigate("/"); // Assuming this routes to LoginScreen
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

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6">
        {/* MOBILE HERO - ONLY VISIBLE ON MOBILE */}
        <div className="md:hidden mb-1">
          {(() => {
            const currentTheme =
              TOPIC_THEMES[selectedMonth] || TOPIC_THEMES["9"];
            return (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`rounded-[28px] p-5 shadow-[0_12px_32px_rgba(40,60,120,0.06)] border border-white/50 relative overflow-hidden flex flex-col items-center gap-4 transition-all duration-700 bg-gradient-to-br from-white via-white to-transparent`}
                style={{
                  background: `linear-gradient(135deg, ${selectedMonth === "9" ? "#F0F7FF" : selectedMonth === "10" ? "#FFF5F7" : selectedMonth === "11" ? "#FFF9F0" : "#F5FDF8"} 0%, #FFFFFF 100%)`,
                }}
              >
                <div className="flex-1 flex flex-col items-center text-center z-10 w-full">
                  <div className="flex flex-col mb-3">
                    <div className="flex items-center justify-center gap-1.5 text-[#8A97A8] text-[12px] font-semibold mb-0.5">
                      <span>🏫</span> Chào mừng đến với
                    </div>
                    <h2 className="text-[#FF7A90] font-black text-[20px] leading-tight uppercase tracking-tight">
                      {APP_CONFIG.SCHOOL_NAME}
                    </h2>
                  </div>
                  <h1 className="text-[17px] font-bold text-[#223654] leading-[1.2] mb-0 tracking-tight">
                    Hôm nay bé sẽ khám phá điều gì?
                  </h1>
                </div>
              </motion.div>
            );
          })()}
        </div>

        {/* SIDEBAR */}
        <aside className="w-full md:w-[200px] xl:w-[270px] flex-shrink-0 space-y-4 md:space-y-5">
          {/* Age Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
              y: -4,
              shadow: "0 25px 50px -12px rgba(28,45,90,0.15)",
            }}
            className={`rounded-[32px] p-5 md:p-4 xl:p-6 shadow-[0_12px_40px_rgba(28,45,90,0.06)] border relative overflow-hidden flex flex-col items-center text-center transition-all duration-500 cursor-default group/card ${
              selectedAge === "nhatre"
                ? "bg-gradient-to-br from-white via-white to-[#F0F7FF] border-[#00A3FF]/15"
                : selectedAge === "mam"
                  ? "bg-gradient-to-br from-white via-white to-[#F2FFF4] border-[#00C46A]/15"
                  : selectedAge === "choi"
                    ? "bg-gradient-to-br from-white via-white to-[#FFF9F0] border-[#FF9800]/15"
                    : "bg-gradient-to-br from-white via-white to-[#FFF5F7] border-[#FF7A90]/15"
            }`}
          >
            {/* Decorative Background - Refined organic bubbles */}
            <div
              className={`absolute -top-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-[0.14] transition-colors duration-500 ${selectedAge === "nhatre" ? "bg-[#00A3FF]" : selectedAge === "mam" ? "bg-[#00C46A]" : selectedAge === "choi" ? "bg-[#FF9800]" : "bg-[#FF7A90]"}`}
            ></div>

            <div className="absolute top-6 right-8 pointer-events-none z-0">
              <div
                className={`absolute top-0 right-0 w-[18px] h-[18px] rounded-full opacity-[0.18] transition-colors duration-500 ${selectedAge === "nhatre" ? "bg-[#00A3FF]" : selectedAge === "mam" ? "bg-[#00C46A]" : selectedAge === "choi" ? "bg-[#FF9800]" : "bg-[#FF7A90]"}`}
              ></div>
            </div>

            <div className="mb-4 relative z-10">
              <div className="w-16 h-16 md:w-16 xl:w-20 rounded-2xl flex items-center justify-center overflow-hidden p-1.5 bg-white shadow-[0_12px_24px_rgba(0,0,0,0.04)] border border-gray-100/50 relative z-10 group-hover/card:scale-105 transition-transform duration-500">
                {selectedAge ? (
                  <img
                    src={AGE_GROUPS.find((a) => a.id === selectedAge)?.image}
                    alt="age"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span role="img" aria-label="baby" className="text-4xl">
                    👶
                  </span>
                )}
              </div>
            </div>

            <div className="mb-0.5 flex items-center justify-center relative z-10">
              <span className="text-[#FF9800]/80 text-[11px] xl:text-[12px] font-extrabold uppercase tracking-widest">
                Độ tuổi
              </span>
            </div>

            <h3 className="font-black text-[22px] md:text-[20px] xl:text-[26px] mb-0.5 text-[#243B6B] leading-tight w-full tracking-tight whitespace-nowrap relative z-10">
              {selectedAge
                ? AGE_GROUPS.find((a) => a.id === selectedAge)?.age
                : "Chưa chọn"}
            </h3>

            <div className="mb-4 relative z-10">
              <span
                className={`text-[14px] md:text-[13px] xl:text-[15px] font-bold transition-colors duration-500 ${selectedAge === "nhatre" ? "text-[#00A3FF]" : selectedAge === "mam" ? "text-[#00C46A]" : selectedAge === "choi" ? "text-[#FF9800]" : "text-[#FF7A90]"}`}
              >
                Lớp {AGE_GROUPS.find((a) => a.id === selectedAge)?.name || ""}
              </span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="h-[36px] md:h-[34px] xl:h-[38px] px-6 bg-white shadow-sm text-[#FF7A90] rounded-full text-[12px] font-black flex items-center gap-2 hover:bg-[#FFF5F7] hover:shadow-md transition-all duration-300 border border-[#FF7A90]/25 group relative z-10 active:scale-95"
            >
              <span className="relative z-10">Thay đổi</span>
              <Edit2
                size={13}
                className="relative z-10 text-[#FF7A90] group-hover:rotate-12 transition-transform"
              />
            </button>
          </motion.div>

          {/* Topic Navigation Card / Chip Scroller */}
          <div className="bg-white md:bg-white rounded-[28px] p-4 md:p-3 xl:p-6 shadow-[0_8px_24px_rgba(40,60,120,0.06)] md:shadow-[0_10px_28px_rgba(40,60,120,0.08)] border border-[#EEF3FA] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 md:mb-6 xl:mb-8 z-10 bg-transparent shrink-0">
              <div className="flex items-center gap-2 md:gap-2 xl:gap-3 font-bold text-[#223A66] text-[16px] md:text-[15px] xl:text-[18px]">
                <div className="w-8 h-8 md:w-8 md:h-8 xl:w-9 xl:h-9 rounded-lg md:rounded-lg xl:rounded-xl bg-white text-[#00A3FF] flex items-center justify-center shadow-[0_4px_12px_rgba(0,163,255,0.15)] border border-[#00A3FF]/10">
                  <BookOpen size={18} />
                </div>
                Chủ đề học tập
              </div>
              <p className="hidden xl:block text-[#55657A] text-[13px] font-medium leading-[1.5]">
                Lộ trình học của bé.
              </p>
            </div>

            <div className="relative flex flex-col">
              <div className="flex flex-nowrap overflow-x-auto md:flex-col space-x-2.5 md:space-x-0 md:space-y-4.5 pb-1 md:pb-2 flex-1 relative hide-scrollbar md:pr-1">
                {TOPICS.map((topic, index) => {
                  const currentIndex = TOPICS.findIndex(
                    (t) => t.id === selectedMonth,
                  );
                  const isActive = selectedMonth === topic.id;
                  const isCompleted = index < currentIndex;
                  const Icon = topic.icon;
                  const topicTheme =
                    TOPIC_THEMES[topic.id] || TOPIC_THEMES["9"];

                  return (
                    <motion.div
                      key={topic.id}
                      className="relative z-10 flex items-stretch group"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* MOBILE CHIP STYLE */}
                      <button
                        onClick={() => setSelectedMonth(topic.id)}
                        className={`md:hidden flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border shrink-0 ${
                          isActive
                            ? `${topicTheme.lightAccent} ${topicTheme.border} ${topicTheme.text} shadow-sm border-2`
                            : "bg-white border-[#EEF3FA] text-[#55657A]"
                        }`}
                      >
                        <Icon size={16} className={isActive ? topic.color : "text-[#94A3B8]"} />
                        {topic.shortName}
                      </button>

                      {/* DESKTOP CARD STYLE */}
                      <button
                        onClick={() => setSelectedMonth(topic.id)}
                        className={`hidden md:flex flex-shrink-0 flex-1 flex flex-col md:items-center md:text-center xl:flex-row xl:items-start xl:text-left ${isActive ? "xl:items-start" : "xl:items-center"} gap-2.5 md:gap-2 xl:gap-4 p-4 md:p-3 xl:p-4 rounded-[24px] text-left transition-all duration-300 relative overflow-hidden ${
                          isActive
                            ? `${topicTheme.lightAccent} ${topicTheme.border} border-2 shadow-[0_12px_30px_rgba(28,45,90,0.12)] min-h-[88px] md:min-h-0`
                            : "bg-white border border-[#F1F5F9] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg hover:bg-white hover:border-[#B7D5FF]/40 hover:-translate-y-0.5 min-h-[80px] md:min-h-0"
                        }`}
                      >
                        {/* Icon Unit with Label Below */}
                        <div className="flex flex-col items-center gap-2 shrink-0">
                          <div
                            className={`w-11 h-11 md:w-9 md:h-9 xl:w-11 xl:h-11 rounded-[16px] md:rounded-[12px] xl:rounded-[16px] flex items-center justify-center transition-all duration-500 relative z-10 ${
                              isActive
                                ? `bg-white ring-2 ${topicTheme.accent.replace("bg-", "ring-")} ring-offset-2 ring-offset-white shadow-sm`
                                : "bg-[#F8FAFD] shadow-none"
                            } ${topic.color}`}
                          >
                            <Icon size={isActive ? 22 : 20} className="md:w-5 md:h-5 xl:w-[22px] xl:h-[22px]" strokeWidth={isActive ? 2.5 : 2} />
                          </div>
                        </div>

                        <div
                          className={`flex-1 hidden md:flex flex-col relative z-10 min-w-0 ${isActive ? "justify-start xl:pt-1" : "justify-center"}`}
                        >
                          <h4
                            className={`font-bold text-[14px] md:text-[12px] xl:text-[14px] leading-[1.3] md:leading-[1.2] xl:leading-[1.4] transition-colors duration-300 line-clamp-2 ${isActive ? "text-[#223A66] mb-1.5 xl:mb-2" : "text-[#55657A] mb-0.5"}`}
                          >
                            {topic.name}
                          </h4>

                          {isActive ? (
                            <div className="flex flex-col items-center xl:items-start gap-1 md:gap-1.5 xl:gap-2">
                              <span className="text-[13px] md:text-[11px] xl:text-[13px] font-medium text-[#8A97A8]">
                                {topic.month}
                              </span>
                              <span
                                className={`text-[11px] md:text-[9px] xl:text-[11px] h-[22px] md:h-[18px] xl:h-[22px] px-3 md:px-2 xl:px-3 rounded-full bg-white shadow-sm ${topicTheme.text} flex items-center gap-1 md:gap-1.5 xl:gap-1.5 border border-[#007AFF]/10 shrink-0`}
                              >
                                <div
                                  className={`w-1 md:w-1 xl:w-1.5 h-1 md:h-1 xl:h-1.5 rounded-full ${topicTheme.accent} animate-pulse`}
                                />
                                ĐANG HỌC
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center xl:justify-start gap-2 mt-0.5">
                              <span className="text-[13px] md:text-[11px] xl:text-[13px] font-medium text-[#8A97A8]">
                                {topic.month}
                              </span>
                              {isCompleted && (
                                <span className="text-[11px] md:text-[10px] xl:text-[11px] font-bold text-emerald-600 flex items-center shrink-0">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
              {/* Mobile scroll indicator gradient */}
              <div className="absolute right-0 top-0 bottom-1 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20 md:hidden" />
            </div>

            <div className="hidden md:flex flex-col mt-8 pt-6 border-t border-[#F1F5F9] shrink-0 relative z-10">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#223A66]">
                    🎯 Tiến độ năm học
                  </span>
                </div>
                <span className="text-[12px] font-bold text-[#8A97A8]">
                  {TOPICS.findIndex((t) => t.id === selectedMonth) + 1} /{" "}
                  {TOPICS.length} chủ đề
                </span>
              </div>
              <div className="w-full bg-[#F8FAFD] rounded-full h-[7px] overflow-hidden border border-[#EEF3FA]">
                <div
                  className="bg-gradient-to-r from-[#00A3FF] to-[#007AFF] h-full rounded-full transition-all duration-700 ease-out shadow-[0_2px_4px_rgba(0,122,255,0.2)]"
                  style={{
                    width: `${((TOPICS.findIndex((t) => t.id === selectedMonth) + 1) / TOPICS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center p-4">
            <div className="relative w-48 h-48 opacity-80 pointer-events-none">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-100 rounded-full blur-xl"></div>
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 left-4 text-4xl"
              >
                🌟
              </motion.div>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-4 left-6 text-5xl"
              >
                🧸
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-8 right-6 text-4xl"
              >
                📚
              </motion.div>
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-16 right-4 text-3xl"
              >
                🎵
              </motion.div>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-6">
          {/* DESKTOP HERO SECTION */}
          <div className="hidden md:block">
            {(() => {
              const currentTheme =
                TOPIC_THEMES[selectedMonth] || TOPIC_THEMES["9"];
              return (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`rounded-[28px] p-4 md:px-7 md:py-5 shadow-[0_12px_24px_rgba(40,60,120,0.06)] border border-white/50 relative overflow-hidden flex flex-col md:flex-row items-center gap-4 md:gap-6 transition-all duration-700 bg-gradient-to-br from-white via-white to-transparent`}
                  style={{
                    background: `linear-gradient(135deg, ${selectedMonth === "9" ? "#F0F7FF" : selectedMonth === "10" ? "#FFF5F7" : selectedMonth === "11" ? "#FFF9F0" : "#F5FDF8"} 0%, #FFFFFF 100%)`,
                  }}
                >
                  {/* Playful Blobs */}
                  <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[150%] bg-[#FFD166]/10 blur-[60px] rounded-full -z-10" />
                  <div className="absolute bottom-[-30%] left-[-5%] w-[30%] h-[120%] bg-[#00A3FF]/10 blur-[50px] rounded-full -z-10" />

                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.12] z-0">
                    <motion.div
                      animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-4 left-10 text-3xl blur-[0.3px]"
                    >
                      🌈
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-12 right-1/3 text-4xl blur-[0.5px]"
                    >
                      ☁️
                    </motion.div>
                    <motion.div
                      animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-6 left-1/4 text-5xl blur-[0.3px]"
                    >
                      ✨
                    </motion.div>
                  </div>

                  <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:max-w-[70%]">
                    <div className="flex flex-col mb-4 md:mb-5">
                      <div className="flex items-center gap-1.5 text-[#8A97A8] text-[13px] font-semibold mb-1">
                        <span>🏫</span> Chào mừng đến với
                      </div>
                      <h2 className="text-[#FF7A90] font-black text-[20px] md:text-[24px] lg:text-[28px] leading-tight uppercase tracking-tight">
                        {APP_CONFIG.SCHOOL_NAME}
                      </h2>
                    </div>

                    <h1 className="text-[18px] md:text-[22px] lg:text-[24px] font-bold text-[#223654] leading-[1.2] mb-3 tracking-tight">
                      Hôm nay bé sẽ khám phá điều gì?
                    </h1>

                    <p className="text-[#5F6F87] text-[14px] md:text-[15px] font-medium mb-4 max-w-lg leading-relaxed line-clamp-2">
                      Cùng bé học tập và vui chơi với những học liệu được lựa chọn
                      theo đúng độ tuổi.
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 w-full">
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-[14px] border border-white/60 shadow-sm shrink-0"
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                          <BookOpen size={16} />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="font-bold text-[#223654] text-[14px]">
                            32
                          </span>
                          <span className="text-[#5F6F87] text-[10px] font-medium">
                            Học liệu
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-[14px] border border-white/60 shadow-sm shrink-0"
                      >
                        <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                          <PlayCircle size={16} />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="font-bold text-[#223654] text-[14px]">
                            12
                          </span>
                          <span className="text-[#5F6F87] text-[10px] font-medium">
                            Video
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3.5 py-2 rounded-[14px] border border-white/60 shadow-sm shrink-0"
                      >
                        <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                          <Gamepad2 size={16} />
                        </div>
                        <div className="flex flex-col leading-none">
                          <span className="font-bold text-[#223654] text-[14px]">
                            8
                          </span>
                          <span className="text-[#5F6F87] text-[10px] font-medium">
                            Trò chơi
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="w-full md:w-[30%] h-[120px] md:h-[140px] flex items-center justify-center relative z-10 shrink-0 mt-1 md:mt-0">
                    <div className="relative w-full h-full max-w-[160px] mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 bg-white/40 rounded-[24px] rotate-6 border border-white/60 shadow-sm" />
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[24px] -rotate-3 border border-white/90 shadow-sm flex items-center justify-center overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-20 h-20 bg-[#FFD166]/20 rounded-full" />
                        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#00A3FF]/10 rounded-full" />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-6xl"
                        >
                          🧸
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>

          {/* TOPIC HEADER - HIDDEN ON MOBILE */}
          <div className="hidden md:block">
            {(() => {
              const topic = TOPICS.find((t) => t.id === selectedMonth);
              const Icon = topic?.icon || BookOpen;
              const topicTheme = TOPIC_THEMES[selectedMonth] || TOPIC_THEMES["9"];

              return (
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={`header-${selectedMonth}`}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex items-center p-3 md:py-4 md:px-6 rounded-[22px] border relative overflow-hidden transition-all duration-700 ${topicTheme.bg} opacity-95 shadow-[0_8px_24px_rgba(40,60,120,0.06)] border-[#EEF3FA]`}
                >
                  <div
                    className={`absolute top-0 right-0 w-48 h-full bg-gradient-to-l opacity-5 -z-10 ${topicTheme.text.replace("text-", "from-")}`}
                  />

                  <div className="flex items-center gap-4 relative z-10">
                    <div
                      className={`w-12 h-12 rounded-[16px] flex items-center justify-center bg-white shadow-sm border border-[#EEF3FA] shrink-0 ${topic?.color}`}
                    >
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#8A97A8] uppercase tracking-wider leading-none mb-1.5">
                        Chủ đề hiện tại
                      </span>
                      <h2 className="text-[18px] md:text-[20px] font-bold text-[#223A66] leading-tight">
                        {topic?.name}
                      </h2>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>

          {/* Category Filters */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 xl:flex xl:flex-nowrap xl:overflow-x-auto pb-1 gap-2 md:gap-2.5 -mx-4 px-4 md:mx-0 md:px-0 -mt-1 md:hide-scrollbar">
              {CATEGORIES.map((cat, idx) => {
                const isActive = activeCategory === cat.id;
                const Icon = cat.icon;

                return (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center md:justify-center xl:justify-start gap-2.5 px-3 md:px-2 xl:px-5 h-[40px] rounded-full text-[12px] md:text-[11px] xl:text-[13px] font-bold xl:whitespace-nowrap transition-all border md:shrink-0 focus:outline-none ${
                      isActive
                        ? `${cat.activeBg} border-transparent ${cat.activeText} shadow-[0_8px_16px_rgba(0,0,0,0.1)]`
                        : `bg-white ${cat.inactiveBorder} ${cat.color} shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-opacity-50`
                    }`}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="truncate">{cat.name}</span>
                  </motion.button>
                );
              })}
            </div>
            {/* Mobile scroll indicator gradient - hidden on mobile grid, shown on desktop horizontal if needed */}
            <div className="hidden xl:block absolute right-0 top-0 bottom-1 w-16 bg-gradient-to-l from-[#F8FAFD] via-[#F8FAFD]/70 to-transparent pointer-events-none z-20 -mr-4" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-6 pb-12">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                  onClick={() => setSelectedResourceIndex(idx)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white rounded-[24px] md:rounded-[28px] border border-[#EEF3FA] shadow-[0_12px_32px_rgba(28,45,90,0.06)] overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 ease-out hover:shadow-[0_20px_48px_rgba(28,45,90,0.12)] min-h-[260px] md:min-h-[340px]"
                >
                  {/* Thumbnail Section (45% height) */}
                  <div className="relative h-[110px] md:h-[160px] overflow-hidden m-1 md:m-1.5">
                    {/* Fixed radius for actual image container within the group */}
                    <div className="absolute inset-0 rounded-[20px] md:rounded-[24px] overflow-hidden">
                      <motion.img
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
                    {/* Title Section */}
                    <h3 className="font-bold text-[#223654] text-[13px] md:text-[16px] leading-[1.3] mb-1.5 md:mb-2 line-clamp-2 transition-colors min-h-[34px] md:min-h-[42px]">
                      {item.title}
                    </h3>

                    {/* Metadata Section */}
                    <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold text-[#8A97A8]/80 mb-3">
                      <Eye size={12} className="w-3.5 h-3.5 md:w-[12px] md:h-[12px]" strokeWidth={2.5} />
                      <span>{formatViews(item.views || 0)} lượt xem</span>
                    </div>

                    {/* Divider and Action Area */}
                    <div className="mt-auto pt-2 md:pt-3 border-t border-[#EEF2F8] flex items-center justify-between">
                      <div className="flex items-center">
                        <motion.button
                          onClick={(e) => handleToggleBookmark(item.id, e)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 md:gap-2.5 group/bookmark"
                          title={item.bookmarked ? "Bỏ lưu" : "Lưu học liệu"}
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
                          <span
                            className={`text-[9px] md:text-[12px] font-bold transition-colors ${item.bookmarked ? "text-[#223654]" : "text-[#8A97A8] group-hover/bookmark:text-[#223654]"}`}
                          >
                            {item.bookmarked ? "Đã lưu" : "Lưu học liệu"}
                          </span>
                        </motion.button>
                      </div>

                      {/* DESKTOP BUTTON (>= 1200px) */}
                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedResourceIndex(idx)}
                        className={`hidden xl:flex h-[36px] px-5 rounded-full border bg-white items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow group/cta ${
                          item.type === "game"
                            ? "border-orange-500 text-orange-600 hover:bg-orange-500/5"
                            : item.type === "video"
                              ? "border-purple-500 text-purple-600 hover:bg-purple-500/5"
                              : "border-blue-500 text-blue-600 hover:bg-blue-500/5"
                        }`}
                      >
                        <span className="text-[11px] font-black tracking-wider uppercase whitespace-nowrap">
                          KHÁM PHÁ
                        </span>
                        <ArrowRight
                          size={14}
                          strokeWidth={2.5}
                          className="group-hover/cta:translate-x-0.5 transition-transform"
                        />
                      </motion.button>

                      {/* MOBILE & TABLET BUTTON (< 1200px) */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedResourceIndex(idx)}
                        className={`xl:hidden w-7 h-7 md:w-8 md:h-8 rounded-full border bg-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow group/cta ${
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
              ))
            ) : (
              <EmptyState
                type={
                  searchQuery !== ""
                    ? "search"
                    : activeCategory !== "all"
                      ? "filter"
                      : "topic"
                }
              />
            )}
          </div>

          <div className="flex justify-center pb-12">
            <motion.button
              whileHover={{ y: 2 }}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#F4F7FB] hover:bg-[#E2E8F0] text-[#64748B] font-bold text-[14px] rounded-full transition-colors"
            >
              Kéo xuống để xem thêm <ChevronDown size={18} />
            </motion.button>
          </div>
        </div>
      </main>

      {/* AGE SELECTION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => selectedAge && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[40px] shadow-[0_32px_80px_rgba(40,60,120,0.25)] p-5 md:p-10 w-full max-w-[840px] max-h-[92vh] overflow-y-auto relative z-10 border border-[#EEF3FA] hide-scrollbar"
            >
              <button
                onClick={() => selectedAge && setIsModalOpen(false)}
                className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-[#8A97A8] hover:text-[#223A66] shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-[#EEF3FA] transition-all z-20 hover:-translate-y-0.5"
                style={{ display: selectedAge ? "flex" : "none" }}
              >
                <X size={24} />
              </button>

              <div className="text-center mb-4 md:mb-10 relative">
                <h2 className="text-xl md:text-3xl lg:text-[32px] font-black text-[#223A66] mb-1 md:mb-3 mt-2 md:mt-0 relative z-10 tracking-tight">
                  Chọn nhóm lớp của bé
                </h2>
                <div className="flex justify-center mb-3 md:mb-5">
                  <div className="w-12 md:w-16 h-1.5 bg-[#FF7A90] rounded-full opacity-60 shadow-[0_2px_4px_rgba(255,122,144,0.3)]"></div>
                </div>
                <p className="text-[#55657A] font-medium max-w-sm mx-auto text-sm md:text-[15px] relative z-10 leading-relaxed">
                  Hệ thống sẽ gợi ý học liệu phù hợp
                  <br className="hidden sm:block" /> với độ tuổi và khả năng của
                  bé.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-10">
                {AGE_GROUPS.map((group) => {
                  const isSelected = selectedAgeTemp === group.id;
                  return (
                    <motion.button
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      key={group.id}
                      onClick={() => setSelectedAgeTemp(group.id)}
                      className={`relative p-3 md:p-6 rounded-[24px] md:rounded-[32px] transition-all flex flex-col items-center text-center cursor-pointer border-2 shadow-[0_4px_12px_rgba(0,0,0,0.03)] group ${group.bg} ${
                        isSelected
                          ? `shadow-[0_12px_32px_rgba(0,0,0,0.1)] ${group.border} bg-white`
                          : "border-transparent hover:border-[#EEF3FA]"
                      }`}
                    >
                      <div className="w-16 h-16 md:w-28 md:h-28 mb-2 md:mb-5 flex items-center justify-center drop-shadow-md">
                        <img
                          src={group.image}
                          alt={group.name}
                          className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <h4
                        className={`text-base md:text-xl font-black mb-0.5 md:mb-1 ${group.color}`}
                      >
                        {group.name}
                      </h4>
                      <p
                        className={`text-[10px] md:text-sm font-bold mb-2 md:mb-6 ${group.color} opacity-80`}
                      >
                        {group.age}
                      </p>
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white flex items-center justify-center shadow-inner border border-[#EEF3FA] relative overflow-hidden">
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full ${group.bg.includes("pink") ? "bg-[#FF7A90]" : group.bg.includes("orange") ? "bg-[#FF9800]" : group.bg.includes("green") ? "bg-[#00C46A]" : "bg-[#00A3FF]"}`}
                          />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={selectedAgeTemp ? { scale: 1.05 } : {}}
                  whileTap={selectedAgeTemp ? { scale: 0.95 } : {}}
                  disabled={!selectedAgeTemp}
                  onClick={handleConfirmAge}
                  className={`px-10 py-3.5 rounded-full text-base md:text-lg font-black transition-all shadow-[0_12px_24px_rgba(255,122,144,0.3)] ${
                    selectedAgeTemp
                      ? "bg-[#FF7A90] text-white hover:bg-[#FF6B83] hover:-translate-y-1 active:translate-y-0"
                      : "bg-[#F1F5F9] text-[#8A97A8] cursor-not-allowed shadow-none"
                  }`}
                >
                  Xác nhận nhóm lớp
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Preview Modal */}
      <PreviewModal
        selectedResourceIndex={selectedResourceIndex}
        setSelectedResourceIndex={setSelectedResourceIndex}
        filteredMaterials={filteredMaterials}
        CATEGORIES={CATEGORIES}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        handleToggleBookmark={handleToggleBookmark}
        formatViews={formatViews}
      />
    </div>
  );
}
