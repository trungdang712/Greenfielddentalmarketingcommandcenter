import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Camera,
  FileText,
  Inbox as InboxIcon,
  X,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Image as ImageIcon,
  Video,
  Download,
  Send,
  MessageCircle,
  Clock,
  CheckSquare,
  FileCheck,
  Sparkles,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

export function Inbox() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const contentOpportunities = [
    {
      id: 1,
      type: "testimonial",
      title: "Patient testimonial - Implant success",
      from: "Sales Team (Nguyễn Văn C)",
      fromEmail: "vanc@greenfielddental.vn",
      date: "Jan 5, 2024",
      priority: "hot",
      consentStatus: "obtained",
      description:
        "Bệnh nhân rất hài lòng sau khi cấy ghép implant, đồng ý quay video testimonial và chụp ảnh before/after.",
      status: "new",
      // Extended details
      patientInfo: {
        name: "Nguyễn Thị Lan Anh (Patient ID: PT-12458)",
        age: 42,
        treatment: "Implant - Răng hàm số 6",
        startDate: "Sept 15, 2024",
        completedDate: "Dec 20, 2024",
        doctor: "BS. Nguyễn Minh Tuấn",
        satisfaction: 5,
      },
      consentDetails: {
        signedDate: "Dec 22, 2024",
        signedBy: "Nguyễn Thị Lan Anh",
        consentForm: "Consent-Form-PT12458.pdf",
        allowedUsage: ["Social Media", "Website", "Print Materials", "Video Marketing"],
        expiryDate: "Dec 22, 2026",
      },
      mediaAttached: {
        photos: 6,
        videos: 1,
        documents: 2,
      },
      suggestedContent: [
        "Facebook post với before/after photos",
        "Instagram Reel với video testimonial",
        "Case study cho website",
        "Success story email campaign",
      ],
      estimatedReach: "8,000 - 12,000",
      contentValue: "High - Direct patient testimonial with strong results",
      timeline: [
        { date: "Jan 5, 10:30 AM", event: "Opportunity submitted", user: "Nguyễn Văn C" },
        { date: "Jan 5, 11:15 AM", event: "Consent verified", user: "System" },
        { date: "Jan 5, 2:20 PM", event: "Photos uploaded", user: "Nguyễn Văn C" },
      ],
    },
    {
      id: 2,
      type: "before-after",
      title: "Before/After case - Teeth whitening",
      from: "Nurse Team (Trần Thị D)",
      fromEmail: "trand@greenfielddental.vn",
      date: "Jan 4, 2024",
      priority: "normal",
      consentStatus: "pending",
      description:
        "Case tẩy trắng răng có kết quả rất tốt, đã có ảnh before/after. Đang chờ xác nhận consent từ bệnh nhân.",
      status: "new",
      patientInfo: {
        name: "Lê Văn Minh (Patient ID: PT-12461)",
        age: 28,
        treatment: "Tẩy trắng răng Zoom",
        startDate: "Jan 2, 2024",
        completedDate: "Jan 2, 2024",
        doctor: "BS. Phạm Thu Hà",
        satisfaction: 4.5,
      },
      consentDetails: {
        signedDate: null,
        signedBy: null,
        consentForm: "Pending signature",
        allowedUsage: [],
        expiryDate: null,
      },
      mediaAttached: {
        photos: 4,
        videos: 0,
        documents: 1,
      },
      suggestedContent: [
        "Before/After social media post",
        "Instagram Stories highlight",
        "Zoom whitening promotion",
      ],
      estimatedReach: "5,000 - 8,000",
      contentValue: "Medium - Good visual results, pending consent",
      timeline: [
        { date: "Jan 4, 9:15 AM", event: "Opportunity submitted", user: "Trần Thị D" },
        { date: "Jan 4, 9:30 AM", event: "Consent request sent to patient", user: "System" },
      ],
    },
    {
      id: 3,
      type: "case-study",
      title: "Orthodontics case study",
      from: "Doctor (BS. Lê Văn E)",
      fromEmail: "drleevan@greenfielddental.vn",
      date: "Jan 3, 2024",
      priority: "normal",
      consentStatus: "obtained",
      description: "Case niềng răng hoàn thành sau 18 tháng với kết quả xuất sắc. Có đầy đủ hình ảnh quá trình.",
      status: "accepted",
      patientInfo: {
        name: "Phạm Minh Châu (Patient ID: PT-11890)",
        age: 19,
        treatment: "Niềng răng Invisalign",
        startDate: "July 2022",
        completedDate: "Dec 2024",
        doctor: "BS. Lê Văn E",
        satisfaction: 5,
      },
      consentDetails: {
        signedDate: "Dec 28, 2024",
        signedBy: "Phạm Minh Châu",
        consentForm: "Consent-Form-PT11890.pdf",
        allowedUsage: ["Social Media", "Website", "Case Studies", "Educational Materials"],
        expiryDate: "Dec 28, 2027",
      },
      mediaAttached: {
        photos: 24,
        videos: 2,
        documents: 3,
      },
      suggestedContent: [
        "Full case study for website",
        "Before/After transformation post",
        "Patient journey video",
        "Invisalign success story",
      ],
      estimatedReach: "12,000 - 18,000",
      contentValue: "Very High - Long-term transformation with excellent documentation",
      timeline: [
        { date: "Jan 3, 2:00 PM", event: "Opportunity submitted", user: "BS. Lê Văn E" },
        { date: "Jan 3, 2:15 PM", event: "Consent verified", user: "System" },
        { date: "Jan 3, 3:45 PM", event: "Accepted by Marketing", user: "Marketing Team" },
        { date: "Jan 3, 4:20 PM", event: "Task created", user: "System" },
      ],
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
      description:
        "Viết nội dung Q&A về dịch vụ tẩy trắng răng cho trang web, dựa trên các câu hỏi thường gặp từ khách hàng.",
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

  const handleViewDetails = (id: number) => {
    setSelectedOpportunity(id);
  };

  const handleCloseDetails = () => {
    setSelectedOpportunity(null);
    setComment("");
  };

  const handleAccept = () => {
    console.log("Accepted opportunity:", selectedOpportunity);
    handleCloseDetails();
  };

  const handleDecline = () => {
    console.log("Declined opportunity:", selectedOpportunity);
    handleCloseDetails();
  };

  const handleSendComment = () => {
    console.log("Comment sent:", comment);
    setComment("");
  };

  const selectedOpp = contentOpportunities.find((o) => o.id === selectedOpportunity);

  const renderOpportunityCard = (opportunity: (typeof contentOpportunities)[0]) => (
    <Card key={opportunity.id} className={opportunity.status === "new" ? "border-l-4 border-l-primary" : ""}>
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {opportunity.priority === "hot" && <div className="text-destructive">{getTypeIcon(opportunity.type)}</div>}
              {opportunity.priority !== "hot" && <div className="text-primary">{getTypeIcon(opportunity.type)}</div>}
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
              <Button size="sm" onClick={() => handleViewDetails(opportunity.id)}>
                View Details
              </Button>
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

  const renderTaskCard = (request: (typeof taskRequests)[0]) => (
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
              <TabsTrigger value="new">New ({contentOpportunities.filter((o) => o.status === "new").length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-3 mt-4">
              {contentOpportunities.filter((o) => o.status === "new").map(renderOpportunityCard)}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-3 mt-4">
              {contentOpportunities.filter((o) => o.status === "accepted").map(renderOpportunityCard)}
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
              <TabsTrigger value="new">New ({taskRequests.filter((r) => r.status === "new").length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-3 mt-4">
              {taskRequests.filter((r) => r.status === "new").map(renderTaskCard)}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-3 mt-4">
              {taskRequests.filter((r) => r.status === "accepted").map(renderTaskCard)}
            </TabsContent>

            <TabsContent value="all" className="space-y-3 mt-4">
              {taskRequests.map(renderTaskCard)}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Detailed View Modal/Overlay */}
      {selectedOpp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b flex items-start justify-between bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {selectedOpp.priority === "hot" && (
                    <Badge variant="destructive">
                      🔥 HOT
                    </Badge>
                  )}
                  <Badge variant="outline">{getTypeLabel(selectedOpp.type)}</Badge>
                  {selectedOpp.consentStatus === "obtained" && (
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Consent Obtained
                    </Badge>
                  )}
                  {selectedOpp.consentStatus === "pending" && (
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      Consent Pending
                    </Badge>
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-1">{selectedOpp.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedOpp.from}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedOpp.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {selectedOpp.fromEmail}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCloseDetails}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content - Left 2/3 */}
                <div className="md:col-span-2 space-y-6">
                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedOpp.description}</p>
                    </CardContent>
                  </Card>

                  {/* Patient Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Patient Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Patient Name</p>
                          <p className="font-medium">{selectedOpp.patientInfo.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Age</p>
                          <p className="font-medium">{selectedOpp.patientInfo.age} years old</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Treatment</p>
                          <p className="font-medium">{selectedOpp.patientInfo.treatment}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Attending Doctor</p>
                          <p className="font-medium">{selectedOpp.patientInfo.doctor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Treatment Period</p>
                          <p className="font-medium">
                            {selectedOpp.patientInfo.startDate} - {selectedOpp.patientInfo.completedDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Satisfaction Rating</p>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{selectedOpp.patientInfo.satisfaction}</span>
                            <span className="text-amber-400">★</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Consent Details */}
                  <Card className={selectedOpp.consentStatus === "obtained" ? "border-2 border-green-200" : "border-2 border-orange-200"}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileCheck className="w-5 h-5" />
                        Consent Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedOpp.consentStatus === "obtained" ? (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Signed By</p>
                              <p className="font-medium">{selectedOpp.consentDetails.signedBy}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Signed Date</p>
                              <p className="font-medium">{selectedOpp.consentDetails.signedDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Consent Form</p>
                              <Button variant="link" className="h-auto p-0 text-sm">
                                <Download className="w-3 h-3 mr-1" />
                                {selectedOpp.consentDetails.consentForm}
                              </Button>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Valid Until</p>
                              <p className="font-medium">{selectedOpp.consentDetails.expiryDate}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Allowed Usage</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedOpp.consentDetails.allowedUsage.map((usage, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  <CheckSquare className="w-3 h-3 mr-1" />
                                  {usage}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                          <p className="font-medium mb-1">Consent Pending</p>
                          <p className="text-sm text-muted-foreground">
                            Đang chờ bệnh nhân ký consent form. Email đã được gửi.
                          </p>
                          <Button variant="outline" size="sm" className="mt-3">
                            Resend Consent Request
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Media Attached */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        Media Attached
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <ImageIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold">{selectedOpp.mediaAttached.photos}</p>
                          <p className="text-xs text-muted-foreground">Photos</p>
                          <Button variant="link" size="sm" className="mt-2 p-0 h-auto text-xs">
                            View All
                          </Button>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <Video className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold">{selectedOpp.mediaAttached.videos}</p>
                          <p className="text-xs text-muted-foreground">Videos</p>
                          <Button variant="link" size="sm" className="mt-2 p-0 h-auto text-xs">
                            View All
                          </Button>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold">{selectedOpp.mediaAttached.documents}</p>
                          <p className="text-xs text-muted-foreground">Documents</p>
                          <Button variant="link" size="sm" className="mt-2 p-0 h-auto text-xs">
                            View All
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                          >
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedOpp.timeline.map((item, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.event}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{item.date}</span>
                                <span>•</span>
                                <span>{item.user}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comments */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Comments & Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Add a comment or ask a question..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={3}
                        />
                        <Button size="sm" onClick={handleSendComment}>
                          <Send className="w-4 h-4 mr-2" />
                          Send Comment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar - Right 1/3 */}
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardHeader>
                      <CardTitle className="text-lg">Content Value</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Estimated Reach</p>
                        <p className="text-xl font-bold text-primary">{selectedOpp.estimatedReach}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Content Value</p>
                        <p className="text-sm font-medium">{selectedOpp.contentValue}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Suggested Content */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Content Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedOpp.suggestedContent.map((content, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{content}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full gap-2" onClick={handleAccept}>
                        <CheckCircle className="w-4 h-4" />
                        Accept & Create Task
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Request More Info
                      </Button>
                      <Button variant="outline" className="w-full gap-2" onClick={handleDecline}>
                        <XCircle className="w-4 h-4" />
                        Decline
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
