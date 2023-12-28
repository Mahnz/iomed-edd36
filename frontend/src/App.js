// App.js
import {Routes, Route, Navigate} from 'react-router-dom'

import Authentication from "./pages/Authentication.js"
import Dashboard from "./pages/Dashboard.js"
import HomePage from "./pages/HomePage.js"
import TestFrontend from "./pages/TestFrontend.js"
import TestBC from "./pages/TestBC.js"
import {createTheme, ThemeProvider, useMediaQuery} from "@mui/material";

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {useEffect, useState} from "react";
import Cookies from "universal-cookie";


export default function App() {
    const cookies = new Cookies()
    const initialTheme = cookies.get('theme') || 'light'
    const [mode, setMode] = useState(initialTheme)

    const toggleMode = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
    };

    useEffect(() => {
        cookies.set('theme', mode, {
            path: '/',
            expires: new Date(Date.now() + 3600000),
            sameSite: 'Strict'
        })
    }, [mode]);

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Poppins',
                'sans-serif',
            ].join(','),
        },
        palette: {
            mode: mode,
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/loginPaziente"
                       element={<Authentication medico={false} login={true}/>}/>
                <Route path="/signupPaziente"
                       element={<Authentication medico={false} login={false}/>}/>

                <Route path="/loginMedico"
                       element={<Authentication medico={true} login={true}/>}/>
                <Route path="/signupMedico"
                       element={<Authentication medico={true} login={false}/>}/>

                <Route path="/dashboard/*" element={<Dashboard mode={mode} toggleMode={toggleMode}/>}/>
                <Route path="/homepage" element={<HomePage/>}/>
                <Route path="/testFE" element={<TestFrontend/>}/>
                <Route path="/blockchain" element={<TestBC/>}/>


                {/* TODO - Redirect per motivi di test */}
                <Route path="*" element={<Navigate to='/homepage' replace/>}/>
            </Routes>
        </ThemeProvider>
    )
}