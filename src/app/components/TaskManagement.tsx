import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { 
  Plus, 
  Paperclip, 
  MessageSquare, 
  Calendar as CalendarIcon, 
  User,
  Filter,
  X,
  Send,
  Download,
  Image as ImageIcon,
  FileText,
  BarChart3,
  CheckCircle2,
  Clock
} from "lucide-react";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "urgent" | "high" | "normal" | "low";
  assignee: string;
  dueDate: string;
  attachments: number;
  comments: number;
  tags?: string[];
  status: "todo" | "in-progress" | "review" | "done";
}

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onClick?: () => void;
}

function TaskCard({ task, isDragging, onClick }: TaskCardProps) {
  const priorityColors: { [key: string]: string } = {
    urgent: "bg-destructive",
    high: "bg-orange-500",
    normal: "bg-yellow-500",
    low: "bg-blue-500",
  };

  const priorityLabels: { [key: string]: string } = {
    urgent: "🔴 Khẩn cấp",
    high: "🟠 Cao",
    normal: "🟡 Bình thường",
    low: "🔵 Thấp",
  };

  return (
    <Card 
      className={`mb-3 cursor-pointer hover:shadow-md transition-shadow ${isDragging ? "opacity-50" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Badge variant="secondary" className="text-xs">
              {priorityLabels[task.priority]}
            </Badge>
          </div>
          <div>
            <h4 className="font-medium mb-1">{task.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
          </div>
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="text-xs">{task.assignee}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-xs">{task.dueDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {task.attachments > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip className="w-4 h-4" />
                  <span className="text-xs">{task.attachments}</span>
                </div>
              )}
              {task.comments > 0 && (
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs">{task.comments}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface SortableTaskCardProps {
  task: Task;
  onClick?: () => void;
}

function SortableTaskCard({ task, onClick }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} isDragging={isDragging} onClick={onClick} />
    </div>
  );
}

interface KanbanColumnProps {
  title: string;
  count: number;
  status: string;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

function KanbanColumn({ title, count, status, tasks, onTaskClick }: KanbanColumnProps) {
  return (
    <div className="flex-1 min-w-[280px]">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>{title}</span>
            <Badge variant="secondary">{count}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <SortableTaskCard 
                key={task.id} 
                task={task} 
                onClick={() => onTaskClick?.(task)}
              />
            ))}
          </SortableContext>
          {tasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Không có task nào
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function TaskManagement({ view }: { view: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  // Filter states
  const [filterAssignee, setFilterAssignee] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterTags, setFilterTags] = useState<string>("all");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Thiết kế banner Facebook",
      description: "Thiết kế banner quảng cáo cho chiến dịch tháng 1",
      priority: "urgent",
      assignee: "Trần Văn B",
      dueDate: "Jan 5",
      attachments: 2,
      comments: 3,
      tags: ["Design", "Facebook"],
      status: "todo",
    },
    {
      id: "2",
      title: "Viết caption bài đăng",
      description: "Viết nội dung cho bài đăng về dịch vụ tẩy trắng răng",
      priority: "normal",
      assignee: "Nguyễn Văn A",
      dueDate: "Jan 6",
      attachments: 0,
      comments: 1,
      tags: ["Content", "Facebook"],
      status: "todo",
    },
    {
      id: "3",
      title: "Design poster sự kiện",
      description: "Thiết kế poster cho sự kiện khách hàng thân thiết",
      priority: "high",
      assignee: "Trần Văn B",
      dueDate: "Jan 7",
      attachments: 1,
      comments: 0,
      tags: ["Design", "Event"],
      status: "in-progress",
    },
    {
      id: "4",
      title: "Review blog post",
      description: "Kiểm tra và chỉnh sửa bài blog về niềng răng",
      priority: "normal",
      assignee: "Lê Thị C",
      dueDate: "Jan 6",
      attachments: 1,
      comments: 2,
      tags: ["Content", "Blog"],
      status: "review",
    },
    {
      id: "5",
      title: "Export video edited",
      description: "Export video testimonial bệnh nhân sau khi chỉnh sửa",
      priority: "high",
      assignee: "Nguyễn Văn D",
      dueDate: "Jan 8",
      attachments: 0,
      comments: 1,
      tags: ["Video"],
      status: "in-progress",
    },
    {
      id: "6",
      title: "Tạo landing page",
      description: "Thiết kế landing page cho campaign Valentine",
      priority: "normal",
      assignee: "Phạm Văn E",
      dueDate: "Jan 10",
      attachments: 3,
      comments: 5,
      tags: ["Development", "Campaign"],
      status: "done",
    },
    {
      id: "7",
      title: "Chụp ảnh sản phẩm",
      description: "Chụp ảnh sản phẩm mới cho website",
      priority: "low",
      assignee: "Hoàng Thị F",
      dueDate: "Jan 12",
      attachments: 0,
      comments: 0,
      tags: ["Photography"],
      status: "todo",
    },
    {
      id: "8",
      title: "Optimize Google Ads",
      description: "Tối ưu hóa chiến dịch Google Ads cho từ khóa niềng răng",
      priority: "urgent",
      assignee: "Lê Thị C",
      dueDate: "Jan 5",
      attachments: 2,
      comments: 4,
      tags: ["Digital Marketing", "Ads"],
      status: "in-progress",
    },
  ]);

  // Mock comments for task detail
  const mockComments: Comment[] = [
    {
      id: "c1",
      user: "Nguyễn Văn A",
      text: "Đã upload file tham khảo vào attachments",
      timestamp: "2 giờ trước",
    },
    {
      id: "c2",
      user: "Trần Văn B",
      text: "Cần thêm thông tin về màu sắc và phong cách",
      timestamp: "1 giờ trước",
    },
    {
      id: "c3",
      user: "Lê Thị C",
      text: "Đã cập nhật brief, mọi người check lại nhé",
      timestamp: "30 phút trước",
    },
  ];

  // Apply filters
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      if (filterAssignee !== "all" && task.assignee !== filterAssignee) return false;
      if (filterPriority !== "all" && task.priority !== filterPriority) return false;
      if (filterTags !== "all" && (!task.tags || !task.tags.includes(filterTags))) return false;
      return true;
    });
  };

  const filteredTasks = getFilteredTasks();
  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "in-progress");
  const reviewTasks = filteredTasks.filter((t) => t.status === "review");
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  // Get unique assignees and tags for filters
  const uniqueAssignees = Array.from(new Set(tasks.map(t => t.assignee)));
  const uniqueTags = Array.from(new Set(tasks.flatMap(t => t.tags || [])));

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Determine the new status based on the column
      const overTask = tasks.find(t => t.id === over.id);
      if (overTask) {
        // Update task status
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === active.id 
              ? { ...task, status: overTask.status }
              : task
          )
        );
      }
    }
    
    setActiveId(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const getViewTitle = () => {
    switch (view) {
      case "/tasks/my":
        return "My Tasks";
      case "/tasks/team":
        return "Team Tasks";
      default:
        return "Tasks";
    }
  };

  const activeFiltersCount = [filterAssignee, filterPriority, filterTags].filter(f => f !== "all").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header with Statistics */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">{getViewTitle()}</h1>
          <p className="text-muted-foreground">Quản lý và theo dõi công việc</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">{activeFiltersCount}</Badge>
            )}
          </Button>
          <Button className="gap-2" onClick={() => setIsNewTaskOpen(true)}>
            <Plus className="w-4 h-4" />
            Tạo Task mới
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-semibold">{filteredTasks.length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-semibold">{inProgressTasks.length}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Review</p>
                <p className="text-2xl font-semibold">{reviewTasks.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-semibold">{doneTasks.length}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label className="text-sm mb-2 block">Assignee</Label>
                <Select value={filterAssignee} onValueChange={setFilterAssignee}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {uniqueAssignees.map(assignee => (
                      <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="text-sm mb-2 block">Priority</Label>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="urgent">🔴 Khẩn cấp</SelectItem>
                    <SelectItem value="high">🟠 Cao</SelectItem>
                    <SelectItem value="normal">🟡 Bình thường</SelectItem>
                    <SelectItem value="low">🔵 Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="text-sm mb-2 block">Tags</Label>
                <Select value={filterTags} onValueChange={setFilterTags}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {uniqueTags.map(tag => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setFilterAssignee("all");
                    setFilterPriority("all");
                    setFilterTags("all");
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="list">Danh sách</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-4 overflow-x-auto pb-4">
              <KanbanColumn
                title="TO DO"
                count={todoTasks.length}
                status="todo"
                tasks={todoTasks}
                onTaskClick={handleTaskClick}
              />
              <KanbanColumn
                title="IN PROGRESS"
                count={inProgressTasks.length}
                status="in-progress"
                tasks={inProgressTasks}
                onTaskClick={handleTaskClick}
              />
              <KanbanColumn
                title="REVIEW"
                count={reviewTasks.length}
                status="review"
                tasks={reviewTasks}
                onTaskClick={handleTaskClick}
              />
              <KanbanColumn
                title="DONE"
                count={doneTasks.length}
                status="done"
                tasks={doneTasks}
                onTaskClick={handleTaskClick}
              />
            </div>

            <DragOverlay>
              {activeId ? (
                <TaskCard task={tasks.find((t) => t.id === activeId)!} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border-b last:border-0 pb-3 last:pb-0">
                    <TaskCard task={task} onClick={() => handleTaskClick(task)} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Task Detail Modal */}
      <Dialog open={isTaskDetailOpen} onOpenChange={setIsTaskDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedTask.title}</DialogTitle>
                <DialogDescription>Task ID: #{selectedTask.id}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Task Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Status</Label>
                    <div className="mt-1">
                      <Select defaultValue={selectedTask.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">TO DO</SelectItem>
                          <SelectItem value="in-progress">IN PROGRESS</SelectItem>
                          <SelectItem value="review">REVIEW</SelectItem>
                          <SelectItem value="done">DONE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Priority</Label>
                    <div className="mt-1">
                      <Select defaultValue={selectedTask.priority}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">🔴 Khẩn cấp</SelectItem>
                          <SelectItem value="high">🟠 Cao</SelectItem>
                          <SelectItem value="normal">🟡 Bình thường</SelectItem>
                          <SelectItem value="low">🔵 Thấp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Assignee</Label>
                    <div className="mt-1">
                      <Select defaultValue={selectedTask.assignee}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueAssignees.map(assignee => (
                            <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Due Date</Label>
                    <Input type="text" defaultValue={selectedTask.dueDate} className="mt-1" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label className="text-sm text-muted-foreground">Description</Label>
                  <Textarea 
                    defaultValue={selectedTask.description}
                    rows={3}
                    className="mt-1"
                  />
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-sm text-muted-foreground">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTask.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                        <button className="ml-2 hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Tag
                    </Button>
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Attachments ({selectedTask.attachments})
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded border hover:bg-accent/50">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Design_Brief_v2.pdf</p>
                        <p className="text-xs text-muted-foreground">2.4 MB • Uploaded 2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded border hover:bg-accent/50">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Reference_Image.jpg</p>
                        <p className="text-xs text-muted-foreground">1.8 MB • Uploaded 1 hour ago</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <Label className="text-sm text-muted-foreground mb-3 block">
                    Comments ({mockComments.length})
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
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Comment */}
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Viết comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button size="sm" className="gap-2">
                      <Send className="w-4 h-4" />
                      Gửi
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTaskDetailOpen(false)}>
                  Đóng
                </Button>
                <Button>Lưu thay đổi</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* New Task Modal */}
      <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tạo Task mới</DialogTitle>
            <DialogDescription>Thêm task mới vào hệ thống quản lý công việc</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Tiêu đề *</Label>
              <Input placeholder="Nhập tiêu đề task..." className="mt-1" />
            </div>
            
            <div>
              <Label>Mô tả</Label>
              <Textarea 
                placeholder="Mô tả chi tiết về task..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Priority</Label>
                <Select defaultValue="normal">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">🔴 Khẩn cấp</SelectItem>
                    <SelectItem value="high">🟠 Cao</SelectItem>
                    <SelectItem value="normal">🟡 Bình thường</SelectItem>
                    <SelectItem value="low">🔵 Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Assignee</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn người làm..." />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueAssignees.map(assignee => (
                      <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Due Date</Label>
                <Input type="date" className="mt-1" />
              </div>
              
              <div>
                <Label>Tags</Label>
                <Input placeholder="Design, Content..." className="mt-1" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTaskOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsNewTaskOpen(false)}>
              Tạo Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}