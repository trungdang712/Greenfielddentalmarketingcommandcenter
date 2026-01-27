import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";
import { AppHeader } from "@/app/components/AppHeader";
import { Dashboard } from "@/app/components/Dashboard";
import { MarketingAnalytics } from "@/app/components/MarketingAnalytics";
import { ContentCalendar } from "@/app/components/ContentCalendar";
import { TaskManagement } from "@/app/components/TaskManagement";
import { Proposals } from "@/app/components/Proposals";
import { Inbox as InboxView } from "@/app/components/Inbox";
import { Performance } from "@/app/components/Performance";
import { BrandLibrary } from "@/app/components/BrandLibrary";
import { SocialListening } from "@/app/components/SocialListening";
import { Toaster } from "@/app/components/ui/sonner";

export default function App() {
  const [activeView, setActiveView] = useState("/");
  const [currentUser] = useState({
    name: "Nguyễn Văn A",
    role: "Content Creator",
  });

  const renderView = () => {
    console.log("Active View:", activeView); // Debug log
    
    switch (activeView) {
      case "/":{
        return <Dashboard userName={currentUser.name} userRole={currentUser.role} />;
      }
      case "/social-listening": {
        return <SocialListening />;
      }
      case "/analytics/campaigns":
      case "/analytics/posts":
      case "/analytics/landing":
      case "/analytics/budget":
        return <MarketingAnalytics view={activeView} />;
      case "/calendar":
        return <ContentCalendar />;
      case "/tasks/my":
      case "/tasks/team":
        return <TaskManagement view={activeView} />;
      case "/proposals/my":
      case "/proposals/pending":
      case "/proposals/ideas":
        return <Proposals view={activeView} />;
      case "/inbox":
        return <InboxView />;
      case "/performance/my":
      case "/performance/team":
      case "/performance/leaderboard":
        return <Performance view={activeView} />;
      case "/library/brand":
      case "/library/assets":
        return <BrandLibrary view={activeView} />;
      default:
        return <Dashboard userName={currentUser.name} userRole={currentUser.role} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar activeView={activeView} onNavigate={setActiveView} />
        <SidebarInset className="flex-1">
          <AppHeader userName={currentUser.name} notificationCount={3} />
          <main className="flex-1 overflow-auto">
            {renderView()}
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}