import React, { useState } from "react";
import { Plus, Loader, AlertCircle, CheckCircle, } from "lucide-react";
import { add } from "../utils/user";

const UsernameAdder = ({ onAddUser = () => { }, userId }) => {
   const [username, setUsername] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

   const validateUsername = async (username) => {
      try {
         const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
         if (!response.ok) return false;
         const data = await response.json();
         return data.status === 'OK';
      } catch (error) {
         console.error("Error validating username:", error);
         return false;
      }
   };

   const addUsername = async () => {
      if (!username.trim()) {
         setError('Please enter a username');
         return;
      }

      setLoading(true);
      setError('');
      setSuccess('');

      const isValid = await validateUsername(username.trim());          // Validate the username with Codeforces API
      if (!isValid) {
         setError('Invalid Codeforces username');
         setLoading(false);
         return;
      }
      const response = await add(userId, username.trim());              // Properly pass userId and username to the add function

      if (!response.success) {
         setError(response.message || 'Failed to add username');
      }
      else {
         onAddUser({ user: username.trim() });                         // Notify parent component about successful addition
         setSuccess(`"${username.trim()}" added successfully!`);
         setUsername('');
      }
      setLoading(false);
   };

   return (
      <div className="bg-slate-950/50 backdrop-blur-lg rounded-xl shadow-xl p-4 sm:p-5 w-full mx-auto border border-gray-700/40 h-full">
         <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 
         flex items-center gap-1 sm:gap-2">
            <Plus size={18} className="sm:size-8 text-white" />
            Add Competitor
         </h2>

         <div className="mb-4 sm:mb-6">
            <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
               Enter a valid Codeforces username to add to your tracking list.
            </p>

            <div className="relative">
               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Codeforces username"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/70 border border-gray-600/80 rounded-lg text-white text-xs sm:text-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-inner placeholder-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && !loading && addUsername()} disabled={loading} />
            </div>

            <button onClick={addUsername} disabled={loading} className="flex items-center justify-center gap-1 sm:gap-2 mt-2 sm:mt-3 w-full 
            bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 
            focus:outline-none transition-all disabled:opacity-70 font-medium text-xs sm:text-sm">
               {loading ? (
                  <Loader className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
               ) : (
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
               )}
               <span>{loading ? "Verifying..." : "Add Competitor"}</span>
            </button>
         </div>

         {error && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-lg text-red-300 
            flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
               <span>{error}</span>
            </div>
         )}

         {success && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-lg text-green-300 
            flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
               <span>{success}</span>
            </div>
         )}

         <div className="mt-4 sm:mt-6 pt-3 sm:pt-6 border-t border-gray-700/50">
            <h3 className="text-xs font-medium text-gray-400 mb-1 sm:mb-2">Tips:</h3>
            <ul className="text-xs text-gray-500 space-y-0.5 sm:space-y-1">
               <li>• Usernames are case-sensitive</li>
               <li>• Only valid Codeforces users can be added</li>
               <li>• Track up to 20 competitors at once</li>
            </ul>
         </div>
      </div>
   );
};

export default UsernameAdder
