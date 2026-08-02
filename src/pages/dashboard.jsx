import React, { useState } from 'react';
import {
  Award, BookOpen, ArrowRight, Share2, FileText, Code, User, Star, ExternalLink, RefreshCw, ArrowLeft,
  CheckCircle, MessageSquare
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CodeMetricsLogo2 from '../components/Logo2';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SharePopUp from '../components/SharePopUp';


const CPDashboard = () => {

  const { email } = useParams();
  const navigate = useNavigate();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const shareUrl = "https://codemetrics-frontend.vercel.app/";
  const shareMessage = "Check out CodeMetrics - the ultimate tool for tracking competitive programming progress! Join me in improving our coding skills.";

  const handleGoBack = () => {           // Handle go back function
    navigate(-1);
  };

  const handleShare = async () => {       // Share functionality
    setShowSharePopup(true);

    if (navigator.share) {                // Use Web Share API if available
      try {
        await navigator.share({ title: 'CodeMetrics', text: shareMessage, url: shareUrl });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const closeSharePopup = () => {         // Close share popup
    setShowSharePopup(false);
  };

  // Navigation functions
  const navigateToLeaderboard = () => {
    navigate(`/username-management/${email}`);
  };

  const navigateToCPSheets = () => {
    navigate('/cp-resources');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header section with logo */}
        <Header handleGoBack={handleGoBack} handleShare={handleShare} off={true} />

        {/* Main content - Two cards side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Leaderboard Card */}
          <div className="group bg-black/30 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/50 overflow-hidden hover:shadow-blue-500/10 transition-shadow">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 group-hover:opacity-50 transition-opacity"></div>
              <div className="h-32 sm:h-40 flex items-center justify-center p-6 relative">
                <Award className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400 opacity-80 group-hover:scale-110 transition-transform" />
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-600/10 rounded-full blur-xl"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-indigo-600/10 rounded-full blur-xl"></div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-700/30">
              <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 mb-2">
                Your Leaderboard
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mb-4">
                Track your progress against friends and top competitors. See who's climbing the ranks fastest.
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-2">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span>Compare with other coders</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  <span>Track rating changes</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-2">
                  <Code className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span>Monitor problem-solving streak</span>
                </div>
              </div>

              <button onClick={navigateToLeaderboard} className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white
              rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all group">
                <span className="text-xs sm:text-sm font-medium">View Your Leaderboard</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CP Sheets Card */}
          <div className="group bg-black/30 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/50 overflow-hidden hover:shadow-purple-500/10 transition-shadow">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 group-hover:opacity-50 transition-opacity"></div>
              <div className="h-32 sm:h-40 flex items-center justify-center p-6 relative">
                <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-purple-400 opacity-80 group-hover:scale-110 transition-transform" />
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-purple-600/10 rounded-full blur-xl"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-pink-600/10 rounded-full blur-xl"></div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-700/30">
              <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
                CP Sheets
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mb-4">
                Access curated problem sets and practice sheets designed to level up your competitive programming skills.
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-2">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  <span>Structured learning paths</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  <span>Topic-wise problem sets</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-2">
                  <Code className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span>Difficulty progression</span>
                </div>
              </div>

              <button onClick={navigateToCPSheets} className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white 
              rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all group">
                <span className="text-xs sm:text-sm font-medium">Access CP Sheets</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer section with logo */}
        <Footer />
      </div>

      {/* Share Popup */}
      {showSharePopup && (
        <SharePopUp closeSharePopup={closeSharePopup} shareMessage={shareMessage} shareUrl={shareUrl} 
        shareSuccess={shareSuccess} setShareSuccess={setShareSuccess} />
      )}
    </div>
  );
};

export default CPDashboard;