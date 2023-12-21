import React, {useEffect} from "react";
import LoginFormPaziente from "../components/LoginFormPaziente.js";
import LoginFormMedico from "../components/LoginFormMedico.js";
import SignUpFormPaziente from "../components/SignUpFormPaziente.js";
import SignUpFormMedico from "../components/SignUpFormMedico.js";

export default function Authentication({login, medico,handle}) {
    useEffect(() => {
        document.title = login ? 'MED Project | Login' : 'MED Project | Registrazione';
    })

    /** Si effettua il renderizzamento al form di accesso o di registrazione in base
     *    al valore del flag login, impostato in "App.js"
     **/
    return (
        <>
            {login ?
                (medico ? <LoginFormMedico handle={handle}/> : <LoginFormPaziente handle={handle}/>)
                : (medico ? <SignUpFormMedico handle={handle}/> : <SignUpFormPaziente handle={handle}/>)
            }
        </>
    )
}