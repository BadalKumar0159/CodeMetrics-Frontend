import React, { useState, useEffect } from 'react';
import { User, Plus, Trash2, Loader, CheckCircle, AlertCircle, RefreshCw, ArrowLeft, Award, ExternalLink, MessageSquare, Share2 } from 'lucide-react';
import { add, remove, fetchusernames } from '../utils/user';
import { userid } from '../utils/auth';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import SharePopUp from '../components/SharePopUp';
import UsernameAdder from '../components/UsernameAdder';
import CodeMetricsLogo from '../components/Logo';

const UsernameManagementPage = () => {
   const { email } = useParams();
   const navigate = useNavigate();
   const [usernames, setUsernames] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const [deleteLoading, setDeleteLoading] = useState({});
   const [userId, setUserId] = useState("");
   const [showSharePopup, setShowSharePopup] = useState(false);
   const [shareSuccess, setShareSuccess] = useState(false);

   const feedbackFormUrl = "https://forms.gle/XqQ8CFTPYECdVLZ17";
   const shareUrl = "https://codemetrics-rosy.vercel.app/";
   const shareMessage = "Check out CodeMetrics - the ultimate tool for tracking competitive programming progress! Join me in improving our coding skills.";

   const handleNavigateToManagement = () => {
      navigate(`/leaderboard/${userId}`);
   };

   const handleShare = async () => {
      setShowSharePopup(true);

      if (navigator.share) {
         try {
            await navigator.share({ title: 'CodeMetrics', text: shareMessage, url: shareUrl, });
         } catch (error) {
            console.log('Error sharing:', error);
         }
      }
   };

   const closeSharePopup = () => {
      setShowSharePopup(false);
      setShareSuccess(false);
   };

   const handleAddUser = (newUser) => {
      setUsernames(prev => [...prev, newUser.user]);
   };

   const handleRemoveUser = async (username) => {
      setDeleteLoading(prev => ({ ...prev, [username]: true }));
      const response = await remove(userId, username);

      if (response.success)
         setUsernames(prev => prev.filter(name => name !== username));
      else
         setError(`Failed to remove ${username}: ${response.message}`);

      setDeleteLoading(prev => ({ ...prev, [username]: false }));
   };

   const loadUsernames = async (id) => {
      setError('');
      const data = await fetchusernames(id);

      if (data.success)
         setUsernames(data.arr || []);
      else
         setError('Failed to fetch usernames.')

      setLoading(false);
   };

   useEffect(() => {
      let isMounted = true;

      const fetchUserId = async () => {
         const response = await userid(email);
         if (!isMounted) return;

         if (response.success) {
            setUserId(response.userid);
            await loadUsernames(response.userid);
         } else
            setError("User not found. Please check the email address.");
      };

      fetchUserId();
      return () => { isMounted = false; };
   }, [email]);

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 text-white p-3 sm:p-6">
         <div className="max-w-4xl mx-auto">
            {/* Header section with logo */}
            <Header handleShare={handleShare} />

            {/* Main Content Section */}
            <div className="flex flex-col md:grid md:grid-cols-3 gap-4 sm:gap-6">

               {/* Left column - Username adder - Full width on mobile, 1/3 on desktop */}
               <div className="w-full md:col-span-1">
                  {userId ? (
                     <UsernameAdder onAddUser={handleAddUser} userId={userId} />
                  ) : (
                     <div className="bg-black/30 backdrop-blur-lg rounded-xl p-4 text-yellow-400 flex items-center gap-2 shadow-lg border border-gray-700/50">
                        <Loader className="w-4 h-4 animate-spin" />
                        Loading user information...
                     </div>
                  )}
               </div>

               {/* Right column - Usernames list - Full width on mobile, 2/3 on desktop */}
               <div className="w-full md:col-span-2">
                  {/* Error message */}
                  {error && (
                     <div className="mb-4 p-3 sm:p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl text-red-300 flex items-center gap-2 shadow-lg text-xs sm:text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                     </div>
                  )}

                  {/* Usernames list */}
                  <div className="bg-slate-950/50 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/40 overflow-hidden">
                     <h2 className="flex items-center gap-1 sm:gap-2 p-3 sm:p-4 border-b border-gray-700/70 text-base sm:text-lg font-bold 
                     text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                        <Award size={16} className="text-blue-300 sm:w-5 sm:h-5" />
                        Competitors ({loading ? '...' : usernames.length})
                     </h2>

                     {loading ? (
                        <div className="flex justify-center items-center p-8 sm:p-12">
                           <div>
                              <Loader className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-blue-400 mx-auto mb-3" />
                              <p className="text-gray-400 text-sm">Loading competitors...</p>
                           </div>
                        </div>
                     ) : usernames.length === 0 ? (
                        <div className="p-8 sm:p-12 text-center">
                           <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3" />
                           <p className="text-gray-400 mb-2 text-sm">No competitors added yet.</p>
                           <p className="text-gray-500 text-xs sm:text-sm">Add your first competitor using the form on the left.</p>
                        </div>
                     ) : (
                        <ul className="divide-y divide-gray-700/70 max-h-80 sm:max-h-96 overflow-y-auto">
                           {usernames.map((username, index) => (
                              <li key={username} className={`flex items-center justify-between p-3 sm:p-4 hover:bg-blue-600/10 transition-colors`}>
                                 <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="bg-blue-600/20 p-1.5 sm:p-2 rounded-full">
                                       <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                                    </div>
                                    <div>
                                       <a href={`https://codeforces.com/profile/${username}`} target="_blank" rel="noopener noreferrer"
                                          className="text-blue-300 hover:text-blue-200 font-medium flex items-center gap-1 hover:underline text-sm" >
                                          {username}
                                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
                                       </a>
                                    </div>
                                 </div>

                                 <button onClick={() => handleRemoveUser(username)} disabled={deleteLoading[username]}
                                    className="text-red-400 hover:text-red-300 p-1.5 sm:p-2 rounded-full hover:bg-red-900/30 transition-all">
                                    {deleteLoading[username] ? (
                                       <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                    ) : (
                                       <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    )}
                                 </button>
                              </li>
                           ))}
                        </ul>
                     )}
                  </div>
               </div>
            </div>

            {/* Footer action buttons */}
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
               <button onClick={handleNavigateToManagement} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2.5 
               sm:py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs sm:text-sm" >
                  <span className="flex items-center gap-2">
                     <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                     <span className="font-medium">View Your Leaderboard</span>
                  </span>
               </button>

               <a href={feedbackFormUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 
               py-2.5 sm:py-3.5 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-xs sm:text-sm" >
                  <span className="flex items-center gap-2">
                     <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                     <span className="font-medium">Give Feedback</span>
                  </span>
               </a>
            </div>

            {/* Footer with logo */}
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
         </div>

         {/* Share Popup */}
         {showSharePopup && (
            <SharePopUp closeSharePopup={closeSharePopup} shareMessage={shareMessage} shareUrl={shareUrl}
               shareSuccess={shareSuccess} setShareSuccess={setShareSuccess} />
         )}
      </div>
   );
};

export default UsernameManagementPage;