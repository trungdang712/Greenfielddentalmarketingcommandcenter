import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Plus, Paperclip, MessageSquare, Calendar as CalendarIcon, User } from "lucide-react";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

function TaskCard({ task, isDragging }: TaskCardProps) {
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
    <Card className={`mb-3 cursor-move ${isDragging ? "opacity-50" : ""}`}>
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
}

function SortableTaskCard({ task }: SortableTaskCardProps) {
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
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
}

interface KanbanColumnProps {
  title: string;
  count: number;
  status: string;
  tasks: Task[];
}

function KanbanColumn({ title, count, status, tasks }: KanbanColumnProps) {
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
              <SortableTaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </div>
  );
}

export function TaskManagement({ view }: { view: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const myTasks: Task[] = [
    {
      id: "1",
      title: "Thiết kế banner Facebook",
      description: "Thiết kế banner quảng cáo cho chiến dịch tháng 1",
      priority: "urgent",
      assignee: "Tôi",
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
      assignee: "Tôi",
      dueDate: "Jan 6",
      attachments: 0,
      comments: 1,
      tags: ["Content"],
      status: "todo",
    },
    {
      id: "3",
      title: "Design poster sự kiện",
      description: "Thiết kế poster cho sự kiện khách hàng thân thiết",
      priority: "high",
      assignee: "Designer",
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
      assignee: "Manager",
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
      assignee: "Video Editor",
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
      assignee: "Developer",
      dueDate: "Jan 10",
      attachments: 3,
      comments: 5,
      tags: ["Development", "Campaign"],
      status: "done",
    },
  ];

  const todoTasks = myTasks.filter((t) => t.status === "todo");
  const inProgressTasks = myTasks.filter((t) => t.status === "in-progress");
  const reviewTasks = myTasks.filter((t) => t.status === "review");
  const doneTasks = myTasks.filter((t) => t.status === "done");

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    // Here you would handle the actual task status update
  };

  const getViewTitle = () => {
    switch (view) {
      case "/tasks/my":
        return "My Tasks";
      case "/tasks/team":
        return "Team Tasks";
      case "/tasks/requests":
        return "Task Requests";
      default:
        return "Tasks";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">{getViewTitle()}</h1>
          <p className="text-muted-foreground">Quản lý và theo dõi công việc</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Tạo Task mới
        </Button>
      </div>

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
              />
              <KanbanColumn
                title="IN PROGRESS"
                count={inProgressTasks.length}
                status="in-progress"
                tasks={inProgressTasks}
              />
              <KanbanColumn
                title="REVIEW"
                count={reviewTasks.length}
                status="review"
                tasks={reviewTasks}
              />
              <KanbanColumn
                title="DONE"
                count={doneTasks.length}
                status="done"
                tasks={doneTasks}
              />
            </div>

            <DragOverlay>
              {activeId ? (
                <TaskCard task={myTasks.find((t) => t.id === activeId)!} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                {myTasks.map((task) => (
                  <div key={task.id} className="border-b last:border-0 pb-3 last:pb-0">
                    <TaskCard task={task} />
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
