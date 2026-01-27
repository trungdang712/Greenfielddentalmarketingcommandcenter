import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Camera, FileText, Inbox as InboxIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

export function Inbox() {
  const contentOpportunities = [
    {
      id: 1,
      type: "testimonial",
      title: "Patient testimonial - Implant success",
      from: "Sales Team (Nguyễn Văn C)",
      date: "Jan 5, 2024",
      priority: "hot",
      consentStatus: "obtained",
      description: "Bệnh nhân rất hài lòng sau khi cấy ghép implant, đồng ý quay video testimonial và chụp ảnh before/after.",
      status: "new",
    },
    {
      id: 2,
      type: "before-after",
      title: "Before/After case - Teeth whitening",
      from: "Nurse Team (Trần Thị D)",
      date: "Jan 4, 2024",
      priority: "normal",
      consentStatus: "pending",
      description: "Case tẩy trắng răng có kết quả rất tốt, đã có ảnh before/after. Đang chờ xác nhận consent từ bệnh nhân.",
      status: "new",
    },
    {
      id: 3,
      type: "case-study",
      title: "Orthodontics case study",
      from: "Doctor (BS. Lê Văn E)",
      date: "Jan 3, 2024",
      priority: "normal",
      consentStatus: "obtained",
      description: "Case niềng răng hoàn thành sau 18 tháng với kết quả xuất sắc. Có đầy đủ hình ảnh quá trình.",
      status: "accepted",
    },
  ];

  const taskRequests = [
    {
      id: 1,
      type: "design",
      title: "Sales presentation slides",
      from: "Sales Team (Lê Văn E)",
      date: "Jan 5, 2024",
      urgency: "normal",
      deadline: "Jan 10",
      description: "Cần thiết kế bộ slides giới thiệu dịch vụ implant cho buổi họp với khách hàng doanh nghiệp.",
      status: "new",
    },
    {
      id: 2,
      type: "content",
      title: "Q&A content for website",
      from: "Customer Service (Phạm Thị F)",
      date: "Jan 4, 2024",
      urgency: "low",
      deadline: "Jan 15",
      description: "Viết nội dung Q&A về dịch vụ tẩy trắng răng cho trang web, dựa trên các câu hỏi thường gặp từ khách hàng.",
      status: "new",
    },
    {
      id: 3,
      type: "video",
      title: "Clinic tour video",
      from: "Operations (Hoàng Văn G)",
      date: "Jan 3, 2024",
      urgency: "normal",
      deadline: "Jan 12",
      description: "Quay video giới thiệu cơ sở vật chất phòng khám sau khi nâng cấp.",
      status: "accepted",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "testimonial":
      case "before-after":
      case "case-study":
        return <Camera className="w-5 h-5" />;
      case "design":
      case "content":
      case "video":
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      testimonial: "Testimonial",
      "before-after": "Before/After",
      "case-study": "Case Study",
      design: "Design",
      content: "Content",
      video: "Video",
    };
    return labels[type] || type;
  };

  const renderOpportunityCard = (opportunity: typeof contentOpportunities[0]) => (
    <Card key={opportunity.id} className={opportunity.status === "new" ? "border-l-4 border-l-primary" : ""}>
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {opportunity.priority === "hot" && (
                <div className="text-destructive">{getTypeIcon(opportunity.type)}</div>
              )}
              {opportunity.priority !== "hot" && (
                <div className="text-primary">{getTypeIcon(opportunity.type)}</div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {opportunity.priority === "hot" && (
                    <Badge variant="destructive" className="text-xs">
                      🔥 HOT
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {getTypeLabel(opportunity.type)}
                  </Badge>
                </div>
                <h3 className="font-semibold mb-1">{opportunity.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>From: {opportunity.from}</span>
                  <span>•</span>
                  <span>{opportunity.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {opportunity.consentStatus === "obtained" && (
                <Badge variant="default" className="text-xs">
                  ✓ Consent Obtained
                </Badge>
              )}
              {opportunity.consentStatus === "pending" && (
                <Badge variant="secondary" className="text-xs">
                  Consent Pending
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm">{opportunity.description}</p>

          {opportunity.status === "new" && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <Button size="sm">View Details</Button>
              <Button variant="default" size="sm" className="gap-2">
                <CheckCircle className="w-4 h-4" />
                Accept
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <XCircle className="w-4 h-4" />
                Decline
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <AlertCircle className="w-4 h-4" />
                Need More Info
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderTaskCard = (request: typeof taskRequests[0]) => (
    <Card key={request.id} className={request.status === "new" ? "border-l-4 border-l-accent" : ""}>
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {getTypeIcon(request.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {getTypeLabel(request.type)} Request
                  </Badge>
                  {request.urgency === "high" && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold mb-1">{request.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>From: {request.from}</span>
                  <span>•</span>
                  <span>{request.date}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Deadline</div>
              <div className="font-medium">{request.deadline}</div>
            </div>
          </div>

          <p className="text-sm">{request.description}</p>

          {request.status === "new" && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <Button variant="default" size="sm" className="gap-2">
                <CheckCircle className="w-4 h-4" />
                Accept
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <XCircle className="w-4 h-4" />
                Decline
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Inbox</h1>
        <p className="text-muted-foreground">Content opportunities và task requests từ các bộ phận khác</p>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="opportunities">
            <Camera className="w-4 h-4 mr-2" />
            Content Opportunities
            <Badge variant="destructive" className="ml-2">
              {contentOpportunities.filter((o) => o.status === "new").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <FileText className="w-4 h-4 mr-2" />
            Task Requests
            <Badge variant="secondary" className="ml-2">
              {taskRequests.filter((r) => r.status === "new").length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Opportunities</CardTitle>
              <p className="text-sm text-muted-foreground">
                Các cơ hội content từ testimonials, case studies, và before/after cases
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue="new">
            <TabsList>
              <TabsTrigger value="new">
                New ({contentOpportunities.filter((o) => o.status === "new").length})
              </TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-3 mt-4">
              {contentOpportunities
                .filter((o) => o.status === "new")
                .map(renderOpportunityCard)}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-3 mt-4">
              {contentOpportunities
                .filter((o) => o.status === "accepted")
                .map(renderOpportunityCard)}
            </TabsContent>

            <TabsContent value="all" className="space-y-3 mt-4">
              {contentOpportunities.map(renderOpportunityCard)}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Requests</CardTitle>
              <p className="text-sm text-muted-foreground">
                Yêu cầu tạo content, design, video từ các bộ phận khác trong tổ chức
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue="new">
            <TabsList>
              <TabsTrigger value="new">
                New ({taskRequests.filter((r) => r.status === "new").length})
              </TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-3 mt-4">
              {taskRequests
                .filter((r) => r.status === "new")
                .map(renderTaskCard)}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-3 mt-4">
              {taskRequests
                .filter((r) => r.status === "accepted")
                .map(renderTaskCard)}
            </TabsContent>

            <TabsContent value="all" className="space-y-3 mt-4">
              {taskRequests.map(renderTaskCard)}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
