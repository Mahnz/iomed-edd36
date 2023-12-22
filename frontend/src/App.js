// App.js
import {Routes, Route, Navigate} from 'react-router-dom'

import Authentication from "./pages/Authentication.js"
import Dashboard from "./pages/Dashboard.js"
import HomePage from "./pages/HomePage.js"
import TestFrontend from "./pages/TestFrontend.js"
import TestBC from "./pages/TestBC.js"
import {useState, useEffect} from "react"

import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";


export default function App() {

    const [name, setName] = useState({firstName: "", lastName: ""});
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        console.log(document.cookie);
        console.log(name);
    })

    function setLoggedUser(data) {
        console.log("Cookie:")
        console.log(document.cookie);
        console.log("Dati: ")
        console.log(data);
        if (data == null) {
            console.log("Cancellazione cookie, logout");

            cookies.remove("token", {
                path: "/"
            });

            console.log(document.cookie);
            setName({firstName: "", lastName: ""});
            navigate("/dashboard/home");
        } else {
            cookies.set('token', data.CF, {
                path: '/',
                expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                sameSite: 'Strict',  // Cookie limitato al proprio dominio
            });
            console.log(document.cookie);
            setName({firstName: data.firstName, lastName: data.lastName});
            navigate("/dashboard/home");
        }
    }

    return (
        <>
            <Routes>
                <Route path="/loginPaziente"
                       element={<Authentication medico={false} login={true} handle={setLoggedUser}/>}/>
                <Route path="/signupPaziente"
                       element={<Authentication medico={false} login={false} handle={setLoggedUser}/>}/>

                <Route path="/loginMedico"
                       element={<Authentication medico={true} login={true} handle={setLoggedUser}/>}/>
                <Route path="/signupMedico"
                       element={<Authentication medico={true} login={false} handle={setLoggedUser}/>}/>

                <Route path="/dashboard/*" element={<Dashboard/>}/>
                <Route path="/homepage" element={<HomePage/>}/>
                <Route path="/testFE" element={<TestFrontend/>}/>
                <Route path="/blockchain" element={<TestBC/>}/>


                {/* TODO - Redirect per motivi di test */}
                <Route path="*" element={<Navigate to='/homepage' replace/>}/>
            </Routes>
        </>
    )
}