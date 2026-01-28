import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  AlertTriangle,
  Heart,
  Frown,
  Meh,
  Smile,
  Users,
  Clock,
  ExternalLink,
  Star,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Bell,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Activity,
  Bot,
  Zap,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  UserPlus,
  Phone,
  Mail,
  MessageSquare,
  Send,
  Loader2,
  Trophy,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export function SocialListening() {
  const [selectedLeadFilter, setSelectedLeadFilter] = useState("all");
  const [aiScanningStatus, setAiScanningStatus] = useState<"idle" | "scanning" | "complete">("idle");

  // Sentiment data over time
  const sentimentTrendData = [
    { date: "T2", positive: 145, neutral: 78, negative: 23 },
    { date: "T3", positive: 167, neutral: 82, negative: 19 },
    { date: "T4", positive: 189, neutral: 91, negative: 28 },
    { date: "T5", positive: 203, neutral: 87, negative: 31 },
    { date: "T6", positive: 234, neutral: 95, negative: 25 },
    { date: "T7", positive: 256, neutral: 102, negative: 22 },
    { date: "CN", positive: 278, neutral: 108, negative: 27 },
  ];

  // Overall sentiment distribution
  const sentimentDistribution = [
    { name: "Positive", value: 72, color: "#10b981" },
    { name: "Neutral", value: 21, color: "#94a3b8" },
    { name: "Negative", value: 7, color: "#ef4444" },
  ];

  // Platform breakdown
  const platformMentions = [
    { platform: "Facebook", mentions: 1243, sentiment: 4.2, trend: 12.5, icon: "📘" },
    { platform: "Instagram", mentions: 892, sentiment: 4.5, trend: 18.3, icon: "📷" },
    { platform: "Zalo", mentions: 567, sentiment: 4.1, trend: 8.7, icon: "💬" },
    { platform: "TikTok", mentions: 423, sentiment: 4.6, trend: 25.4, icon: "🎵" },
    { platform: "Google Reviews", mentions: 234, sentiment: 4.4, trend: 5.2, icon: "⭐" },
  ];

  // Trending topics/keywords
  const trendingTopics = [
    { keyword: "niềng răng invisalign", mentions: 456, sentiment: "positive", change: 23 },
    { keyword: "tẩy trắng răng", mentions: 389, sentiment: "positive", change: 15 },
    { keyword: "nha khoa uy tín", mentions: 312, sentiment: "positive", change: 31 },
    { keyword: "cấy ghép implant", mentions: 278, sentiment: "positive", change: 12 },
    { keyword: "giá cả hợp lý", mentions: 234, sentiment: "neutral", change: -5 },
    { keyword: "đau răng", mentions: 189, sentiment: "neutral", change: 8 },
  ];

  // Top mentions/conversations
  const topMentions = [
    {
      id: 1,
      platform: "Facebook",
      author: "Nguyễn Thị Mai",
      authorType: "customer",
      content: "Mình vừa niềng răng xong ở Greenfield Dental, răng đều và đẹp lắm! Bác sĩ tư vấn rất tận tình, giá cả hợp lý. Recommend cho mọi người nha! 😍",
      timestamp: "2 giờ trước",
      sentiment: "positive",
      engagement: { likes: 234, comments: 45, shares: 12 },
      responded: true,
    },
    {
      id: 2,
      platform: "Instagram",
      author: "@dental_influencer",
      authorType: "influencer",
      content: "Vừa trải nghiệm dịch vụ tẩy trắng răng tại @greenfielddental - công nghệ Zoom hiện đại, kết quả trắng sáng ngay sau 1 giờ. Không đau, không ê buốt! ⭐⭐⭐⭐⭐",
      timestamp: "4 giờ trước",
      sentiment: "positive",
      engagement: { likes: 1245, comments: 89, shares: 34 },
      responded: true,
    },
    {
      id: 3,
      platform: "Google Reviews",
      author: "Trần Văn Hùng",
      authorType: "customer",
      content: "Phòng khám sạch sẽ, trang thiết bị hiện đại. Tuy nhiên thời gian chờ hơi lâu vào cuối tuần. Nhưng nhìn chung dịch vụ ok, sẽ quay lại.",
      timestamp: "6 giờ trước",
      sentiment: "neutral",
      engagement: { likes: 12, comments: 3, shares: 0 },
      responded: true,
    },
    {
      id: 4,
      platform: "Facebook",
      author: "Lê Hoàng Anh",
      authorType: "customer",
      content: "Mình cấy implant ở đây 3 tháng rồi, giờ ăn uống bình thường, không khó chịu gì. Bác sĩ giỏi, follow up định kỳ rất chu đáo. Cảm ơn Greenfield Dental! 🙏",
      timestamp: "8 giờ trước",
      sentiment: "positive",
      engagement: { likes: 156, comments: 28, shares: 8 },
      responded: true,
    },
    {
      id: 5,
      platform: "Zalo",
      author: "Phạm Thu Hương",
      authorType: "customer",
      content: "Cho hỏi giá niềng răng là bao nhiêu vậy ạ? Có gói ưu đãi cho sinh viên không?",
      timestamp: "1 giờ trước",
      sentiment: "neutral",
      engagement: { likes: 5, comments: 2, shares: 0 },
      responded: false,
    },
  ];

  // Enhanced Competitor Data with detailed intelligence
  const competitorData = [
    {
      id: 1,
      name: "Greenfield Dental",
      logo: "🌿",
      mentions: 1472,
      sentiment: 4.3,
      marketShare: 35,
      trend: 12.5,
      strengths: ["Công nghệ hiện đại", "Bác sĩ tận tình", "Giá cả hợp lý"],
      weaknesses: ["Thời gian chờ cuối tuần"],
      pricing: "Trung bình - Cao",
      locations: ["Q1", "Q7", "Thủ Đức"],
      services: ["Niềng răng", "Implant", "Tẩy trắng", "Nhổ răng khôn"],
      topKeywords: ["invisalign", "zoom whitening", "implant"],
    },
    {
      id: 2,
      name: "Nha Khoa Đông Nam",
      logo: "🏥",
      mentions: 1189,
      sentiment: 4.1,
      marketShare: 28,
      trend: 8.3,
      strengths: ["Nhiều chi nhánh", "Giá rẻ", "Khuyến mãi nhiều"],
      weaknesses: ["Chất lượng không đồng đều", "Bác sĩ thay đổi"],
      pricing: "Thấp - Trung bình",
      locations: ["Q1", "Q3", "Q5", "Q10", "Bình Thạnh"],
      services: ["Niềng răng", "Implant", "Tẩy trắng", "Bọc răng sứ"],
      topKeywords: ["giá rẻ", "khuyến mãi", "nhiều chi nhánh"],
    },
    {
      id: 3,
      name: "Nha Khoa Paris",
      logo: "🗼",
      mentions: 892,
      sentiment: 4.0,
      marketShare: 21,
      trend: 5.7,
      strengths: ["Thương hiệu lâu năm", "Vị trí trung tâm", "Đội ngũ bác sĩ ổn định"],
      weaknesses: ["Giá cao", "Trang thiết bị cũ", "Không hiện đại"],
      pricing: "Cao",
      locations: ["Q1", "Q3"],
      services: ["Niềng răng", "Implant", "Bọc răng sứ"],
      topKeywords: ["lâu năm", "uy tín", "trung tâm"],
    },
    {
      id: 4,
      name: "Nha Khoa Kim",
      logo: "💎",
      mentions: 678,
      sentiment: 3.9,
      marketShare: 16,
      trend: -2.1,
      strengths: ["Chuyên sâu về niềng răng", "Có bác sĩ nước ngoài"],
      weaknesses: ["Giá rất cao", "Ít chi nhánh", "Khó đặt lịch"],
      pricing: "Rất cao",
      locations: ["Q1"],
      services: ["Niềng răng cao cấp", "Implant cao cấp"],
      topKeywords: ["cao cấp", "chuyên sâu", "bác sĩ nước ngoài"],
    },
  ];

  // Competitor comparison radar chart data
  const competitorComparisonData = [
    { metric: "Mentions", greenfield: 90, dongnam: 75, paris: 60, kim: 45 },
    { metric: "Sentiment", greenfield: 86, dongnam: 82, paris: 80, kim: 78 },
    { metric: "Engagement", greenfield: 85, dongnam: 70, paris: 65, kim: 60 },
    { metric: "Response Rate", greenfield: 94, dongnam: 65, paris: 58, kim: 42 },
    { metric: "Innovation", greenfield: 92, dongnam: 60, paris: 45, kim: 75 },
    { metric: "Price Competitiveness", greenfield: 75, dongnam: 90, paris: 40, kim: 30 },
  ];

  // AI Lead Detection Data
  const leadOpportunities = [
    {
      id: 1,
      platform: "Facebook Group",
      groupName: "Hội phụ huynh Q7",
      author: "Trần Thị Lan",
      authorAvatar: "👩",
      location: "Quận 7, TP.HCM",
      content: "Các mẹ ơi, con mình 12 tuổi răng hô và khấp khểnh quá. Có nha khoa nào ở Q7 uy tín niềng răng cho trẻ em không ạ? Giá khoảng bao nhiêu các mẹ?",
      timestamp: "15 phút trước",
      intent: "Tìm kiếm dịch vụ niềng răng",
      leadScore: 95,
      priority: "hot",
      signals: ["Hỏi giá", "Tìm nha khoa", "Có nhu cầu cụ thể", "Khu vực gần"],
      demographics: {
        age: "35-40",
        income: "Trung bình",
        location: "Quận 7",
      },
      suggestedAction: "Comment giới thiệu dịch vụ niềng răng trẻ em + case study + ưu đãi",
      estimatedValue: "45-60 triệu",
      status: "new",
      aiNotes: "High intent - Đang tích cực tìm kiếm trong khu vực. Nhấn mạnh chuyên môn niềng răng trẻ em và location Q7.",
    },
    {
      id: 2,
      platform: "Zalo Community",
      groupName: "Cư dân Sunrise City",
      author: "Nguyễn Văn Minh",
      authorAvatar: "👨",
      location: "Quận 7, TP.HCM",
      content: "Mình đang bị đau răng cấm dữ lắm, có bác sĩ nào giỏi nhổ răng khôn không? Ai có kinh nghiệm chỉ mình với.",
      timestamp: "32 phút trước",
      intent: "Cần nhổ răng khôn gấp",
      leadScore: 92,
      priority: "hot",
      signals: ["Nhu cầu khẩn cấp", "Đau răng", "Tìm bác sĩ", "Khu vực gần"],
      demographics: {
        age: "25-35",
        income: "Cao",
        location: "Sunrise City Q7",
      },
      suggestedAction: "DM ngay với thông tin bác sĩ + slot khẩn cấp + công nghệ không đau",
      estimatedValue: "3-5 triệu",
      status: "new",
      aiNotes: "Urgent need - Nên contact trong 1 giờ. Nhấn mạnh công nghệ nhổ răng không đau và có thể đặt lịch gấp.",
    },
    {
      id: 3,
      platform: "Facebook",
      groupName: "Hội chị em văn phòng",
      author: "Lê Thu Hà",
      authorAvatar: "👩‍💼",
      location: "Quận 1, TP.HCM",
      content: "Sắp cưới rồi muốn tẩy trắng răng cho đẹp. Chị em có chỗ nào uy tín không, giá tầm 3-5 triệu. Cần kết quả nhanh trong 2 tuần nữa.",
      timestamp: "1 giờ trước",
      intent: "Tẩy trắng răng cho sự kiện",
      leadScore: 88,
      priority: "warm",
      signals: ["Budget rõ ràng", "Deadline cụ thể", "Sự kiện quan trọng", "Sẵn sàng chi tiền"],
      demographics: {
        age: "25-30",
        income: "Trung bình-Cao",
        location: "Quận 1",
      },
      suggestedAction: "Comment với case study cô dâu + before/after + công nghệ Zoom 1 giờ",
      estimatedValue: "4-6 triệu",
      status: "engaging",
      aiNotes: "Time-sensitive - Nhấn mạnh kết quả nhanh (1 session), before/after của cô dâu, và đặt lịch ngay.",
    },
    {
      id: 4,
      platform: "TikTok Comments",
      groupName: "Video về nha khoa",
      author: "@beautyqueen89",
      authorAvatar: "💁‍♀️",
      location: "TP.HCM",
      content: "Mình muốn làm implant 2 răng hàm, ai làm rồi cho mình xin kinh nghiệm với. Sợ đau lắm 😭",
      timestamp: "3 giờ trước",
      intent: "Tìm hiểu về implant",
      leadScore: 75,
      priority: "warm",
      signals: ["Nhu cầu rõ ràng", "Tìm review", "Lo lắng về pain point"],
      demographics: {
        age: "25-35",
        income: "Trung bình-Cao",
        location: "TP.HCM",
      },
      suggestedAction: "Reply với video testimonial + giải thích quy trình + công nghệ không đau",
      estimatedValue: "60-80 triệu",
      status: "new",
      aiNotes: "Research phase - Cần education content. Share testimonial videos và giải đáp về quy trình để build trust.",
    },
    {
      id: 5,
      platform: "Google Maps Review",
      groupName: "Review competitor",
      author: "Hoàng Minh Tuấn",
      authorAvatar: "👨‍💼",
      location: "Quận 7",
      content: "Vừa đi khám ở nha khoa X nhưng không hài lòng lắm, báo giá mà không giải thích rõ ràng. Có nha khoa nào tư vấn kỹ hơn không?",
      timestamp: "5 giờ trước",
      intent: "Không hài lòng competitor - tìm alternative",
      leadScore: 90,
      priority: "hot",
      signals: ["Negative competitor experience", "Tìm alternative", "Cần tư vấn chi tiết"],
      demographics: {
        age: "30-40",
        income: "Cao",
        location: "Quận 7",
      },
      suggestedAction: "DM với lời mời tư vấn miễn phí + nhấn mạnh quy trình tư vấn chi tiết",
      estimatedValue: "Varies",
      status: "new",
      aiNotes: "Competitor dissatisfaction - Golden opportunity! Nhấn mạnh consultation process và transparency của Greenfield.",
    },
    {
      id: 6,
      platform: "Facebook",
      groupName: "Hội người mới về Q7",
      author: "Phan Thị Mai",
      authorAvatar: "👩",
      location: "Quận 7",
      content: "Mình mới chuyển về Q7, tìm nha khoa gia đình cho cả nhà đi khám định kỳ. Có 4 người. Chỗ nào có package cho gia đình không?",
      timestamp: "45 phút trước",
      intent: "Tìm nha khoa gia đình",
      leadScore: 85,
      priority: "warm",
      signals: ["Cả gia đình 4 người", "Định kỳ = long-term", "Hỏi về package"],
      demographics: {
        age: "35-45",
        income: "Cao",
        location: "Quận 7",
      },
      suggestedAction: "Comment về gói gia đình + lợi ích khám định kỳ + location Q7",
      estimatedValue: "15-25 triệu/năm",
      status: "new",
      aiNotes: "High LTV opportunity - Entire family, recurring revenue. Nhấn mạnh family packages và long-term care.",
    },
  ];

  const leadStats = {
    total: leadOpportunities.length,
    hot: leadOpportunities.filter((l) => l.priority === "hot").length,
    warm: leadOpportunities.filter((l) => l.priority === "warm").length,
    new: leadOpportunities.filter((l) => l.status === "new").length,
    engaging: leadOpportunities.filter((l) => l.status === "engaging").length,
    totalValue: "240-380 triệu",
    avgResponseTime: "18 phút",
    conversionRate: "34%",
  };

  const handleAiScan = () => {
    setAiScanningStatus("scanning");
    setTimeout(() => {
      setAiScanningStatus("complete");
      setTimeout(() => setAiScanningStatus("idle"), 3000);
    }, 3000);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="w-4 h-4 text-green-500" />;
      case "negative":
        return <Frown className="w-4 h-4 text-red-500" />;
      default:
        return <Meh className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Badge className="bg-green-100 text-green-700 border-green-300">Positive</Badge>;
      case "negative":
        return <Badge className="bg-red-100 text-red-700 border-red-300">Negative</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-300">Neutral</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === "hot") {
      return (
        <Badge variant="destructive" className="gap-1">
          🔥 Hot Lead
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="gap-1">
        💡 Warm Lead
      </Badge>
    );
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 90) return "text-red-500";
    if (score >= 80) return "text-orange-500";
    return "text-yellow-500";
  };

  // Response metrics
  const responseMetrics = {
    avgResponseTime: "24 phút",
    responseRate: 94,
    totalResponses: 387,
    pendingResponses: 12,
  };

  // Influencer mentions
  const influencerMentions = [
    {
      name: "Dr. Beauty Tips",
      platform: "Instagram",
      followers: "125K",
      mentions: 3,
      reach: "45K",
      sentiment: "positive",
    },
    {
      name: "Vietnam Beauty",
      platform: "Facebook",
      followers: "89K",
      mentions: 2,
      reach: "32K",
      sentiment: "positive",
    },
    {
      name: "Dental Care VN",
      platform: "TikTok",
      followers: "67K",
      mentions: 5,
      reach: "78K",
      sentiment: "positive",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Social Listening</h1>
        <p className="text-muted-foreground">
          Theo dõi và phân tích conversations về Greenfield Dental trên mạng xã hội
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">
            <Activity className="w-4 h-4 mr-2" />
            Tổng Quan
          </TabsTrigger>
          <TabsTrigger value="mentions">
            <MessageCircle className="w-4 h-4 mr-2" />
            Mentions
          </TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Topics
          </TabsTrigger>
          <TabsTrigger value="competitors">
            <Target className="w-4 h-4 mr-2" />
            Competitors
          </TabsTrigger>
          <TabsTrigger value="leads">
            <Bot className="w-4 h-4 mr-2" />
            AI Lead Detection
            {leadStats.new > 0 && (
              <Badge variant="destructive" className="ml-2">
                {leadStats.new}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="influencers">
            <Star className="w-4 h-4 mr-2" />
            Influencers
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Mentions</p>
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">3,359</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+14.2% vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Sentiment</p>
                  <Heart className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">4.3/5.0</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+0.2 vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                  <Activity className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{responseMetrics.responseRate}%</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+3% vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{responseMetrics.avgResponseTime}</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  <span>-8min vs last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sentiment Trend & Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sentiment Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sentimentTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="positive"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                        name="Positive"
                      />
                      <Area
                        type="monotone"
                        dataKey="neutral"
                        stackId="1"
                        stroke="#94a3b8"
                        fill="#94a3b8"
                        fillOpacity={0.6}
                        name="Neutral"
                      />
                      <Area
                        type="monotone"
                        dataKey="negative"
                        stackId="1"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.6}
                        name="Negative"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sentimentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformMentions.map((platform, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-2xl w-8">{platform.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{platform.platform}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            {platform.mentions.toLocaleString()} mentions
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium">{platform.sentiment}</span>
                          </div>
                          <div
                            className={`flex items-center gap-1 text-sm ${
                              platform.trend > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {platform.trend > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            <span>{platform.trend > 0 ? "+" : ""}{platform.trend}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mentions Tab */}
        <TabsContent value="mentions" className="space-y-6">
          <div className="flex items-center gap-4">
            <Input placeholder="Search mentions..." className="flex-1" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiments</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-platforms">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-platforms">All Platforms</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="zalo">Zalo</SelectItem>
                <SelectItem value="google">Google Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {topMentions.map((mention) => (
              <Card key={mention.id} className={!mention.responded ? "border-l-4 border-l-destructive" : ""}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                          {mention.author[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{mention.author}</span>
                            {mention.authorType === "influencer" && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Influencer
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{mention.platform}</span>
                            <span>•</span>
                            <span>{mention.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSentimentBadge(mention.sentiment)}
                        {!mention.responded && (
                          <Badge variant="destructive">
                            <Bell className="w-3 h-3 mr-1" />
                            Needs Response
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm">{mention.content}</p>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{mention.engagement.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{mention.engagement.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          <span>{mention.engagement.shares}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Post
                        </Button>
                        {!mention.responded && (
                          <Button size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Respond
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trending Topics Tab */}
        <TabsContent value="trending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending Keywords & Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{topic.keyword}</span>
                        {getSentimentIcon(topic.sentiment)}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{topic.mentions.toLocaleString()} mentions</span>
                        <div
                          className={`flex items-center gap-1 ${
                            topic.change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {topic.change > 0 ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          <span>{topic.change > 0 ? "+" : ""}{topic.change}%</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitors Tab - ENHANCED */}
        <TabsContent value="competitors" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Competitive Intelligence</h2>
              <p className="text-sm text-muted-foreground">
                Phân tích chi tiết competitors và market positioning
              </p>
            </div>
            <Select defaultValue="last-7-days">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Market Share Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {competitorData.map((comp) => (
              <Card key={comp.id} className={comp.id === 1 ? "border-2 border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className="text-4xl">{comp.logo}</div>
                    <h3 className="font-semibold text-sm">{comp.name}</h3>
                    <div className="text-3xl font-bold text-primary">{comp.marketShare}%</div>
                    <p className="text-xs text-muted-foreground">Market Share</p>
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{comp.sentiment}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Competitive Radar Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Multi-Dimensional Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={competitorComparisonData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Greenfield"
                      dataKey="greenfield"
                      stroke="#0d9488"
                      fill="#0d9488"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Đông Nam"
                      dataKey="dongnam"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.4}
                    />
                    <Radar name="Paris" dataKey="paris" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                    <Radar name="Kim" dataKey="kim" stroke="#6b7280" fill="#6b7280" fillOpacity={0.2} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Competitor Profiles */}
          <div className="space-y-4">
            {competitorData.map((comp) => (
              <Card key={comp.id} className={comp.id === 1 ? "border-2 border-primary/50" : ""}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{comp.logo}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{comp.name}</h3>
                            {comp.id === 1 && (
                              <Badge variant="default">
                                <Trophy className="w-3 h-3 mr-1" />
                                Your Brand
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{comp.mentions.toLocaleString()} mentions</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span>{comp.sentiment}</span>
                            </div>
                            <div
                              className={`flex items-center gap-1 ${
                                comp.trend > 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {comp.trend > 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              <span>{comp.trend > 0 ? "+" : ""}{comp.trend}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {comp.marketShare}% Market Share
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 text-green-600" />
                            Strengths
                          </h4>
                          <ul className="space-y-1">
                            {comp.strengths.map((strength, i) => (
                              <li key={i} className="text-sm flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <ThumbsDown className="w-4 h-4 text-red-600" />
                            Weaknesses
                          </h4>
                          <ul className="space-y-1">
                            {comp.weaknesses.map((weakness, i) => (
                              <li key={i} className="text-sm flex items-center gap-2">
                                <XCircle className="w-3 h-3 text-red-600" />
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Pricing</p>
                              <p className="text-sm font-medium">{comp.pricing}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Locations</p>
                              <p className="text-sm font-medium">{comp.locations.length} chi nhánh</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Locations</p>
                          <div className="flex flex-wrap gap-1">
                            {comp.locations.map((loc, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {loc}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Services</p>
                          <div className="flex flex-wrap gap-1">
                            {comp.services.slice(0, 3).map((service, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {comp.services.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{comp.services.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Top Keywords</p>
                          <div className="flex flex-wrap gap-1">
                            {comp.topKeywords.map((keyword, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                #{keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Lead Detection Tab - NEW */}
        <TabsContent value="leads" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                AI Lead Detection
              </h2>
              <p className="text-sm text-muted-foreground">
                AI Agent tự động quét và phát hiện lead opportunities từ social media
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all" onValueChange={setSelectedLeadFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Leads</SelectItem>
                  <SelectItem value="hot">Hot Leads Only</SelectItem>
                  <SelectItem value="warm">Warm Leads Only</SelectItem>
                  <SelectItem value="new">New Only</SelectItem>
                  <SelectItem value="engaging">Engaging</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAiScan} disabled={aiScanningStatus === "scanning"}>
                {aiScanningStatus === "scanning" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : aiScanningStatus === "complete" ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Scan Complete
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Run AI Scan
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Lead Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <Target className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold">{leadStats.total}</p>
                <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Hot Leads</p>
                  <Zap className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-2xl font-bold text-red-500">{leadStats.hot}</p>
                <p className="text-xs text-red-600 mt-1">Urgent attention needed</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Warm Leads</p>
                  <Activity className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-orange-500">{leadStats.warm}</p>
                <p className="text-xs text-muted-foreground mt-1">Ready to engage</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Est. Value</p>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-lg font-bold text-primary">{leadStats.totalValue}</p>
                <p className="text-xs text-muted-foreground mt-1">Potential revenue</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{leadStats.conversionRate}</p>
                <p className="text-xs text-green-600 mt-1">+8% vs last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Lead Opportunities */}
          <div className="space-y-4">
            {leadOpportunities
              .filter((lead) => {
                if (selectedLeadFilter === "all") return true;
                if (selectedLeadFilter === "hot") return lead.priority === "hot";
                if (selectedLeadFilter === "warm") return lead.priority === "warm";
                if (selectedLeadFilter === "new") return lead.status === "new";
                if (selectedLeadFilter === "engaging") return lead.status === "engaging";
                return true;
              })
              .map((lead) => (
                <Card
                  key={lead.id}
                  className={`${
                    lead.priority === "hot"
                      ? "border-l-4 border-l-red-500"
                      : "border-l-4 border-l-orange-400"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{lead.authorAvatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{lead.author}</h3>
                              {getPriorityBadge(lead.priority)}
                              <Badge variant="outline" className="text-xs">
                                {lead.platform}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {lead.location}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {lead.timestamp}
                              </span>
                            </div>
                            <p className="text-sm italic text-muted-foreground mb-2">
                              {lead.groupName && `Posted in: ${lead.groupName}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground">Lead Score</span>
                            <div className={`text-2xl font-bold ${getLeadScoreColor(lead.leadScore)}`}>
                              {lead.leadScore}
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {lead.estimatedValue}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="bg-accent/50 p-4 rounded-lg">
                        <p className="text-sm">{lead.content}</p>
                      </div>

                      {/* AI Analysis */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Intent Detected</p>
                            <Badge className="bg-primary/10 text-primary border-primary">
                              <Target className="w-3 h-3 mr-1" />
                              {lead.intent}
                            </Badge>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Key Signals</p>
                            <div className="flex flex-wrap gap-1">
                              {lead.signals.map((signal, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {signal}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Demographics</p>
                            <div className="flex gap-2 text-xs">
                              <Badge variant="outline">{lead.demographics.age}</Badge>
                              <Badge variant="outline">{lead.demographics.income}</Badge>
                              <Badge variant="outline">{lead.demographics.location}</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              AI Recommended Action
                            </p>
                            <p className="text-sm bg-primary/5 p-2 rounded border-l-2 border-primary">
                              {lead.suggestedAction}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                              <Bot className="w-3 h-3" />
                              AI Notes
                            </p>
                            <p className="text-xs bg-accent/50 p-2 rounded">{lead.aiNotes}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t">
                        <Button size="sm" className="gap-2">
                          <Send className="w-4 h-4" />
                          Quick Engage
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Phone className="w-4 h-4" />
                          Call Lead
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Mail className="w-4 h-4" />
                          Send Email
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <UserPlus className="w-4 h-4" />
                          Add to CRM
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                          <ExternalLink className="w-4 h-4" />
                          View Original Post
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Influencers Tab */}
        <TabsContent value="influencers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Influencer Mentions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {influencerMentions.map((influencer, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                    <Star className="w-8 h-8 text-amber-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{influencer.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {influencer.platform}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {influencer.followers} followers
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {influencer.mentions} mentions
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {influencer.reach} reach
                        </span>
                        {getSentimentIcon(influencer.sentiment)}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
