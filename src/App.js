import './style/App.css'
import {Routes, Route, Navigate} from 'react-router-dom'

import Authentication from "./pages/Authentication"
import Dashboard from "./pages/Dashboard";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Authentication login={true}/>}/>
                <Route path="/signup" element={<Authentication login={false}/>}/>
                <Route path="/home" element={<Dashboard/>}/>
                {/*<Route path="*" element={<Navigate to='/login' replace />} />*/}
            </Routes>
        </>
    );
}