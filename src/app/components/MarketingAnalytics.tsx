import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Users, 
  MousePointer, 
  Eye, 
  Target,
  Clock,
  MapPin,
  Briefcase,
  DollarSign,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

interface MarketingAnalyticsProps {
  view: string;
}

export function MarketingAnalytics({ view }: MarketingAnalyticsProps) {
  const spendTrendData = [
    { date: "01/01", spend: 1.2, projected: 1.5 },
    { date: "05/01", spend: 1.4, projected: 1.5 },
    { date: "10/01", spend: 1.8, projected: 1.5 },
    { date: "15/01", spend: 2.1, projected: 1.5 },
    { date: "20/01", spend: 1.9, projected: 1.5 },
    { date: "25/01", spend: 2.3, projected: 1.5 },
  ];

  const platformData = [
    { name: "Google Ads", budget: 20, spent: 12.6, percentage: 63 },
    { name: "Facebook", budget: 20, spent: 14.4, percentage: 72 },
    { name: "Zalo Ads", budget: 10, spent: 5.5, percentage: 55 },
  ];

  const campaigns = [
    {
      name: "Summer Promo",
      platform: "Facebook",
      spend: "15,000,000",
      leads: 78,
      roas: "3.5x",
      status: "active",
    },
    {
      name: "Implant Ads",
      platform: "Google",
      spend: "20,000,000",
      leads: 45,
      roas: "4.2x",
      status: "active",
    },
    {
      name: "Teeth Whitening",
      platform: "Zalo",
      spend: "8,000,000",
      leads: 32,
      roas: "2.8x",
      status: "active",
    },
  ];

  const topPosts = [
    { platform: "Facebook", title: "Khuyến mãi tẩy trắng răng", reach: "5.2K", engagement: 234 },
    { platform: "Zalo", title: "Chăm sóc răng miệng mùa hè", reach: "3.1K", engagement: 156 },
    { platform: "Instagram", title: "Before/After niềng răng", reach: "8.4K", engagement: 521 },
  ];

  const getViewTitle = () => {
    switch (view) {
      case "/analytics/campaigns":
        return "Campaigns Overview";
      case "/analytics/posts":
        return "Post Performance";
      case "/analytics/landing":
        return "Landing Pages";
      case "/analytics/budget":
        return "Monthly Budget";
      default:
        return "Marketing Analytics";
    }
  };

  const renderBudgetView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ngân sách tháng 1/2024</h2>
        <Select defaultValue="jan-2024">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn tháng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jan-2024">Tháng 1 2024</SelectItem>
            <SelectItem value="dec-2023">Tháng 12 2023</SelectItem>
            <SelectItem value="nov-2023">Tháng 11 2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Budget Summary */}
      <Card className="border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">TỔNG NGÂN SÁCH: 50,000,000 VND</h3>
              <div className="w-full bg-muted rounded-full h-4 mb-2">
                <div className="bg-primary h-4 rounded-full" style={{ width: "65%" }} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>
                  <span className="font-medium">Đã chi:</span> 32,500,000 VND
                </span>
                <span>
                  <span className="font-medium">Còn lại:</span> 17,500,000 VND
                </span>
                <span className="text-muted-foreground">10 ngày còn lại</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết theo nền tảng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformData.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{platform.name}</span>
                  <div className="flex items-center gap-2">
                    <span>
                      {platform.spent}M / {platform.budget}M VND
                    </span>
                    <Badge
                      variant={
                        platform.percentage > 70 ? "destructive" : platform.percentage > 60 ? "secondary" : "default"
                      }
                    >
                      {platform.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      platform.percentage > 70 ? "bg-destructive" : platform.percentage > 60 ? "bg-warning" : "bg-success"
                    }`}
                    style={{ width: `${platform.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Spend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiêu hàng ngày</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="spend" stroke="#0d9488" name="Thực tế" strokeWidth={2} />
              <Line type="monotone" dataKey="projected" stroke="#94a3b8" name="Dự kiến" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="border-l-4 border-l-warning">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">⚠️</Badge>
              <div>
                <p className="font-medium">Facebook spend vượt dự kiến 5%</p>
                <p className="text-sm text-muted-foreground">Cần xem xét điều chỉnh ngân sách</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">ℹ️</Badge>
              <div>
                <p className="font-medium">Dự kiến cuối tháng: 48,500,000 VND</p>
                <p className="text-sm text-muted-foreground">Dưới ngân sách 1.5M</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCampaignsView = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="zalo">Zalo</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Khoảng thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 ngày</SelectItem>
            <SelectItem value="30d">30 ngày</SelectItem>
            <SelectItem value="90d">90 ngày</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm campaign..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Tổng chi</p>
            <p className="text-2xl font-semibold">45.2M VND</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Tổng leads</p>
            <p className="text-2xl font-semibold">234</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Conversions</p>
            <p className="text-2xl font-semibold">89</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">ROAS trung bình</p>
            <p className="text-2xl font-semibold">3.2x</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Campaign</th>
                  <th className="text-left p-3 font-medium">Platform</th>
                  <th className="text-right p-3 font-medium">Chi tiêu</th>
                  <th className="text-right p-3 font-medium">Leads</th>
                  <th className="text-right p-3 font-medium">ROAS</th>
                  <th className="text-left p-3 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr key={index} className="border-b hover:bg-accent/50">
                    <td className="p-3 font-medium">{campaign.name}</td>
                    <td className="p-3">
                      <Badge variant="secondary">{campaign.platform}</Badge>
                    </td>
                    <td className="p-3 text-right">{campaign.spend} VND</td>
                    <td className="p-3 text-right">{campaign.leads}</td>
                    <td className="p-3 text-right">
                      <span className="font-medium text-success">{campaign.roas}</span>
                    </td>
                    <td className="p-3">
                      <Badge variant="default">Đang chạy</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPostsView = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="zalo">Zalo</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Khoảng thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 ngày</SelectItem>
            <SelectItem value="30d">30 ngày</SelectItem>
            <SelectItem value="90d">90 ngày</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top Performing Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Bài viết hiệu suất cao nhất</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-4xl opacity-50">📸</span>
              </div>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">
                  {post.platform}
                </Badge>
                <p className="font-medium mb-2">{post.title}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.reach} reach</span>
                  <span>{post.engagement} engagement</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLandingPagesView = () => {
    // Landing Pages Data
    const landingPages = [
      {
        name: "Niềng Răng Invisalign - Nụ Cười Hoàn Hảo",
        url: "greenfielddental.vn/nieng-rang-invisalign",
        status: "active",
        visitors: 12543,
        conversions: 287,
        conversionRate: 2.29,
        avgTimeOnPage: "3:42",
        bounceRate: 42.3,
        targetMarket: {
          primaryAge: "25-40 tuổi",
          segment: "Chuyên gia trẻ, Doanh nhân",
          income: "20-50 triệu/tháng",
          location: "TP.HCM, Hà Nội",
        },
        services: ["Niềng răng Invisalign", "Tư vấn chỉnh nha", "3D Simulation"],
        performance: "excellent",
        trend: 12.5,
      },
      {
        name: "Cấy Ghép Implant - Răng Mới Vĩnh Viễn",
        url: "greenfielddental.vn/cay-ghep-implant",
        status: "active",
        visitors: 8921,
        conversions: 156,
        conversionRate: 1.75,
        avgTimeOnPage: "4:15",
        bounceRate: 38.7,
        targetMarket: {
          primaryAge: "45-65 tuổi",
          segment: "Người trung niên, Cao tuổi",
          income: "25-60 triệu/tháng",
          location: "TP.HCM, Bình Dương, Đồng Nai",
        },
        services: ["Implant Straumann", "Phục hồi toàn hàm", "CT 3D Scan"],
        performance: "good",
        trend: 8.3,
      },
      {
        name: "Nha Khoa Gia Đình - Chăm Sóc Toàn Diện",
        url: "greenfielddental.vn/nha-khoa-gia-dinh",
        status: "active",
        visitors: 15234,
        conversions: 428,
        conversionRate: 2.81,
        avgTimeOnPage: "2:58",
        bounceRate: 35.2,
        targetMarket: {
          primaryAge: "28-42 tuổi",
          segment: "Gia đình trẻ, Phụ huynh",
          income: "15-40 triệu/tháng",
          location: "TP.HCM và vùng phụ cận",
        },
        services: ["Khám tổng quát", "Nha khoa trẻ em", "Điều trị dự phòng", "Gói gia đình"],
        performance: "excellent",
        trend: 15.7,
      },
      {
        name: "Tẩy Trắng Răng Zoom - Trắng Sáng 1 Giờ",
        url: "greenfielddental.vn/tay-trang-rang-zoom",
        status: "testing",
        visitors: 6543,
        conversions: 98,
        conversionRate: 1.50,
        avgTimeOnPage: "2:24",
        bounceRate: 52.1,
        targetMarket: {
          primaryAge: "22-35 tuổi",
          segment: "Người trẻ, Influencer, Nghệ sĩ",
          income: "12-35 triệu/tháng",
          location: "TP.HCM, Hà Nội, Đà Nẵng",
        },
        services: ["Tẩy trắng Zoom", "Whitening Home Kit", "Maintenance Package"],
        performance: "average",
        trend: -5.2,
      },
    ];

    const trafficTrendData = [
      { date: "T1", visitors: 8500, conversions: 165 },
      { date: "T2", visitors: 9200, conversions: 189 },
      { date: "T3", visitors: 11300, conversions: 245 },
      { date: "T4", visitors: 10800, conversions: 223 },
      { date: "T5", visitors: 12400, conversions: 287 },
      { date: "T6", visitors: 13900, conversions: 325 },
      { date: "T7", visitors: 15234, conversions: 378 },
    ];

    const deviceData = [
      { name: "Mobile", value: 62, color: "#0d9488" },
      { name: "Desktop", value: 28, color: "#f59e0b" },
      { name: "Tablet", value: 10, color: "#94a3b8" },
    ];

    const ageDistribution = [
      { age: "18-24", percentage: 12 },
      { age: "25-34", percentage: 38 },
      { age: "35-44", percentage: 28 },
      { age: "45-54", percentage: 15 },
      { age: "55+", percentage: 7 },
    ];

    const getPerformanceBadge = (performance: string) => {
      switch (performance) {
        case "excellent":
          return <Badge className="bg-green-500 hover:bg-green-600">Xuất sắc</Badge>;
        case "good":
          return <Badge className="bg-blue-500 hover:bg-blue-600">Tốt</Badge>;
        case "average":
          return <Badge variant="secondary">Trung bình</Badge>;
        default:
          return <Badge variant="outline">Cần cải thiện</Badge>;
      }
    };

    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Select defaultValue="30d">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 ngày</SelectItem>
                <SelectItem value="30d">30 ngày</SelectItem>
                <SelectItem value="90d">90 ngày</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang chạy</SelectItem>
                <SelectItem value="testing">Đang test</SelectItem>
                <SelectItem value="paused">Tạm dừng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Sparkles className="w-4 h-4" />
            Tạo Landing Page Mới
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Tổng Visitors</p>
                <Eye className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">43.2K</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">+12.5%</span>
                <span className="text-xs text-muted-foreground">vs tháng trước</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Tổng Conversions</p>
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">969</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">+18.3%</span>
                <span className="text-xs text-muted-foreground">vs tháng trước</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Conversion Rate TB</p>
                <MousePointer className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">2.24%</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">+0.3%</span>
                <span className="text-xs text-muted-foreground">vs tháng trước</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Bounce Rate TB</p>
                <TrendingDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">42.1%</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowDownRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">-3.2%</span>
                <span className="text-xs text-muted-foreground">vs tháng trước</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic & Conversion Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Xu Hướng Traffic & Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="visitors" stroke="#0d9488" name="Visitors" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#f59e0b" name="Conversions" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân Bố Thiết Bị</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {deviceData.map((device) => (
                  <div key={device.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                      <span>{device.name}</span>
                    </div>
                    <span className="font-medium">{device.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân Bố Độ Tuổi Khách Hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#0d9488" name="Tỷ lệ (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Landing Pages Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Chi Tiết Landing Pages</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm landing page..." className="pl-10 w-[250px]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {landingPages.map((page, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{page.name}</h3>
                        {getPerformanceBadge(page.performance)}
                        <Badge variant={page.status === "active" ? "default" : "secondary"}>
                          {page.status === "active" ? "Đang chạy" : "Đang test"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <ExternalLink className="w-3 h-3" />
                        <span>{page.url}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        {page.trend > 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                        <span className={page.trend > 0 ? "text-green-500" : "text-red-500"}>
                          {page.trend > 0 ? "+" : ""}
                          {page.trend}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 pb-4 border-b">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Visitors</p>
                      <p className="text-lg font-semibold">{page.visitors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Conversions</p>
                      <p className="text-lg font-semibold text-primary">{page.conversions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Conv. Rate</p>
                      <p className="text-lg font-semibold">{page.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Avg. Time</p>
                      <p className="text-lg font-semibold">{page.avgTimeOnPage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Bounce Rate</p>
                      <p className="text-lg font-semibold">{page.bounceRate}%</p>
                    </div>
                  </div>

                  {/* Target Market Info */}
                  <div className="bg-muted/50 rounded-lg p-4 mb-3">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Thị Trường Mục Tiêu
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Độ tuổi</p>
                          <p className="font-medium">{page.targetMarket.primaryAge}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Briefcase className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Phân khúc</p>
                          <p className="font-medium">{page.targetMarket.segment}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Thu nhập</p>
                          <p className="font-medium">{page.targetMarket.income}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Khu vực</p>
                          <p className="font-medium">{page.targetMarket.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Dịch vụ featured:</p>
                    <div className="flex flex-wrap gap-2">
                      {page.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3" />
                      Xem chi tiết
                    </Button>
                    <Button variant="outline" size="sm">
                      Chỉnh sửa
                    </Button>
                    <Button variant="outline" size="sm">
                      A/B Test
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights & Recommendations */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Insights & Khuyến Nghị
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Landing page "Nha Khoa Gia Đình" đang có performance xuất sắc</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Conversion rate 2.81% cao hơn 25% so với trung bình. Nên tăng budget cho traffic source này.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Cơ hội tối ưu hóa cho nhóm tuổi 25-34</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    38% traffic đến từ nhóm này nhưng conversion rate chỉ 1.8%. Nên A/B test message và CTA cho segment này.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-100 text-red-600">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Landing page "Tẩy Trắng Răng" cần cải thiện</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Bounce rate 52.1% cao hơn 23% so với trung bình. Nên kiểm tra tốc độ tải trang và relevance của content với ads.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Mobile traffic chiếm 62% nhưng conversion rate thấp hơn desktop 40%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nên tối ưu hóa mobile experience, đặc biệt form điền thông tin và CTA buttons.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">{getViewTitle()}</h1>
        <p className="text-muted-foreground">Phân tích và theo dõi hiệu quả marketing</p>
      </div>

      {view === "/analytics/budget" && renderBudgetView()}
      {view === "/analytics/campaigns" && renderCampaignsView()}
      {view === "/analytics/posts" && renderPostsView()}
      {view === "/analytics/landing" && renderLandingPagesView()}
    </div>
  );
}