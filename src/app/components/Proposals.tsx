import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Plus, Clock, CheckCircle, XCircle, MessageSquare, ArrowRight, User, FileText, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Progress } from "@/app/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

interface Proposal {
  id: number;
  title: string;
  category: string;
  priority: "High" | "Normal" | "Low";
  submittedBy: string;
  submittedDate: string;
  status: "under-review" | "approved" | "rejected" | "draft";
  currentStep: number;
  totalSteps: number;
  description: string;
  budget?: string;
  timeline?: string;
  expectedOutcome?: string;
  approvedDate?: string;
  rejectedDate?: string;
  reason?: string;
}

interface Comment {
  id: string;
  user: string;
  role: string;
  text: string;
  timestamp: string;
  type: "comment" | "approval" | "rejection";
}

interface ProposalsProps {
  view: string;
}

export function Proposals({ view }: ProposalsProps) {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewProposalOpen, setIsNewProposalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject">("approve");
  const [approvalComment, setApprovalComment] = useState("");
  const [newComment, setNewComment] = useState("");

  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 123,
      title: "Campaign: Valentine's Day 2024",
      category: "Campaign",
      priority: "High",
      submittedBy: "Nguyễn Văn A",
      submittedDate: "Jan 3, 2024",
      status: "under-review",
      currentStep: 2,
      totalSteps: 3,
      description: "Đề xuất chiến dịch quảng cáo Valentine 2024 trên các nền tảng Facebook, Zalo, TikTok với ngân sách 30,000,000 VND.",
      budget: "30,000,000 VND",
      timeline: "Jan 20 - Feb 14, 2024",
      expectedOutcome: "Tăng 50% engagement, 200+ leads mới"
    },
    {
      id: 122,
      title: "Content: Bài viết blog về niềng răng",
      category: "Content",
      priority: "Normal",
      submittedBy: "Trần Văn B",
      submittedDate: "Jan 2, 2024",
      status: "approved",
      currentStep: 3,
      totalSteps: 3,
      approvedDate: "Jan 4, 2024",
      description: "Bài viết chi tiết về các phương pháp niềng răng hiện đại, SEO-optimized để tăng organic traffic.",
      timeline: "Jan 10 - Jan 15, 2024",
      expectedOutcome: "Tăng organic traffic 20%, tạo authority trong lĩnh vực niềng răng"
    },
    {
      id: 121,
      title: "Innovation: Sử dụng Reels cho testimonials",
      category: "Innovation",
      priority: "Normal",
      submittedBy: "Lê Thị C",
      submittedDate: "Jan 1, 2024",
      status: "under-review",
      currentStep: 1,
      totalSteps: 3,
      description: "Đề xuất thử nghiệm format Reels/Short-form video cho testimonial của bệnh nhân để tăng engagement.",
      budget: "5,000,000 VND",
      timeline: "Jan 8 - Jan 31, 2024",
      expectedOutcome: "Test với 5 videos, đánh giá engagement rate"
    },
    {
      id: 120,
      title: "Campaign: Khuyến mãi tháng 1",
      category: "Campaign",
      priority: "High",
      submittedBy: "Nguyễn Văn A",
      submittedDate: "Dec 28, 2023",
      status: "rejected",
      currentStep: 2,
      totalSteps: 3,
      rejectedDate: "Jan 2, 2024",
      reason: "Ngân sách chưa phù hợp với kế hoạch tài chính Q1. Đề xuất giảm xuống 15M hoặc dời sang Q2.",
      description: "Campaign khuyến mãi tháng 1 với ngân sách 25M VND",
      budget: "25,000,000 VND"
    },
    {
      id: 119,
      title: "Partnership: Hợp tác với KOL địa phương",
      category: "Partnership",
      priority: "High",
      submittedBy: "Phạm Văn D",
      submittedDate: "Dec 25, 2023",
      status: "approved",
      currentStep: 3,
      totalSteps: 3,
      approvedDate: "Dec 30, 2023",
      description: "Hợp tác với 3 KOL địa phương để review dịch vụ và tăng brand awareness",
      budget: "20,000,000 VND",
      timeline: "Jan 15 - Feb 15, 2024",
      expectedOutcome: "Reach 100K+ người, 50+ conversions"
    },
  ]);

  const innovationIdeas = [
    {
      id: 1,
      title: "Try Reels format for patient testimonials",
      category: "Content",
      submittedBy: "Lê Thị C",
      status: "implemented",
      impactScore: 8,
      pointsEarned: 50,
    },
    {
      id: 2,
      title: "Weekly dental tips series on TikTok",
      category: "Content",
      submittedBy: "Nguyễn Văn A",
      status: "reviewing",
      impactScore: null,
      pointsEarned: null,
    },
    {
      id: 3,
      title: "Partner with local influencers",
      category: "Partnership",
      submittedBy: "Trần Văn B",
      status: "approved",
      impactScore: null,
      pointsEarned: null,
    },
  ];

  // Mock comments for proposal detail
  const mockComments: Comment[] = [
    {
      id: "cm1",
      user: "Trần Văn B",
      role: "Content Lead",
      text: "Ý tưởng hay! Đã review nội dung và approve từ content team. Budget hợp lý.",
      timestamp: "Jan 3, 10:30 AM",
      type: "approval"
    },
    {
      id: "cm2",
      user: "Lê Thị C",
      role: "Marketing Manager",
      text: "Cần bổ sung thêm KPIs cụ thể và timeline chi tiết cho từng platform.",
      timestamp: "Jan 3, 2:15 PM",
      type: "comment"
    },
    {
      id: "cm3",
      user: "Nguyễn Văn A",
      role: "Content Creator",
      text: "Đã update timeline và KPIs theo góp ý. Mọi người check lại nhé!",
      timestamp: "Jan 3, 4:00 PM",
      type: "comment"
    },
  ];

  // Approval workflow stages
  const approvalStages = [
    { step: 1, name: "Content Review", role: "Content Lead" },
    { step: 2, name: "Manager Approval", role: "Marketing Manager" },
    { step: 3, name: "Admin Approval", role: "Admin" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under-review":
        return "secondary";
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      case "draft":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "under-review":
        return "Đang review";
      case "approved":
        return "Đã duyệt";
      case "rejected":
        return "Từ chối";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const getViewTitle = () => {
    switch (view) {
      case "/proposals/my":
        return "My Proposals";
      case "/proposals/pending":
        return "Pending Approval";
      case "/proposals/ideas":
        return "Innovation Ideas";
      default:
        return "Proposals";
    }
  };

  const getStatistics = () => {
    const total = proposals.length;
    const underReview = proposals.filter(p => p.status === "under-review").length;
    const approved = proposals.filter(p => p.status === "approved").length;
    const rejected = proposals.filter(p => p.status === "rejected").length;

    return { total, underReview, approved, rejected };
  };

  const stats = getStatistics();

  const handleProposalClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsDetailOpen(true);
  };

  const handleApprovalAction = (action: "approve" | "reject") => {
    setApprovalAction(action);
    setIsApprovalModalOpen(true);
  };

  const handleConvertToTask = () => {
    // Logic to convert proposal to task
    console.log("Converting proposal to task:", selectedProposal);
    // In real app, this would navigate to Task Management with pre-filled data
  };

  const renderInnovationIdeas = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Innovation Ideas</h2>
          <p className="text-muted-foreground text-sm">Đề xuất ý tưởng sáng tạo và nhận điểm thưởng</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Đề xuất ý tưởng mới
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {innovationIdeas.map((idea) => (
              <div key={idea.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">💡 {idea.title}</h3>
                      {idea.status === "implemented" && (
                        <CheckCircle className="w-5 h-5 text-success" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Badge variant="outline">{idea.category}</Badge>
                      <span>Submitted by: {idea.submittedBy}</span>
                    </div>
                  </div>
                  {idea.status === "implemented" && (
                    <div className="text-right">
                      <div className="text-sm font-medium">Impact Score: {idea.impactScore}/10</div>
                      <div className="text-sm text-success">+{idea.pointsEarned} points earned</div>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <Badge variant={idea.status === "implemented" ? "default" : "secondary"}>
                    {idea.status === "implemented" ? "✓ Implemented" : idea.status === "reviewing" ? "Reviewing" : "Approved"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Cách thức đề xuất ý tưởng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Đề xuất ý tưởng mới để cải thiện công việc marketing</p>
            <p>• Các ý tưởng được áp dụng sẽ nhận điểm thưởng dựa trên impact score</p>
            <p>• Impact score được đánh giá bởi team lead sau khi triển khai</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProposalsList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{getViewTitle()}</h1>
          <p className="text-muted-foreground text-sm">Quản lý proposals và theo dõi trạng thái phê duyệt</p>
        </div>
        <Button className="gap-2" onClick={() => setIsNewProposalOpen(true)}>
          <Plus className="w-4 h-4" />
          Tạo Proposal mới
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Proposals</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-2xl font-semibold">{stats.underReview}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-semibold">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-semibold">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {proposals.map((proposal) => (
          <Card 
            key={proposal.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleProposalClick(proposal)}
          >
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">#{proposal.id} | {proposal.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{proposal.category}</Badge>
                      <Badge variant={proposal.priority === "High" ? "destructive" : "secondary"}>
                        {proposal.priority}
                      </Badge>
                      <span className="text-sm text-muted-foreground">By: {proposal.submittedBy}</span>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(proposal.status)}>
                    {getStatusLabel(proposal.status)}
                  </Badge>
                </div>

                {proposal.status === "under-review" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Quy trình duyệt</span>
                      <span className="text-muted-foreground">
                        Step {proposal.currentStep}/{proposal.totalSteps}
                      </span>
                    </div>
                    <Progress value={(proposal.currentStep / proposal.totalSteps) * 100} className="h-2" />
                  </div>
                )}

                {proposal.status === "approved" && (
                  <div className="flex items-center gap-2 text-success text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Approved on {proposal.approvedDate}</span>
                  </div>
                )}

                {proposal.status === "rejected" && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <XCircle className="w-4 h-4" />
                      <span>Rejected on {proposal.rejectedDate}</span>
                    </div>
                    {proposal.reason && (
                      <p className="text-sm text-muted-foreground pl-6">{proposal.reason}</p>
                    )}
                  </div>
                )}

                <p className="text-sm text-muted-foreground line-clamp-2">{proposal.description}</p>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Submitted: {proposal.submittedDate}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleProposalClick(proposal); }}>
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {view === "/proposals/ideas" ? renderInnovationIdeas() : renderProposalsList()}

      {/* Proposal Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProposal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">#{selectedProposal.id} | {selectedProposal.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant={getStatusColor(selectedProposal.status)} className="mt-2">
                    {getStatusLabel(selectedProposal.status)}
                  </Badge>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Proposal Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Category</Label>
                    <p className="mt-1">{selectedProposal.category}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Priority</Label>
                    <p className="mt-1">{selectedProposal.priority}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Submitted By</Label>
                    <p className="mt-1">{selectedProposal.submittedBy}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Submitted Date</Label>
                    <p className="mt-1">{selectedProposal.submittedDate}</p>
                  </div>
                  {selectedProposal.budget && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Budget</Label>
                      <p className="mt-1 font-medium">{selectedProposal.budget}</p>
                    </div>
                  )}
                  {selectedProposal.timeline && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Timeline</Label>
                      <p className="mt-1">{selectedProposal.timeline}</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <Label className="text-sm text-muted-foreground">Description</Label>
                  <p className="mt-2 text-sm">{selectedProposal.description}</p>
                </div>

                {selectedProposal.expectedOutcome && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Expected Outcome</Label>
                    <p className="mt-2 text-sm">{selectedProposal.expectedOutcome}</p>
                  </div>
                )}

                {/* Approval Workflow */}
                {selectedProposal.status === "under-review" && (
                  <div>
                    <Label className="text-sm text-muted-foreground mb-3 block">Approval Workflow</Label>
                    <div className="flex items-center gap-2">
                      {approvalStages.map((stage, index) => (
                        <div key={stage.step} className="flex items-center flex-1">
                          <div className={`flex-1 p-3 rounded border ${
                            selectedProposal.currentStep >= stage.step 
                              ? "border-primary bg-primary/10" 
                              : "border-border"
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                selectedProposal.currentStep >= stage.step 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-muted"
                              }`}>
                                {selectedProposal.currentStep > stage.step ? "✓" : stage.step}
                              </div>
                              <span className="text-sm font-medium">{stage.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-8">{stage.role}</p>
                          </div>
                          {index < approvalStages.length - 1 && (
                            <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments & Feedback */}
                <div>
                  <Label className="text-sm text-muted-foreground mb-3 block">
                    Comments & Feedback ({mockComments.length})
                  </Label>
                  <div className="space-y-4 mb-4">
                    {mockComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.user}</span>
                            <Badge variant="outline" className="text-xs">{comment.role}</Badge>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            {comment.type === "approval" && (
                              <CheckCircle className="w-4 h-4 text-success" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Comment */}
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Thêm comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button size="sm">
                      Gửi
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  {selectedProposal.status === "approved" && (
                    <Button variant="outline" onClick={handleConvertToTask} className="gap-2">
                      <FileText className="w-4 h-4" />
                      Convert to Task
                    </Button>
                  )}
                  {selectedProposal.status === "under-review" && (
                    <>
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => handleApprovalAction("reject")}
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                      <Button 
                        className="gap-2"
                        onClick={() => handleApprovalAction("approve")}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                    </>
                  )}
                </div>
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Đóng
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval/Rejection Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {approvalAction === "approve" ? "Approve Proposal" : "Reject Proposal"}
            </DialogTitle>
            <DialogDescription>
              {approvalAction === "approve" 
                ? "Xác nhận duyệt proposal này và chuyển sang bước tiếp theo"
                : "Từ chối proposal và cung cấp lý do"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Comment {approvalAction === "reject" && "*"}</Label>
              <Textarea 
                placeholder={approvalAction === "approve" ? "Thêm comment (optional)..." : "Lý do từ chối..."}
                value={approvalComment}
                onChange={(e) => setApprovalComment(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalModalOpen(false)}>
              Hủy
            </Button>
            <Button 
              variant={approvalAction === "approve" ? "default" : "destructive"}
              onClick={() => {
                setIsApprovalModalOpen(false);
                setApprovalComment("");
              }}
            >
              {approvalAction === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Proposal Modal */}
      <Dialog open={isNewProposalOpen} onOpenChange={setIsNewProposalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tạo Proposal mới</DialogTitle>
            <DialogDescription>Điền thông tin đầy đủ cho proposal của bạn</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Tiêu đề *</Label>
              <Input placeholder="Nhập tiêu đề proposal..." className="mt-1" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Campaign">Campaign</SelectItem>
                    <SelectItem value="Content">Content</SelectItem>
                    <SelectItem value="Innovation">Innovation</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Budget">Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Priority</Label>
                <Select defaultValue="Normal">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Mô tả *</Label>
              <Textarea 
                placeholder="Mô tả chi tiết về proposal..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Budget</Label>
                <Input placeholder="VD: 30,000,000 VND" className="mt-1" />
              </div>
              
              <div>
                <Label>Timeline</Label>
                <Input placeholder="VD: Jan 20 - Feb 14" className="mt-1" />
              </div>
            </div>

            <div>
              <Label>Expected Outcome</Label>
              <Textarea 
                placeholder="Kết quả mong đợi từ proposal này..."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewProposalOpen(false)}>
              Lưu Draft
            </Button>
            <Button onClick={() => setIsNewProposalOpen(false)}>
              Submit Proposal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
