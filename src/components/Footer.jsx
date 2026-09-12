import React from 'react'
import CodeMetricsLogo from './Logo'
import { Code, MessageSquare } from 'lucide-react'

const Footer = () => {

   const feedbackFormUrl = "https://forms.gle/XqQ8CFTPYECdVLZ17";

   return (
      <>
         <div className="mt-12 sm:mt-14 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <a href="https://codeforces.com/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 
            to-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all 
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm">
               <span className="flex items-center gap-2">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">Visit Codeforces</span>
               </span>
            </a>

            <a href={feedbackFormUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-600 
            to-pink-600 text-white px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all 
            focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-xs sm:text-sm" >
               <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">Give Feedback</span>
               </span>
            </a>
         </div>

         <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-gray-700/30 flex justify-center">
            <div className="text-center">
               <div className="scale-75 sm:scale-100">
                  <CodeMetricsLogo />
               </div>
               <p className="text-gray-500 text-xs mt-1 sm:mt-2">
                  Track your competitive programming progress
               </p>
            </div>
         </div>
      </>
   )
}

export default Footer


