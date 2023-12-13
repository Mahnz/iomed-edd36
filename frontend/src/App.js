// App.js
import './style/App.css'
import {Routes, Route, Navigate} from 'react-router-dom'

import Authentication from "./pages/Authentication.js"
import Dashboard from "./pages/Dashboard.js";
import TestIPFS from "./pages/TestIPFS.js";
import TestFrontend from "./pages/TestFrontend.js";
import TestBC from "./pages/TestBC.js"
import HomeContent from "./components/HomeContent.js";
import ElencoVisite from "./components/ElencoVisite.js";
import MyProfile from "./components/MyProfile.js";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Authentication login={true}/>}/>
                <Route path="/signup" element={<Authentication login={false}/>}/>
                <Route path="/dashboard/*" element={<Dashboard/>}/>
                <Route path="/upload" element={<TestIPFS/>}/>
                <Route path="/testFE" element={<TestFrontend/>}/>
                <Route path="/blockchain" element={<TestBC/>}/>

                {/* TODO - Redirect per motivi di test */}
                <Route path="*" element={<Navigate to='/dashboard' replace/>}/>
            </Routes>
        </>
    );
}