// App.js
import {Routes, Route, Navigate} from 'react-router-dom'

import Authentication from "./pages/Authentication.js"
import Dashboard from "./pages/Dashboard.js"
import TestIPFS from "./pages/TestIPFS.js"
import TestFrontend from "./pages/TestFrontend.js"
import TestBC from "./pages/TestBC.js"
import {useState, useEffect} from "react"

import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";


export default function App() {

    return (
        <>
            <Routes>
                <Route path="/loginPaziente"
                       element={<Authentication medico={false} login={true}/>}/>
                <Route path="/signupPaziente"
                       element={<Authentication medico={false} login={false}/>}/>

                <Route path="/loginMedico"
                       element={<Authentication medico={true} login={true}/>}/>
                <Route path="/signupMedico"
                       element={<Authentication medico={true} login={false}/>}/>

                <Route path="/dashboard/*" element={<Dashboard/>}/>
                <Route path="/upload" element={<TestIPFS/>}/>
                <Route path="/testFE" element={<TestFrontend/>}/>
                <Route path="/blockchain" element={<TestBC/>}/>


                {/* TODO - Redirect per motivi di test */}
                <Route path="*" element={<Navigate to='/dashboard/home' replace/>}/>
            </Routes>
        </>
    )
}