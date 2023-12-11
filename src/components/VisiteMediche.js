import React from 'react'
import {Grid, Paper} from "@mui/material";
import MedicalVisitCard from "./MedicalVisitCard.js";

export default function VisiteMediche() {
    return (
        <Grid container spacing={5}>
            <Grid item xs={12} md={8} lg={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 220,
                        transition: 'box-shadow 0.2s',
                        '&:hover': {
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                        },
                    }}
                >
                    <MedicalVisitCard
                        name={"Visita allergologica"}
                        date={"12/12/2021"}
                        doctor={"Dott. Mario Rossi"}
                    />
                </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 220,
                        transition: 'box-shadow 0.2s',
                        '&:hover': {
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                        },
                    }}
                >
                    <MedicalVisitCard
                        name={"Visita oculistica"}
                        date={"04/10/2021"}
                        doctor={"Dott. Rario Mossi"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}