import React, {useEffect, useState} from 'react'
import {Typography} from "@mui/material";

export default function MediciAutorizzati() {
    // Creare una tabella che vada a mappare l'array di medici autorizzati relativi ad un certo codice fiscale.
    // Ogni riga della tabella deve contenere:
    // - Nome e cognome del medico
    // - Specializzazione
    // - Ospedale di riferimento
    // - pulsante per rimuovere il paziente, e richiamare l'api '/api/bc/deleteDoctor'
    const [medici, setMedici] = useState([])

    useEffect(() => {
        // Lettura dalla blockchain dei medici autorizzati
        // TODO - Da rimuovere quando il codice fiscale viene letto dal cookie
        // const codiceFiscale = cookies.get('codiceFiscale')
        const codiceFiscale = 'MZZDNC02B23A662Z'
        // const response = await axios.get(`http://localhost:3001/api/bc/getAllDoctorsByCF/${codiceFiscale}`)
        // setMedici(response.data.medici)

    }, [])
    return (
        <>
            <Typography variant="h4" mb={4}>
                Medici autorizzati
            </Typography>
        </>
    )
}