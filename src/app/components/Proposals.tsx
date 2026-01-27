import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Plus, Clock, CheckCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Progress } from "@/app/components/ui/progress";

interface ProposalsProps {
  view: string;
}

export function Proposals({ view }: ProposalsProps) {
  const proposals = [
    {
      id: 123,
      title: "Campaign: Valentine's Day 2024",
      category: "Campaign",
      priority: "High",
      submittedBy: "Nguyễn Văn A",
      submittedDate: "Jan 3",
      status: "under-review",
      currentStep: 2,
      totalSteps: 3,
      description: "Đề xuất chiến dịch quảng cáo Valentine 2024 trên các nền tảng Facebook, Zalo, TikTok với ngân sách 30,000,000 VND.",
    },
    {
      id: 122,
      title: "Content: Bài viết blog về niềng răng",
      category: "Content",
      priority: "Normal",
      submittedBy: "Trần Văn B",
      submittedDate: "Jan 2",
      status: "approved",
      currentStep: 3,
      totalSteps: 3,
      approvedDate: "Jan 4",
      description: "Bài viết chi tiết về các phương pháp niềng răng hiện đại.",
    },
    {
      id: 121,
      title: "Innovation: Sử dụng Reels cho testimonials",
      category: "Innovation",
      priority: "Normal",
      submittedBy: "Lê Thị C",
      submittedDate: "Jan 1",
      status: "under-review",
      currentStep: 1,
      totalSteps: 2,
      description: "Đề xuất thử nghiệm format Reels cho video testimonial của bệnh nhân.",
    },
    {
      id: 120,
      title: "Campaign: Khuyến mãi tháng 1",
      category: "Campaign",
      priority: "High",
      submittedBy: "Nguyễn Văn A",
      submittedDate: "Dec 28",
      status: "rejected",
      currentStep: 2,
      totalSteps: 3,
      rejectedDate: "Jan 2",
      reason: "Ngân sách chưa phù hợp với kế hoạch tài chính Q1",
    },
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under-review":
        return "secondary";
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
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

  const renderInnovationIdeas = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Innovation Ideas</h2>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Đề xuất ý tưởng mới
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {innovationIdeas.map((idea) => (
              <div key={idea.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{getViewTitle()}</h2>
          <p className="text-muted-foreground text-sm">Quản lý proposals và theo dõi trạng thái</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Tạo Proposal mới
        </Button>
      </div>

      <div className="space-y-3">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="hover:shadow-md transition-shadow">
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

                <p className="text-sm text-muted-foreground">{proposal.description}</p>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Submitted: {proposal.submittedDate}</span>
                  </div>
                  <Button variant="outline" size="sm">
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
    </div>
  );
}
