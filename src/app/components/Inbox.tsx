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
  Mail,
  Image as ImageIcon,
  Video,
  Download,
  Clock,
  CheckSquare,
  FileCheck,
  Sparkles,
  ArrowRight,
  BarChart3,
  Lightbulb,
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";

interface ContentOpportunity {
  id: number;
  type: string;
  title: string;
  from: string;
  fromEmail: string;
  date: string;
  priority: string;
  consentStatus: string;
  description: string;
  status: string;
  patientInfo: any;
  consentDetails: any;
  mediaAttached: any;
  suggestedContent: string[];
  estimatedReach: string;
  contentValue: string;
}

export function Inbox() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<ContentOpportunity | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [convertType, setConvertType] = useState<"task" | "proposal">("task");
  const [comment, setComment] = useState("");

  const [contentOpportunities, setContentOpportunities] = useState<ContentOpportunity[]>([
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
    },
  ]);

  const getTypeIcon = (type: string) => {
    return <Camera className="w-5 h-5" />;
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      testimonial: "Testimonial",
      "before-after": "Before/After",
      "case-study": "Case Study",
    };
    return labels[type] || type;
  };

  const handleOpenDetail = (opportunity: ContentOpportunity) => {
    setSelectedOpportunity(opportunity);
    setIsDetailOpen(true);
  };

  const handleAccept = () => {
    if (selectedOpportunity) {
      setContentOpportunities(prev =>
        prev.map(opp => opp.id === selectedOpportunity.id ? { ...opp, status: "accepted" } : opp)
      );
      setIsDetailOpen(false);
    }
  };

  const handleDecline = () => {
    if (selectedOpportunity) {
      setContentOpportunities(prev =>
        prev.map(opp => opp.id === selectedOpportunity.id ? { ...opp, status: "declined" } : opp)
      );
      setIsDetailOpen(false);
    }
  };

  const handleConvert = (type: "task" | "proposal") => {
    setConvertType(type);
    setIsConvertModalOpen(true);
  };

  const getStatistics = () => {
    const newOpp = contentOpportunities.filter(o => o.status === "new").length;
    const accepted = contentOpportunities.filter(o => o.status === "accepted").length;
    const withConsent = contentOpportunities.filter(o => o.consentStatus === "obtained").length;
    const highValue = contentOpportunities.filter(o => o.contentValue.startsWith("High") || o.contentValue.startsWith("Very High")).length;

    return { newOpp, accepted, withConsent, highValue };
  };

  const stats = getStatistics();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-1">Inbox</h1>
        <p className="text-muted-foreground">Content opportunities từ các bộ phận trong tổ chức</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Opportunities</p>
                <p className="text-2xl font-semibold">{stats.newOpp}</p>
              </div>
              <InboxIcon className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-2xl font-semibold">{stats.accepted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">With Consent</p>
                <p className="text-2xl font-semibold">{stats.withConsent}</p>
              </div>
              <FileCheck className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Value</p>
                <p className="text-2xl font-semibold">{stats.highValue}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities List */}
      <Tabs defaultValue="new">
        <TabsList>
          <TabsTrigger value="new">
            New ({contentOpportunities.filter(o => o.status === "new").length})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted ({contentOpportunities.filter(o => o.status === "accepted").length})
          </TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-3 mt-4">
          {contentOpportunities
            .filter(o => o.status === "new")
            .map((opportunity) => (
              <Card
                key={opportunity.id}
                className="border-l-4 border-l-primary cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpenDetail(opportunity)}
              >
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={opportunity.priority === "hot" ? "text-destructive" : "text-primary"}>
                          {getTypeIcon(opportunity.type)}
                        </div>
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
                          <p className="text-sm line-clamp-2">{opportunity.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {opportunity.consentStatus === "obtained" && (
                          <Badge variant="default" className="text-xs">
                            ✓ Consent
                          </Badge>
                        )}
                        {opportunity.consentStatus === "pending" && (
                          <Badge variant="secondary" className="text-xs">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(opportunity);
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOpportunity(opportunity);
                          handleAccept();
                        }}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOpportunity(opportunity);
                          handleDecline();
                        }}
                      >
                        <XCircle className="w-4 h-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-3 mt-4">
          {contentOpportunities
            .filter(o => o.status === "accepted")
            .map((opportunity) => (
              <Card
                key={opportunity.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleOpenDetail(opportunity)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-primary">{getTypeIcon(opportunity.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(opportunity.type)}
                          </Badge>
                          <Badge variant="default" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Accepted
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-1">{opportunity.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>From: {opportunity.from}</span>
                          <span>•</span>
                          <span>{opportunity.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-3 mt-4">
          {contentOpportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleOpenDetail(opportunity)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-primary">{getTypeIcon(opportunity.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(opportunity.type)}
                        </Badge>
                        <Badge variant={opportunity.status === "new" ? "secondary" : "default"} className="text-xs">
                          {opportunity.status}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-1">{opportunity.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>From: {opportunity.from}</span>
                        <span>•</span>
                        <span>{opportunity.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedOpportunity && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  {selectedOpportunity.priority === "hot" && (
                    <Badge variant="destructive">🔥 HOT</Badge>
                  )}
                  <Badge variant="outline">{getTypeLabel(selectedOpportunity.type)}</Badge>
                  {selectedOpportunity.consentStatus === "obtained" && (
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Consent Obtained
                    </Badge>
                  )}
                </div>
                <DialogTitle className="text-xl">{selectedOpportunity.title}</DialogTitle>
                <DialogDescription>
                  From: {selectedOpportunity.from} • {selectedOpportunity.date}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="col-span-2 space-y-4">
                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedOpportunity.description}</p>
                    </CardContent>
                  </Card>

                  {/* Patient Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Patient Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Patient</p>
                          <p className="font-medium">{selectedOpportunity.patientInfo.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Treatment</p>
                          <p className="font-medium">{selectedOpportunity.patientInfo.treatment}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Doctor</p>
                          <p className="font-medium">{selectedOpportunity.patientInfo.doctor}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Satisfaction</p>
                          <p className="font-medium">{selectedOpportunity.patientInfo.satisfaction} ★</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Consent Details */}
                  <Card className={selectedOpportunity.consentStatus === "obtained" ? "border-success" : "border-warning"}>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <FileCheck className="w-4 h-4" />
                        Consent Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedOpportunity.consentStatus === "obtained" ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Signed By</p>
                              <p className="font-medium">{selectedOpportunity.consentDetails.signedBy}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Date</p>
                              <p className="font-medium">{selectedOpportunity.consentDetails.signedDate}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Allowed Usage:</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedOpportunity.consentDetails.allowedUsage.map((usage: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {usage}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <AlertCircle className="w-10 h-10 text-warning mx-auto mb-2" />
                          <p className="font-medium">Consent Pending</p>
                          <p className="text-sm text-muted-foreground">Đang chờ bệnh nhân ký consent</p>
                          <Button size="sm" variant="outline" className="mt-3">
                            Send Reminder
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Media */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Media Attached</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 border rounded">
                          <ImageIcon className="w-6 h-6 mx-auto mb-1 text-primary" />
                          <p className="text-xl font-bold">{selectedOpportunity.mediaAttached.photos}</p>
                          <p className="text-xs text-muted-foreground">Photos</p>
                        </div>
                        <div className="text-center p-3 border rounded">
                          <Video className="w-6 h-6 mx-auto mb-1 text-primary" />
                          <p className="text-xl font-bold">{selectedOpportunity.mediaAttached.videos}</p>
                          <p className="text-xs text-muted-foreground">Videos</p>
                        </div>
                        <div className="text-center p-3 border rounded">
                          <FileText className="w-6 h-6 mx-auto mb-1 text-primary" />
                          <p className="text-xl font-bold">{selectedOpportunity.mediaAttached.documents}</p>
                          <p className="text-xs text-muted-foreground">Docs</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - AI Suggestions */}
                <div className="space-y-4">
                  <Card className="border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        AI Content Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedOpportunity.suggestedContent.map((suggestion, i) => (
                          <div key={i} className="p-2 bg-primary/5 rounded text-xs flex items-start gap-2">
                            <Lightbulb className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Est. Reach</p>
                        <p className="font-medium">{selectedOpportunity.estimatedReach}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Content Value</p>
                        <p className="font-medium">{selectedOpportunity.contentValue}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedOpportunity.status === "accepted" && (
                    <Card className="border-success/30">
                      <CardHeader>
                        <CardTitle className="text-base">Convert to</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                          onClick={() => handleConvert("task")}
                        >
                          <CheckSquare className="w-4 h-4" />
                          Create Task
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-2"
                          onClick={() => handleConvert("proposal")}
                        >
                          <FileText className="w-4 h-4" />
                          Create Proposal
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                {selectedOpportunity.status === "new" && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleDecline} className="gap-2">
                      <XCircle className="w-4 h-4" />
                      Decline
                    </Button>
                    <Button onClick={handleAccept} className="gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </Button>
                  </div>
                )}
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Convert Modal */}
      <Dialog open={isConvertModalOpen} onOpenChange={setIsConvertModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {convertType === "task" ? "Convert to Task" : "Convert to Proposal"}
            </DialogTitle>
            <DialogDescription>
              Pre-fill information from this opportunity
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                defaultValue={selectedOpportunity?.title}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                defaultValue={selectedOpportunity?.description}
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Assignee</Label>
                <Input placeholder="Chọn người phụ trách..." className="mt-1" />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input type="date" className="mt-1" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConvertModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsConvertModalOpen(false)}>
              {convertType === "task" ? "Create Task" : "Create Proposal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
