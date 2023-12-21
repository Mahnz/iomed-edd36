import React, {useState} from 'react';
import {Button} from '@mui/material';
import axios from "axios";

export default function TestBC(){
    return (
        <div>
            <Button variant="contained" color="primary" onClick={e=> {
                e.preventDefault();
                console.log("Bottone cliccato");
                axios.get("http://localhost:3001/api/bc/getData").then(res=> console.log(res)).catch(e=> console.log("Errore"));
            }}>prova getAll</Button>

            <Button variant="contained" color="primary" onClick={e=> {
                e.preventDefault();
                console.log("Bottone cliccato");
                axios.get("http://localhost:3001/api/bc/testpv").then(res=> console.log(res)).catch(e=> console.log("Errore"));
            }}>prova query</Button>
        </div>
    );
}
