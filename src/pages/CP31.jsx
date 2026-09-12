import React, { useState, useEffect } from "react";
import { CheckCircle, Award, ArrowLeft, Code, BarChart, Star, Users, ExternalLink, Trophy, Clock } from "lucide-react";
import { useLocation, Link } from 'react-router-dom';

const CP31_ladder = () => {
   const [solvedProblems, setSolvedProblems] = useState(new Set());
   const [loading, setLoading] = useState(false);
   const [problemsView, setProblemsView] = useState([]);
   const [activeFilter, setActiveFilter] = useState('all');
   const location = useLocation();

   const handle = location.state?.username || 'badal';
   const selectedRating = location.state?.rating || 'Codeforces Rating: 800';
   const receivedData = location.state?.data || [];

   useEffect(() => {
      setProblemsView(receivedData);
   }, [receivedData]);

   useEffect(() => {
      if (handle) {
         loadSolvedProblems(handle);
      }
   }, [handle]);

   const loadSolvedProblems = async (handle) => {
      setLoading(true);
      try {
         const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle.trim()}`);
         const data = await response.json();

         if (data.status === "OK") {
            const solvedSet = new Set();
            data.result.forEach((submission) => {
               if (submission.verdict === "OK")
                  solvedSet.add(`${submission.problem.contestId}${submission.problem.index}`);
            });
            setSolvedProblems(solvedSet);
         }
         else {
            alert("Could not find user. Please check the handle and try again.");
         }
      } catch (error) {
         alert("Failed to fetch solved problems. Please try again later.");
      } finally {
         setLoading(false);
      }
   };

   const getFilteredProblems = () => {
      if (activeFilter === 'solved') {
         return problemsView.filter(problem => {
            const id = `${problem.contestId}${problem.index}`;
            return solvedProblems.has(id);
         });
      } else if (activeFilter === 'unsolved') {
         return problemsView.filter(problem => {
            const id = `${problem.contestId}${problem.index}`;
            return !solvedProblems.has(id);
         });
      }
      return problemsView;
   };
   const filteredProblems = getFilteredProblems();

   const totalProblems = problemsView.length;
   const solvedCount = problemsView.filter(problem => {
      const id = `${problem.contestId}${problem.index}`;
      return solvedProblems.has(id);
   }).length;
   const progressPercentage = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

   const getRatingColor = (rating) => {
      if (!rating) return "text-gray-400 bg-gray-800/50 border-gray-700";
      if (rating < 1200) return "text-gray-300 bg-gray-800/50 border-gray-700";
      if (rating < 1400) return "text-green-400 bg-green-900/30 border-green-700/50";
      if (rating < 1600) return "text-cyan-400 bg-cyan-900/30 border-cyan-700/50";
      if (rating < 1900) return "text-blue-400 bg-blue-900/30 border-blue-700/50";
      if (rating < 2100) return "text-purple-400 bg-purple-900/30 border-purple-700/50";
      if (rating < 2400) return "text-orange-400 bg-orange-900/30 border-orange-700/50";
      return "text-red-400 bg-red-900/30 border-red-700/50";
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950  to-blue-950 py-8 px-4 overflow-hidden relative">
         <div className="mx-auto max-w-5xl relative">
            {/* Header */}
            <div className="backdrop-blur-xl bg-slate-950/50  rounded-2xl shadow-2xl p-8 mb-8 border border-gray-700/60 transform transition-all hover:border-blue-500/30 duration-100">
               <Link to="/cp-resources" className="inline-flex items-center text-gray-400 hover:text-blue-400 mb-6 transition-all duration-300 group">
                  <div className="p-2 rounded-full bg-gray-800/80 border border-gray-700/50 mr-2 group-hover:border-blue-500/50 transition-all duration-300">
                     <ArrowLeft className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <span>Back to Ladder Selection</span>
               </Link>

               <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                     <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/30 shadow-lg shadow-blue-900/20">
                        <Code className="h-10 w-10 text-blue-400" />
                     </div>
                  </div>
                  <h1 className="py-2 text-5xl font-bold mb-2 tracking-tight text-blue-400">
                     {selectedRating}
                  </h1>
                  <p className="text-xl text-blue-300/70 max-w-2xl mx-auto font-light">
                     Master competitive programming one problem at a time
                  </p>
               </div>

               {/* User info and progress */}
               <div className="bg-slate-900 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 shadow-xl hover:border-blue-500/30 transition-all duration-500">
                  <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                     <div className="flex items-center mb-4 md:mb-0">
                        <div className="relative">
                           <div className="p-3 rounded-full bg-gradient-to-br from-blue-600/30 to-indigo-700/30 border border-blue-500/30 mr-4 shadow-lg shadow-blue-900/20">
                              <Users className="h-6 w-6 text-blue-400" />
                           </div>
                        </div>
                        <div>
                           <h2 className="flex items-center text-xl font-medium text-white">
                              {handle}
                              {progressPercentage > 50 && (<Star className="h-4 w-4 text-yellow-400 ml-2" />)}
                           </h2>
                           <p className=" flex items-center text-gray-400">
                              <Trophy className="h-4 w-4 mr-1 text-yellow-400" />
                              <span>Solved {solvedCount} out of {totalProblems} problems</span>
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 bg-slate-900/70 px-5 py-3 rounded-lg border border-gray-700/60 shadow-lg ">
                        <BarChart className="h-5 w-5 text-blue-400" />
                        <div>
                           <div className="font-medium text-white text-lg">{Math.round(progressPercentage)}% Complete</div>
                           <div className="text-xs text-gray-400">{totalProblems - solvedCount} problems remaining</div>
                        </div>
                     </div>
                  </div>

                  {/* Progress bar */}
                  <div className="relative">
                     <div className="w-full bg-gray-900/80 rounded-full h-5 mb-4 overflow-hidden border border-gray-800/80">
                        <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 h-5 rounded-full transition-all duration-700 
                        ease-out relative" style={{ width: `${Math.max(progressPercentage, 3)}%` }} >
                           {progressPercentage > 15 && (
                              <div className="absolute inset-0 overflow-hidden">
                                 <div className="w-full h-full opacity-50 animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                              </div>
                           )}
                        </div>
                     </div>

                     <div className="flex justify-between text-sm text-gray-400 px-2">
                        <span className="flex items-center">
                           <div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div>
                           Beginner
                        </span>
                        <span className="flex items-center">
                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                           Intermediate
                        </span>
                        <span className="flex items-center">
                           <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                           Advanced
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Problems list */}
            <div className="backdrop-blur-xl bg-slate-950/50 rounded-2xl shadow-2xl p-8 border border-gray-700/60 transform transition-all hover:border-blue-500/30 duration-500">
               <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold flex items-center text-white mb-4 md:mb-0">
                     <Code className="h-6 w-6 mr-2 text-blue-400" />
                     Problems Collection
                  </h2>

                  {/* Filter buttons */}
                  <div className="flex gap-2 bg-gray-900/60 p-1 rounded-lg border border-gray-700/50">
                     <button onClick={() => setActiveFilter('all')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all 
                     ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`} >
                        All Problems
                     </button>
                     <button onClick={() => setActiveFilter('solved')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all 
                     ${activeFilter === 'solved' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                        Solved
                     </button>
                     <button onClick={() => setActiveFilter('unsolved')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all 
                     ${activeFilter === 'unsolved' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                        Unsolved
                     </button>
                  </div>
               </div>

               {loading ? (
                  <div className="text-center py-12">
                     <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent relative">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-400/20"></div>
                     </div>
                     <p className="mt-4 text-gray-300 font-medium">Loading your progress...</p>
                  </div>
               ) : (
                  <>
                     {filteredProblems.length === 0 ? (
                        <div className="text-center py-10 bg-gray-800/50 rounded-xl border border-gray-700/50">
                           <Code className="h-12 w-12 mx-auto text-gray-500 mb-3" />
                           <h3 className="text-lg font-medium text-gray-300 mb-1">No problems found</h3>
                           <p className="text-gray-400">Try changing your filter or check back later</p>
                        </div>
                     ) : (
                        <div className="space-y-3">
                           {filteredProblems.map((problem, index) => {
                              const contestId = problem.contestId;
                              const problemIndex = problem.index;
                              const title = problem.title;
                              const rating = problem.rating;
                              const problemId = `${contestId}${problemIndex}`;
                              const isSolved = solvedProblems.has(problemId);

                              return (
                                 <div key={`${problemId}-${index}`} className={`flex flex-col sm:flex-row sm:items-center p-3 rounded-xl border group backdrop-blur-md
                                 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] hover:border-blue-500/30 ${isSolved ?
                                       "bg-gradient-to-r from-green-900/40 to-green-800/20 border-green-700/50" : "bg-gradient-to-r from-slate-800/60 to-slate-900/60 border-gray-700/70"}`} >
                                    <div className="flex items-center mb-3 sm:mb-0">
                                       <div className={`text-sm font-medium px-3 py-1 rounded-full border ${getRatingColor(rating)}`} >
                                          {rating || "N/A"}
                                       </div>

                                       {isSolved && (
                                          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-900/40 text-green-400 rounded-full text-sm border border-green-700/50 ml-3">
                                             <CheckCircle className="h-4 w-4" />
                                             <span className="font-medium">Solved</span>
                                          </div>
                                       )}
                                    </div>

                                    <a href={`https://codeforces.com/problemset/problem/${contestId}/${problemIndex}`} target="_blank" rel="noopener noreferrer"
                                       className="flex items-center flex-grow sm:ml-4 font-medium text-gray-200 group-hover:text-blue-400 transition-colors " >
                                       <span className="mr-2">{title}</span>
                                       <span className="text-gray-500 text-sm">
                                          ({contestId}{problemIndex})
                                       </span>
                                    </a>

                                    <div className="flex items-center gap-3 mt-3 sm:mt-0 sm:ml-4">
                                       <a href={`https://codeforces.com/problemset/problem/${contestId}/${problemIndex}`} target="_blank" rel="noopener noreferrer"
                                          className="flex items-center px-3 py-1.5 bg-blue-900/40 text-blue-400 rounded-lg text-sm border border-blue-700/50 hover:bg-blue-800/40 transition-colors" >
                                          <ExternalLink className="h-4 w-4 mr-1" />
                                          <span className="font-medium">Solve</span>
                                       </a>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     )}
                  </>
               )}
            </div>

            {/* Bottom stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
               <div className="flex items-center backdrop-blur-lg bg-slate-950/50 rounded-xl p-4 border border-gray-700/60 hover:border-blue-500/30 transition-all duration-300 shadow-lg">
                  <div className="p-2 rounded-lg bg-blue-900/40 border border-blue-700/60 mr-3">
                     <Trophy className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                     <h3 className="text-lg font-medium text-white">{solvedCount} Solved</h3>
                     <p className="text-gray-400 text-sm">Keep up the good work!</p>
                  </div>
               </div>

               <div className="flex items-center backdrop-blur-lg bg-slate-950/50 rounded-xl p-4 border border-gray-700/60 hover:border-blue-500/30 transition-all duration-300 shadow-lg">
                     <div className="p-2 rounded-lg bg-indigo-900/40 border border-indigo-700/60 mr-3">
                        <BarChart className="h-5 w-5 text-indigo-400" />
                     </div>
                     <div>
                        <h3 className="text-lg font-medium text-white">{Math.round(progressPercentage)}% Complete</h3>
                        <p className="text-gray-400 text-sm">Progress tracking</p>
                     </div>
               </div>

               <div className="flex items-center backdrop-blur-lg bg-slate-950/50 rounded-xl p-4 border border-gray-700/60 hover:border-blue-500/30 transition-all duration-300 shadow-lg">
                     <div className="p-2 rounded-lg bg-purple-900/40 border border-purple-700/60 mr-3">
                        <Code className="h-5 w-5 text-purple-400" />
                     </div>
                     <div>
                        <h3 className="text-lg font-medium text-white">{totalProblems - solvedCount} Remaining</h3>
                        <p className="text-gray-400 text-sm">Challenges await!</p>
                     </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CP31_ladder;