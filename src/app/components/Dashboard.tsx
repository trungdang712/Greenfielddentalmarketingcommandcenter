import { CheckSquare, Clock, FileText, Trophy, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface DashboardProps {
  userName: string;
  userRole: string;
}

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
  color?: string;
}

function KPICard({ title, value, subtitle, icon: Icon, trend, color = "bg-primary" }: KPICardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-semibold">{value}</h3>
              {trend && (
                <div className={`flex items-center text-sm ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
                  {trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="ml-1">{Math.abs(trend.value)}%</span>
                </div>
              )}
            </div>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={`${color} p-3 rounded-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Dashboard({ userName, userRole }: DashboardProps) {
  const currentDate = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const upcomingContent = [
    { date: "Hôm nay", time: "10:00", platform: "Facebook", title: "Post khuyến mãi tẩy trắng răng", status: "ready" },
    { date: "Hôm nay", time: "15:00", platform: "Zalo", title: "Bài viết chăm sóc răng miệng", status: "ready" },
    { date: "Mai", time: "09:00", platform: "TikTok", title: "Video testimonial bệnh nhân", status: "in-production" },
    { date: "Mai", time: "14:00", platform: "Facebook", title: "Giới thiệu dịch vụ niềng răng", status: "review" },
  ];

  const recentActivities = [
    { user: "Trần Văn B", action: "đã hoàn thành task", item: "Thiết kế banner Facebook", time: "10 phút trước", type: "success" },
    { user: "Lê Thị C", action: "đã gửi proposal mới", item: "Campaign Valentine's Day", time: "30 phút trước", type: "info" },
    { user: "Nguyễn Văn D", action: "đã comment trên", item: "Task #456 - Review content", time: "1 giờ trước", type: "info" },
    { user: "Phạm Thị E", action: "đã approve", item: "Proposal #123", time: "2 giờ trước", type: "success" },
  ];

  const platformColors: { [key: string]: string } = {
    Facebook: "bg-blue-500",
    Zalo: "bg-blue-600",
    TikTok: "bg-black",
    Instagram: "bg-pink-500",
  };

  const statusLabels: { [key: string]: { label: string; variant: "default" | "secondary" | "destructive" | "outline" } } = {
    ready: { label: "Sẵn sàng", variant: "default" },
    "in-production": { label: "Đang thực hiện", variant: "secondary" },
    review: { label: "Đang review", variant: "outline" },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-1">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-muted-foreground">{currentDate}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Task cần làm hôm nay"
          value={3}
          icon={CheckSquare}
          color="bg-primary"
        />
        <KPICard
          title="Chờ duyệt"
          value={5}
          subtitle="Proposals"
          icon={Clock}
          color="bg-warning"
        />
        <KPICard
          title="Bài viết tuần này"
          value="12/15"
          icon={FileText}
          trend={{ value: 8, isPositive: true }}
          color="bg-info"
        />
        <KPICard
          title="Điểm của tôi"
          value={450}
          subtitle="Hạng #3"
          icon={Trophy}
          trend={{ value: 12, isPositive: true }}
          color="bg-gold"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Content */}
        <Card>
          <CardHeader>
            <CardTitle>Nội dung sắp đăng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingContent.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className={`${platformColors[item.platform]} w-2 h-2 rounded-full mt-2`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{item.date}</span>
                      <span className="text-sm text-muted-foreground">{item.time}</span>
                      <Badge variant="secondary" className="text-xs">{item.platform}</Badge>
                    </div>
                    <p className="text-sm">{item.title}</p>
                    <Badge variant={statusLabels[item.status].variant} className="text-xs mt-2">
                      {statusLabels[item.status].label}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'success' ? 'bg-success' : 'bg-info'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hành động nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tạo Task mới
            </Button>
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Tạo Proposal mới
            </Button>
            <Button variant="outline">Xem Lịch Content</Button>
            <Button variant="outline">Task của tôi</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
