// ElencoUtenti.js
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
    DialogContent, DialogActions, Button, TextField, Snackbar, Alert, useTheme, CircularProgress
} from "@mui/material"
import {Cancel, Close} from "@mui/icons-material";
import axios from "axios";
import {tableData} from "../utils.js"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

export default function ElencoUtenti() {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const [showOverlay, setShowOverlay] = useState(false)
    const theme = useTheme()
    const [medico, setMedico] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            if (cookies.get("token")) {
                if (cookies.get("type") === "medico") {
                    setMedico(true)
                    const id = cookies.get("token");
                    // BLOCKCHAIN fatto
                    await axios.get(`http://localhost:3001/api/bc/getPatientsById/${id}`)
                        .then(res => setUsers(res.data)).catch(e => console.log(e));
                } else {
                    setMedico(false)
                    // todo - Da rimuovere quando il codice fiscale viene letto dal cookie
                    const CF = cookies.get('token');
                    // BLOCKCHAIN fatto
                    await axios.get(`http://localhost:3001/api/bc/getDoctorsByCF/${CF}`)
                        .then(res => {
                            console.log(res);
                            setUsers(res.data)
                        }).catch(e => console.log(e));
                }
            }
        }
        fetchUsers()
    }, [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
        setUserToDelete(user)
        console.log(user)
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setUserToDelete(null);
        setOpenDialog(false);
    }

    const handleDeleteUser = async () => {
        handleCloseDialog()
        // BLOCKCHAIN fatto
        // todo - Chiamata alla backend per andare a cancellare l'utente
        let CF = cookies.get("token");
        setShowOverlay(true)
        await axios.post(`http://localhost:3001/api/bc/deleteDoctor`, {
            token: CF,
            id: userToDelete.id
        }).then(res => alert(res.data)).catch(e => console.log(e))
        // todo - Aggiornare la lista degli utenti dopo la cancellazione, così da eliminare la riga dalla tabella

        setOpenSnackbar(true)
    }

    const [searchTerm, setSearchTerm] = useState('')
    const handleViewUser = (user) => {
        const codiceUtente = user.CF;
        navigate('/dashboard/listaAssistiti/visite', {state: codiceUtente})
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter((user) => {
        if (medico) {
            const fullName = `${user.lastName} ${user.firstName} ${user.id}`
            return fullName.toLowerCase().includes(searchTerm.toLowerCase())
        } else {
            const fullName = `${user.lastName} ${user.firstName} ${user.CF}`
            return fullName.toLowerCase().includes(searchTerm.toLowerCase())
        }
    });

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false)
    }

    return (
        <>
            {showOverlay && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                    }}
                >
                    <CircularProgress color="success"/>
                </div>
            )}
            <Typography variant="h4" mb={4}>
                {medico ? "Elenco assistiti" : "Elenco dei medici autorizzati"}
            </Typography>
            <TextField type="text"
                       name="searchField"
                       label="Ricerca utente"
                       variant="outlined"
                       value={searchTerm}
                       onChange={handleSearchChange}
                       fullWidth
                       autoComplete="off"
                       sx={{mb: 2, backgroundColor: theme.palette.background.default}}
                       InputProps={{
                           endAdornment: searchTerm && (
                               <IconButton edge="end" onClick={() => setSearchTerm('')}>
                                   <Close/>
                               </IconButton>
                           ),
                       }}
            />
            <Paper sx={{width: '100%'}}>
                <TableContainer className="List" sx={{height: '63vh', borderRadius: 3, overflow: 'auto'}}>
                    <Table aria-label="table" stickyHeader>
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#1976d2', color: '#ffff'}}>
                                <StyledTableCell sx={{width: '25%'}} align="left">Cognome</StyledTableCell>
                                <StyledTableCell sx={{width: '25%'}} align="left">Nome</StyledTableCell>
                                <StyledTableCell sx={{width: '15%'}} align="center">Data di nascita</StyledTableCell>
                                <StyledTableCell sx={{width: '30%'}} align="center">
                                    {medico ? "Codice fiscale" : "Identificativo"}
                                </StyledTableCell>
                                <StyledTableCell sx={{width: '5%'}} align="center"> </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <StyledTableRow hover role="checkbox" key={index} tabIndex={-1}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                                        <StyledTableCell align="left">{row.firstName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.birthDate}</StyledTableCell>
                                        <StyledTableCell align="center">{medico ? row.CF : row.id}</StyledTableCell>
                                        {medico
                                            ? (
                                                <StyledTableCell align="center">
                                                    <Tooltip title="Vai alle visite del paziente" placement="right">
                                                        <IconButton onClick={() => handleViewUser(row)}>
                                                            <FontAwesomeIcon icon={faArrowRightFromBracket}
                                                                             style={{color: theme.palette.success.main}}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            ) : (
                                                <StyledTableCell align="center">
                                                    <Tooltip title="Rimuovi medico dalla lista"
                                                             placement="right">
                                                        <IconButton onClick={() => handleOpenDialog(row)}>
                                                            <Cancel sx={{color: theme.palette.error.main}}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            )
                                        }
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
            {!medico && (
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                        Autorizzazione rimossa con successo!
                    </Alert>
                </Snackbar>
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
