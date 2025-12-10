import { useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { logUsage } from "@/firebase/firestore";

export function useDashboard() {
  const [activeTab, setActiveTab] = useState("summarizer");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [briiReacting, setBriiReacting] = useState(false);

  // Check if desktop on mount
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Handle AI Processing
  const handleProcess = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setOutputText("");
    setBriiReacting(true);

    try {
      const endpoint =
        activeTab === "summarizer"
          ? "/api/summarize"
          : activeTab === "rewriter"
          ? "/api/rewriter"
          : activeTab === "notes"
          ? "/api/notes"
          : activeTab === "eli5"
          ? "/api/eli5"
          : "/api/report";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputText }),
      });

      if (!response.ok) throw new Error("AI processing failed");

      const data = await response.json();
      setOutputText(data.output);

      const uid = auth.currentUser?.uid;
      if (uid) {
        try {
          await logUsage({
            userID: uid,
            tool: activeTab,
            inputLength: inputText.length,
            outputLength: data.output?.length ?? 0,
          });
        } catch {}
      } else {
        try {
          await fetch("/api/user/activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tool: activeTab,
              inputLength: inputText.length,
              outputLength: data.output?.length ?? 0,
            }),
          });
        } catch {}
      }

      // Brii celebration animation
      setTimeout(() => setBriiReacting(false), 2000);
    } catch (error) {
      console.error("Error:", error);
      setOutputText(
        "Sorry, there was an error processing your request. Please try again.",
      );
      setBriiReacting(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
    }
  };

  return {
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
  };
}
