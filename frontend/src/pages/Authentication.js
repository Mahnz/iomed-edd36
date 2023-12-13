import React, {useEffect} from "react";
import LoginForm from "../components/LoginForm.js";
import SignUpForm from "../components/SignUpForm.js";

export default function Authentication({login}) {
    useEffect(() => {
        document.title = login ? 'MED Project | Login' : 'MED Project | Registrazione';
    })

    /** Si effettua il renderizzamento al form di accesso o di registrazione in base
    *    al valore del flag login, impostato in "App.js"
    **/
    return (
        <>
            { login ? <LoginForm/> : <SignUpForm/> }
        </>
    )
}