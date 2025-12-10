import { useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { saveFeedback } from "@/firebase/firestore";

export function useFeedback(user) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Show feedback popup after 1 minute
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasShownFeedback = localStorage.getItem("brieflyFeedbackShown");
      if (!hasShownFeedback) {
        setShowFeedback(true);
      }
    }, 60000); // 1 minute

    return () => clearTimeout(timer);
  }, []);

  // Handle feedback submission
  const handleFeedbackSubmit = async () => {
    if (feedbackRating === 0) return;
    const uid = auth.currentUser?.uid;
    if (!uid) {
      localStorage.setItem("brieflyFeedbackShown", "true");
      setShowFeedback(false);
      return;
    }

    try {
      const res = await saveFeedback({
        userID: uid,
        message: feedbackComment,
        rating: feedbackRating,
      });

      if (res.ok) {
        setFeedbackSubmitted(true);
        localStorage.setItem("brieflyFeedbackShown", "true");
        setTimeout(() => {
          setShowFeedback(false);
        }, 2000);
      }
    } catch (error) {}
  };

  return {
    showFeedback,
    setShowFeedback,
    feedbackRating,
    setFeedbackRating,
    feedbackComment,
    setFeedbackComment,
    feedbackSubmitted,
    handleFeedbackSubmit,
  };
}
