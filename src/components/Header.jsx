import React from 'react'
import CodeMetricsLogo from './Logo'
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, User } from 'lucide-react'

const Header = ({handleShare, off}) => {
   const navigate = useNavigate();
   const handle = localStorage.getItem("handle");

   return (
      <div className="bg-slate-950/50 backdrop-blur-lg rounded-2xl p-4 sm:p-6 mb-4 sm:mb-8 shadow-xl border border-gray-700/60 ">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-1">
            <div className="flex items-center gap-2 sm:gap-4">
               <button onClick={() => navigate(-1)} disabled={off} className="bg-blue-600/80 hover:bg-blue-500 p-2 sm:p-2.5 rounded-full transition-all 
               focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg hover:shadow-blue-500/20" aria-label="Go back">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
               </button>
               <CodeMetricsLogo />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
               <button onClick={() => navigate(`/user-detail/${handle}`)} className="flex items-center gap-1 sm:gap-2 bg-blue-600/80 hover:bg-blue-500/80 px-3 sm:px-4 py-2 
               sm:py-2.5 rounded-lg transition-all shadow-lg text-xs sm:text-sm" aria-label="Share">
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  My Profile
               </button>
               <button onClick={handleShare} className="flex items-center gap-1 sm:gap-2 bg-green-600/80 hover:bg-green-500/80 px-3 sm:px-4 py-2 
               sm:py-2.5 rounded-lg transition-all shadow-lg text-xs sm:text-sm" aria-label="Share">
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  Share
               </button>

            </div>
         </div>

         <div className="mt-2 sm:mt-4">
            <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
               CP Dashboard
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
               Track your progress, compete with friends, and level up your competitive programming skills.
            </p>
         </div>
      </div>

   )
}

export default Header
