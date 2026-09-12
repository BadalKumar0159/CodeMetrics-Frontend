import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Code, Award, User, ArrowRight, Info, CircleX, Waypoints, Zap, Trash2, LoaderCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { rating_800, rating_900, rating_1000, rating_1100, rating_1200, rating_1300, rating_1400, rating_1500, rating_1600 } from '../assets/cp31';

const CP31Filter = () => {

   const [username, setUsername] = useState(localStorage.getItem("cp31_username") || "");
   const [selectedRating, setSelectedRating] = useState(localStorage.getItem("cp31_rating") || "Codeforces Rating : 800");
   const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
   const [isLadderTypeOpen, setIsLadderTypeOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const ratingDropdownRef = useRef(null);
   const usernameInputRef = useRef(null);
   const navigate = useNavigate();

   const ratingOptions = ['Codeforces Rating : 800', 'Codeforces Rating : 900', 'Codeforces Rating : 1000', 'Codeforces Rating : 1100',
      'Codeforces Rating : 1200', 'Codeforces Rating : 1300', 'Codeforces Rating : 1400', 'Codeforces Rating : 1500', 'Codeforces Rating : 1600',];


   const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
         handleViewLadder();
      }
   };

   const handleViewLadder = () => {
      if (!username.trim()) {
         alert('Please enter your Codeforces username');
         usernameInputRef.current.focus();
         return;
      }
      setIsLoading(true);

      setTimeout(() => {
         const rating = selectedRating.replace('Codeforces Rating : ', '');
         const key = `rating_${parseInt(rating)}`;
         const ratingMap = { rating_800, rating_900, rating_1000, rating_1100, rating_1200, rating_1300, rating_1400, rating_1500, rating_1600 };

         const problems = ratingMap[key] || rating_800;
         setIsLoading(false);

         navigate('/CP31_ladder', { state: { data: problems, username: username, rating: selectedRating } });
      }, 600);
   };

   const clearSavedData = () => {
      if (window.confirm('Are you sure you want to clear your saved username and settings?')) {
         localStorage.removeItem('cp31_username');
         localStorage.removeItem('cp31_rating');
         setUsername('');
         setSelectedRating('Codeforces Rating : 800');
         if (usernameInputRef.current) {
            usernameInputRef.current.focus();
         }
      }
   };

   useEffect(() => {          // Save username to localStorage whenever it changes
      if (username) {
         localStorage.setItem('cp31_username', username);
      }
   }, [username]);

   useEffect(() => {          // Saves selected rating to localStorage whenever it changes
      localStorage.setItem('cp31_rating', selectedRating);
   }, [selectedRating]);

   useEffect(() => {          // Focus on username input if it's empty
      if (usernameInputRef.current && !username)
         usernameInputRef.current.focus();
   }, [username]);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target))
            setIsRatingDropdownOpen(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <div className="relative p-6">
         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>

         <div className="p-8">

            <h2 className="flex items-center justify-center gap-2 text-xl font-bold mb-8 text-center text-blue-100">
               <Waypoints className='text-blue-400' />
               CP31 Ladder Selection
            </h2>

            {/* Username Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

               <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300">
                     <User className="h-4 w-4 mr-2 text-blue-400" />
                     Codeforces Username <span className="text-red-400 ml-1">*</span>
                  </label>

                  <div className="relative">
                     <input ref={usernameInputRef} type="text" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress}
                        className="w-full bg-gray-900/60 text-gray-100 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent transition-all duration-200 placeholder-gray-500"placeholder="Enter your username" />

                     {username && (
                        <button onClick={() => setUsername('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                           <CircleX className='size-5' />
                        </button>
                     )}
                  </div>

                  {username && (
                     <p className="text-xs text-blue-400 mt-1">
                        <Info className="h-3 w-3 inline mr-1" />
                        Username saved locally
                     </p>
                  )}
               </div>

               {/* Rating Dropdown */}
               <div className="space-y-2" ref={ratingDropdownRef}>
                  <label className="flex items-center text-sm font-medium text-gray-300">
                     <Award className="h-4 w-4 mr-2 text-blue-400" />
                     By Rating <span className="text-gray-500 ml-1">ⓘ</span>
                  </label>

                  <div onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)} className="w-full bg-gray-900/60 text-gray-100 px-4 py-3 rounded-lg 
                  cursor-pointer flex items-center justify-between border border-gray-700 hover:border-blue-500 transition-all duration-200">
                     <span>{selectedRating}</span>
                     <ChevronDown className={`h-5 w-5 transition-transform ${ isRatingDropdownOpen ? "rotate-180" : "" }`} />
                  </div>

                  {isRatingDropdownOpen && (
                     <div className="absolute z-10 w-64 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {ratingOptions.map((option, index) => (
                           <div key={index} onClick={() => { setSelectedRating(option); setIsRatingDropdownOpen(false); }} className="px-4 py-3 
                           text-gray-200 hover:bg-blue-900/50 cursor-pointer transition-colors duration-150 flex items-center justify-between" >
                              <span>{option}</span>
                              {selectedRating === option && (
                                 <ArrowRight className="h-4 w-4 text-blue-400" />
                              )}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>

            {/* Centered View Ladder button */}
            <div className="flex justify-center mb-6">
               <button onClick={handleViewLadder} disabled={isLoading} className="relative flex items-center justify-center w-3/4 bg-gradient-to-r 
               from-blue-600 to-indigo-700 text-white -medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] 
               hover:shadow-blue-500/20 shadow-lg border border-blue-500/30 overflow-hidden">
                  {isLoading ? (
                     <>
                        <LoaderCircle className='size-6 animate-spin mr-2' />
                        Loading...
                     </>
                  ) : (
                     <>
                        <Code className="h-5 w-5 mr-2" />
                        View Ladder
                        <ArrowRight className="h-5 w-5 ml-2" />
                     </>
                  )}
               </button>
            </div>

            <div className="flex items-center justify-center text-center text-sm text-gray-400">
               <Zap className="h-4 w-4 mr-2 text-blue-400" />
               Problems suitable for your current rating level
            </div>

            {/* Help information */}
            <div className="mt-6 text-sm text-gray-400 border-t border-gray-700/50 pt-4">
               <div className="flex justify-between items-center">
                  <p>
                     The CP31 Ladder provides a collection of problems organized by difficulty to help you improve your
                     competitive programming skills systematically.
                  </p>

                  {(username || selectedRating !== 'Codeforces Rating : 800') && (
                     <button onClick={clearSavedData} className="text-xs text-red-400 hover:text-red-300 ml-4 flex items-center">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear saved data
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>

   );
};

export default CP31Filter;