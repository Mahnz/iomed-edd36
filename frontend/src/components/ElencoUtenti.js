// MediciAutorizzati.js
// Creare una tabella che vada a mappare l'array di medici autorizzati relativi ad un certo codice fiscale.
// Ogni riga della tabella deve contenere:
// - Nome e cognome del medico
// - Specializzazione
// - Ospedale di riferimento
// - pulsante per rimuovere il paziente, e richiamare l'api '/api/bc/deleteDoctor'
import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie"
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    styled,
    tableCellClasses,
    TablePagination,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent, DialogActions, Button
} from "@mui/material"
import {Cancel} from "@mui/icons-material";
import axios from "axios";
import {tableData} from "../utils.js"

export default function ElencoUtenti() {
    const cookies = new Cookies()
    const [medico, setMedico] = useState(false)
    const [users, setUsers] = useState([])
    const [id, setId] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            if (cookies.get("token")) {
                if (cookies.get("type") === "medico") {
                    setMedico(true)
                    // TODO - Da rimuovere quando il codice fiscale viene letto dal cookie
                    setId(cookies.get('token'))
                    // BLOCKCHAIN
                    await axios.get(`http://localhost:3001/api/bc/getPatientsById/${id}`)
                        .then(res => setUsers(res.data)).catch(e => console.log(e));
                } else {
                    setMedico(false)
                    // TODO - Da rimuovere quando il codice fiscale viene letto dal cookie
                    const CF = cookies.get('token');
                    // BLOCKCHAIN
                    await axios.get(`http://localhost:3001/api/bc/getDoctorsByCF/${CF}`)
                        .then(res => setUsers(res.data)).catch(e => console.log(e));
                }
            }
        }
        fetchUsers()
    }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const [openDialog, setOpenDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const handleOpenDialog = (user) => {
        setUserToDelete(user);
        console.log(user)
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setUserToDelete(null);
        setOpenDialog(false);
    }

    const handleDeleteUser = async (user) => {
        handleCloseDialog();
        if (!medico) {
            // BLOCKCHAIN
            // TODO - Chiamata alla backend per andare a cancellare l'utente
            let CF= cookies.get("token");
            await axios.delete(`http://localhost:3001/api/bc/deleteDoctor`, {
                token: CF,
                id: user.id
            }).then(res=> alert(res.data)).catch(e=>console.log(e));
        }
    }

    return (
        <>
            <Typography variant="h4" mb={4}>
                {medico ? "Elenco assistiti" : "Elenco dei medici autorizzati"}
            </Typography>
            <Paper sx={{width: '100%', overflow: 'hidden', borderRadius: 3}}>
                <TableContainer sx={{maxHeight: 650}}>
                    <Table aria-label="table" stickyHeader>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#1976d2', color: '#ffff'}}>
                                <StyledTableCell sx={{width: '25%'}} align="left">Cognome</StyledTableCell>
                                <StyledTableCell sx={{width: '25%'}} align="left">Nome</StyledTableCell>
                                <StyledTableCell sx={{width: '15%'}} align="center">Data di nascita</StyledTableCell>
                                <StyledTableCell sx={{width: '30%'}} align="center">Codice fiscale</StyledTableCell>
                                {!medico && <StyledTableCell sx={{width: '5%'}} align="center"> </StyledTableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <StyledTableRow hover role="checkbox" key={index} tabIndex={-1}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                                        <StyledTableCell align="left">{row.firstName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.birthDate}</StyledTableCell>
                                        <StyledTableCell align="center">{row.CF}</StyledTableCell>
                                        {!medico && (
                                            <StyledTableCell align="center">
                                                <Tooltip title="Rimuovi medico dalla lista" placement="right">
                                                    <IconButton aria-label="delete"
                                                                onClick={() => handleOpenDialog(row)}>
                                                        <Cancel color="error"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                        )}
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {!medico && (
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Conferma cancellazione</DialogTitle>
                    <DialogContent>
                        Sei sicuro di voler revocare l'autorizzazione al medico ?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Annulla
                        </Button>
                        <Button onClick={handleDeleteUser} color="primary">
                            Conferma
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        '&:hover': {
            backgroundColor: theme.palette.action.selected,
        },
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default,
        '&:hover': {
            backgroundColor: theme.palette.action.selected,
        },
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));