import React, { useState } from 'react'
import { Share2, CheckCircle } from 'lucide-react';

const SharePopUp = ({closeSharePopup, shareMessage, shareUrl, shareSuccess, setShareSuccess}) => {
   return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
         <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 p-4 sm:p-6 max-w-md w-full relative animate-fade-in">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-300 flex items-center gap-2">
               <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
               Share CodeMetrics

            </h3>

            <p className="text-gray-300 mb-3 sm:mb-4 text-sm">
               {shareMessage}
            </p>

            <div className="bg-gray-800 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-gray-700 flex items-center">
               <p className="text-gray-400 text-xs sm:text-sm truncate flex-1">{shareUrl}</p>
               <button onClick={async () => {
                  await navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`); setShareSuccess(true);
                  setTimeout(() => setShareSuccess(false), 3000);
               }} className="ml-2 sm:ml-3 bg-blue-600 hover:bg-blue-500 text-white px-2 
              sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm flex-shrink-0"  >
                  Copy
               </button>
            </div>

            {shareSuccess && (
               <div className="mb-4 p-2 sm:p-3 bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-lg text-green-300 flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Link copied to clipboard!</span>
               </div>
            )}

            <div className="flex justify-end gap-3 mt-2">
               <button onClick={closeSharePopup} className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-400 hover:text-white bg-gray-800 
               hover:bg-gray-700 rounded-lg transition-colors text-xs sm:text-sm">
                  Close
               </button>
            </div>
         </div>
      </div>
   )
}

export default SharePopUp;
