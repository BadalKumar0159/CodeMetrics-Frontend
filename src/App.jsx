import {  Routes, Route, BrowserRouter } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import UserDetailsPage from "./pages/UserProfile";
import AuthPages from "./pages/AuthPage";
import UsernameManagementPage from "./pages/UsernameManagement";
import CPDashboard from "./pages/Dashboard";
import CPResources from "./pages/CPResources";
import CP31_ladder from "./pages/CP31";
import CPRoadmap from "./pages/Roadmap";

const app=()=>{
  return(
    <BrowserRouter>
    <Routes>
        <Route path='/'element={<AuthPages></AuthPages>}/>
        <Route path='/dashboard/:email' element={<CPDashboard/>}/>
        <Route path='/username-management/:email' element={<UsernameManagementPage/>}></Route>
        <Route path='/leaderboard/:userId' element={<Leaderboard/>}/>
        <Route path='/user-detail/:username' element={<UserDetailsPage/>}/>
        <Route path='/cp-resources' element={<CPResources/>}/>
        <Route path='/CP31_ladder' element={<CP31_ladder/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default app;