// Authentication.js
import React, {useEffect} from "react";
import LoginFormPaziente from "../components/LoginFormPaziente.js";
import LoginFormMedico from "../components/LoginFormMedico.js";
import SignUpFormPaziente from "../components/SignUpFormPaziente.js";
import SignUpFormMedico from "../components/SignUpFormMedico.js";

export default function Authentication({login, medico}) {
    useEffect(() => {
        document.title = login ? 'IOMed | Login' : 'IOMed | Registrazione';
    })

    // ?  Si effettua il redirect al form di accesso o di registrazione in base al valore del flag login, impostato in
    // ?  "App.js", e in base al valore del flag medico che indica se l'utente che si sta autenticando è un medico o un paziente

    return (
        <>
            {login ?
                (medico ? <LoginFormMedico/> : <LoginFormPaziente/>)
                : (medico ? <SignUpFormMedico/> : <SignUpFormPaziente/>)
            }
        </>
    )
}