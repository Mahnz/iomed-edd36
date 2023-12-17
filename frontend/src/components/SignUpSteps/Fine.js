import React, {useRef, useState} from 'react'
import {
    Grid,
    TextField,
    InputAdornment,
    Input,
    Checkbox,
    Typography,
    Link,
    Button,
    ButtonBase, IconButton
} from '@mui/material'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIdBadge} from "@fortawesome/free-solid-svg-icons";
import {Cancel} from "@mui/icons-material";


export default function Fine({formData, handleChange}) {
    const inputRefFront = useRef();
    const inputRefBack = useRef();
    const [selectedFronte, setSelectedFronte] = useState("");
    const [selectedRetro, setSelectedRetro] = useState("");

    const handleClickFront = () => {
        inputRefFront.current.click();
    };
    const handleClickBack = () => {
        inputRefBack.current.click();
    };

    const handleFileChangeFronte = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleChange(e);
            setSelectedFronte(file.name);
        }
    };
    const handleFileChangeRetro = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleChange(e);
            setSelectedRetro(file.name);
        }
    };

    const handleRemoveFileFronte = () => {
        console.log("remove file");
        setSelectedFronte("");
    };

    const handleRemoveFileRetro = () => {
        console.log("remove file");
        setSelectedRetro("");
    };

    return (
        <>
            <Grid container spacing={2}>
                {/*Fronte del documento (jpg, jpeg, png, pdf)*/}


                <Grid item xs={12}>
                    <TextField
                        type="text"
                        name="frontId"
                        onClick={handleClickFront}
                        value={selectedFronte}
                        sx={{
                            cursor: 'pointer',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={handleClickFront}>
                                        <FontAwesomeIcon icon={faIdBadge}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            readOnly: true,
                            // endAdornment: (
                            //     <InputAdornment position="end">
                            //         <IconButton onClick={handleRemoveFile}>
                            //             <Cancel/>
                            //         </IconButton>
                            //     </InputAdornment>
                            // ),
                        }}
                        fullWidth
                        required
                    />
                    <input
                        ref={inputRefFront}
                        type="file"
                        name="frontId"
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                        style={{display: 'none'}}
                        onChange={handleFileChangeFronte}

                    />
                </Grid>

                {/*Retro del documento (jpg, jpeg, png, pdf)*/}
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        name="backId"
                        onClick={handleClickBack}
                        value={selectedRetro}
                        sx={{
                            cursor: 'pointer',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={handleClickBack}>
                                        <FontAwesomeIcon icon={faIdBadge}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            readOnly: true,
                            // endAdornment: (
                            //     <InputAdornment position="end">
                            //         <IconButton onClick={handleRemoveFile}>
                            //             <Cancel/>
                            //         </IconButton>
                            //     </InputAdornment>
                            // ),
                        }}
                        fullWidth
                    />
                    <input
                        ref={inputRefBack}
                        type="file"
                        name="backId"
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                        style={{display: 'none'}}
                        onChange={handleFileChangeRetro}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={12}>
                    <Checkbox name="checkTerms"
                              checked={formData.checkTerms}
                              onChange={handleChange}
                              inputProps={{'aria-label': 'controlled'}}
                    />
                    <Typography variant="body2">
                        Accetto i <Link href="/terms" variant="body2">Termini e Condizioni</Link>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}