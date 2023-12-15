// VisitaMedica.js
import React, {useEffect} from 'react';
import {Paper, Typography, Button, Container, Grid, Divider, IconButton, Menu, MenuItem} from '@mui/material';
import {ArrowBack, CloudDownload, MoreVert} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom';

export default function VisitaMedica({visita}) {
    const navigate = useNavigate();

    // TODO - Da rimuovere quando la visita viene passata come parametro
    const files = [
        {
            name: "Referto.pdf",
            type: "pdf",
            size: "1.2 MB",
            date: "11/12/2021",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        },
        {
            name: "Immagini radiografia.pdf",
            type: "pdf",
            size: "1.2 MB",
            date: "11/12/2021",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
    ];

    useEffect(() => {
        if (visita === "") {
            navigate(-1);
        }
    }, [visita]);

    // ? Gestione del menù di opzioni per i file
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleDownload = () => {
        window.alert('Scarica il file qui');
        handleMenuClose();
    };
    const handleOpenInNewTab = () => {
        window.alert('Apri il file in una nuova pagina');
        handleMenuClose();
    };

    return (
        <Container sx={{mt: 4}}>
            {visita !== "" && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" color="primary">
                            <b>{visita.name}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">
                            <b>Data:</b> {visita.date}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="text.secondary">
                            <b>Medico:</b> {visita.doctor}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="text.secondary">
                            <b>Descrizione:</b> {visita.description}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a leo aliquet, pharetra
                            nulla sed, hendrerit diam. Mauris tortor eros, porttitor ut laoreet non, varius vel quam.
                            Nullam efficitur, massa ut tristique molestie, leo risus aliquet eros, vitae porttitor nisi
                            sapien scelerisque metus. Nulla facilisi. Phasellus quis odio venenatis velit laoreet
                            bibendum sit amet at neque. Vivamus sed dui a ante consequat efficitur. Donec feugiat ipsum
                            felis, quis cursus lorem semper vel. Vivamus sed augue iaculis erat rutrum efficitur eget
                            tristique elit. Quisque non est efficitur, gravida libero a, ullamcorper dui. Nam dictum, ex
                            ac egestas tristique, turpis lacus efficitur turpis, a lobortis sem elit in elit.
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        {files.map((file, index) => (
                            <Paper key={index} elevation={1}
                                   sx={{
                                       padding: 2,
                                       mt: 2,
                                       cursor: 'pointer',
                                       display: 'flex',
                                       alignItems: 'center',
                                       height: 60,
                                       transition: 'box-shadow 0.2s',
                                       '&:hover': {
                                           boxShadow: '0 2px 3px rgba(0, 0, 0, 0.4)',
                                       },
                                   }}>
                                <Menu
                                    id="file-options-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleDownload}>Scarica</MenuItem>
                                    <MenuItem onClick={handleOpenInNewTab}>Apri in nuova pagina</MenuItem>
                                </Menu>
                                <Typography variant="body2" sx={{flex: 1, fontSize: 15}}>
                                    <b>{file.name}</b>
                                </Typography>
                                <Button
                                    size="small"
                                    color="primary"
                                    startIcon={<CloudDownload/>}
                                    onClick={handleDownload}
                                >
                                    Scarica
                                </Button>
                                <IconButton
                                    color="primary"
                                    aria-label="opzioni file"
                                    component="span"
                                    onClick={handleMenuClick}
                                >
                                    <MoreVert/>
                                </IconButton>
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="text.secondary">
                            <b>Ultimo aggiornamento:</b> 13:50, 11/12/2021
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Container sx={{textAlign: 'center', pt: 2}}>
                            <Button variant="contained" color="primary" component={Link} to="/dashboard/visite"
                                    startIcon={<ArrowBack/>}>
                                Torna all'elenco
                            </Button>
                        </Container>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}