import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export function ContentCalendar() {
  const [currentMonth] = useState(new Date(2024, 0, 1)); // January 2024

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const contentItems: { [key: number]: Array<{ platform: string; title: string; status: string }> } = {
    3: [
      { platform: "FB", title: "Post khuyến mãi", status: "ready" },
      { platform: "FB", title: "Video testimonial", status: "ready" },
    ],
    5: [{ platform: "Zalo", title: "Chăm sóc răng", status: "in-production" }],
    8: [
      { platform: "FB", title: "Banner tháng 1", status: "in-production" },
      { platform: "Video", title: "Before/After", status: "review" },
    ],
    10: [{ platform: "Web", title: "Blog niềng răng", status: "ready" }],
    12: [{ platform: "FB", title: "Giới thiệu dịch vụ", status: "planned" }],
  };

  const platformColors: { [key: string]: string } = {
    FB: "bg-blue-500",
    Zalo: "bg-blue-600",
    TikTok: "bg-black",
    Instagram: "bg-pink-500",
    Web: "bg-yellow-500",
    Video: "bg-red-500",
  };

  const statusColors: { [key: string]: string } = {
    planned: "border-gray-300",
    "in-production": "border-yellow-500",
    review: "border-orange-500",
    ready: "border-green-500",
    published: "bg-blue-50",
  };

  const getDaysArray = () => {
    const days = [];
    const startPadding = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Add empty cells for padding
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Content Calendar</h1>
          <p className="text-muted-foreground">Lịch xuất bản nội dung</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Thêm nội dung
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-xl font-semibold">Tháng 1 2024</span>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Tháng
            </Button>
            <Button variant="ghost" size="sm">
              Tuần
            </Button>
            <Button variant="ghost" size="sm">
              Ngày
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Facebook</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <span>Zalo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-black" />
              <span>TikTok</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Website</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Video</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="border rounded-lg overflow-hidden">
            {/* Week Day Headers */}
            <div className="grid grid-cols-7 bg-muted">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-medium border-r last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {getDaysArray().map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                    day ? "bg-card" : "bg-muted/30"
                  }`}
                >
                  {day && (
                    <>
                      <div className="text-sm font-medium mb-2">{day}</div>
                      <div className="space-y-1">
                        {contentItems[day]?.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className={`text-xs p-1.5 rounded border-l-2 ${statusColors[item.status]} bg-card hover:shadow-sm cursor-pointer transition-shadow`}
                          >
                            <div className="flex items-center gap-1 mb-0.5">
                              <div className={`w-2 h-2 rounded-full ${platformColors[item.platform]}`} />
                              <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                                {item.platform}
                              </Badge>
                            </div>
                            <div className="line-clamp-2">{item.title}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 border-l-2 border-gray-300 bg-white" />
              <span>Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 border-l-2 border-yellow-500 bg-white" />
              <span>In Production</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 border-l-2 border-orange-500 bg-white" />
              <span>Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 border-l-2 border-green-500 bg-white" />
              <span>Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 bg-blue-50" />
              <span>Published</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
