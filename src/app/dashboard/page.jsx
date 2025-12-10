import { useState } from "react";
import useUser from "@/utils/useUser";
import useAuth from "@/utils/useAuth";
import { useDashboard } from "@/hooks/useDashboard";
import { useFeedback } from "@/hooks/useFeedback";
import { BackgroundEffects } from "@/components/Dashboard/BackgroundEffects";
import { LoadingScreen } from "@/components/Dashboard/LoadingScreen";
import { SignInPrompt } from "@/components/Dashboard/SignInPrompt";
import { MobileMenuToggle } from "@/components/Dashboard/MobileMenuToggle";
import { Sidebar } from "@/components/Dashboard/Sidebar/Sidebar";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { InputPanel } from "@/components/Dashboard/InputPanel";
import { OutputPanel } from "@/components/Dashboard/OutputPanel";
import { BriiAssistant } from "@/components/Dashboard/BriiAssistant";
import { FeedbackPopup } from "@/components/Dashboard/FeedbackPopup";
export const meta = () => [
  { title: "Briefly — Dashboard" },
  { name: "description", content: "Your personalized Briefly workspace." },
  { property: "og:title", content: "Briefly — Dashboard" },
  { property: "og:description", content: "Work across AI summarizer, rewriter, notes, ELI5, and reports." },
  { property: "og:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
  { name: "twitter:title", content: "Briefly — Dashboard" },
  { name: "twitter:description", content: "Work across AI summarizer, rewriter, notes, ELI5, and reports." },
  { name: "twitter:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
];

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const { signOut } = useAuth();
  const [showBriiChat, setShowBriiChat] = useState(false);

  const {
    activeTab,
    setActiveTab,
    inputText,
    setInputText,
    outputText,
    setOutputText,
    isLoading,
    sidebarOpen,
    setSidebarOpen,
    showProfileDropdown,
    setShowProfileDropdown,
    isDesktop,
    briiReacting,
    handleProcess,
    copyToClipboard,
  } = useDashboard();

  const {
    showFeedback,
    setShowFeedback,
    feedbackRating,
    setFeedbackRating,
    feedbackComment,
    setFeedbackComment,
    feedbackSubmitted,
    handleFeedbackSubmit,
  } = useFeedback(user);

  if (userLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <SignInPrompt />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] relative overflow-hidden">
      <BackgroundEffects />

      <MobileMenuToggle
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar
        sidebarOpen={sidebarOpen}
        isDesktop={isDesktop}
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSidebarOpen={setSidebarOpen}
        showProfileDropdown={showProfileDropdown}
        setShowProfileDropdown={setShowProfileDropdown}
        signOut={signOut}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-500 ${sidebarOpen || isDesktop ? "lg:ml-80" : ""}`}
      >
        <div className="relative z-10 p-6 lg:p-8">
          <DashboardHeader activeTab={activeTab} />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { id: "summarizer", label: "Summarizer", href: "/features#summarizer" },
              { id: "rewriter", label: "Rewriter", href: "/features#rewriter" },
              { id: "notes", label: "Smart Notes", href: "/features#notes" },
              { id: "eli5", label: "ELI5", href: "/eli5" },
              { id: "report", label: "Report Maker", href: "/report" },
            ].map((card) => (
              <a
                key={card.id}
                href={card.href}
                title={`Open ${card.label}`}
                aria-label={`Open ${card.label}`}
                className="group p-4 rounded-xl border border-purple-500/30 bg-gradient-to-br from-[#1E1E2E]/60 to-[#2D1B69]/60 text-gray-200 hover:text-white transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{card.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </a>
            ))}
          </div>

          {/* Enhanced Main Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <InputPanel
              inputText={inputText}
              setInputText={setInputText}
              activeTab={activeTab}
              isLoading={isLoading}
              handleProcess={handleProcess}
            />

            <OutputPanel
              outputText={outputText}
              setOutputText={setOutputText}
              copyToClipboard={copyToClipboard}
            />
          </div>
        </div>
      </div>

      <BriiAssistant
        briiReacting={briiReacting}
        showBriiChat={showBriiChat}
        setShowBriiChat={setShowBriiChat}
      />

      <FeedbackPopup
        showFeedback={showFeedback}
        setShowFeedback={setShowFeedback}
        feedbackRating={feedbackRating}
        setFeedbackRating={setFeedbackRating}
        feedbackComment={feedbackComment}
        setFeedbackComment={setFeedbackComment}
        feedbackSubmitted={feedbackSubmitted}
        handleFeedbackSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}

export default MainComponent;
