import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar } from "lucide-react";
import UpcomingContest from "../components/UpcomingContest";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SharePopUp from "../components/SharePopUp";
import CP31 from "../components/CP31Filter";

const CP_Resources = () => {

   const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState(0);
   const [showSharePopup, setShowSharePopup] = useState(false);
   const [shareSuccess, setShareSuccess] = useState(false);

   const shareUrl = "https://codemetrics-rosy.vercel.app/";
   const shareMessage = "Check out CodeMetrics - the ultimate tool for tracking competitive programming progress! Join me in improving our coding skills.";

   const handleGoBack = () => {
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

   const closeSharePopup = () => {
      setShowSharePopup(false);
      setShareSuccess(false);
   };

   const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
      <button onClick={onClick} className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2
      ${isActive ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-700/20 scale-105" : 
      "bg-black/40 text-gray-300 hover:bg-black/50 hover:text-white border border-gray-700/50"}`}>
         <Icon className={`h-5 w-5 ${isActive ? "animate-pulse" : ""}`} />
         {label}
      </button>
   );

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-900 text-white p-4 md:p-6 flex flex-col">
         <div className="max-w-5xl mx-auto flex-grow w-full">

            {/* Header section */}
            <Header handleGoBack={handleGoBack} handleShare={handleShare}/>
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
               <TabButton onClick={() => setActiveTab(0)} icon={BookOpen} label="CP31 Sheet" isActive={activeTab === 0}/>
               <TabButton onClick={() => setActiveTab(1)} icon={Calendar} label="Upcoming Contests" isActive={activeTab === 1}/>
            </div>

            {/* Content Area */}
            <div className="bg-black/40 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-blue-900/30 border border-gray-700/40">
               <div className={`relative ${activeTab === 0 ? "h-auto" : "h-[700px]"}`}>

                  {/* Content with conditional height and scrollbar */}
                  <div className={`${activeTab === 0 ? "h-auto" : "h-full overflow-y-auto custom-scrollbar"}`}>
                     {activeTab === 0 ? <CP31 /> : <UpcomingContest />}
                  </div>

               </div>
            </div>

            {/* Footer */}
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

export default CP_Resources;