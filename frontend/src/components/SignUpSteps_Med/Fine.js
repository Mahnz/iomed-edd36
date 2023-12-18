// Fine.js
import React, {useRef, useState} from 'react'
import {
    Grid,
    TextField,
    InputAdornment,
    Checkbox,
    Typography,
    Link,
    IconButton, FormControlLabel, Tooltip
} from '@mui/material'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIdBadge} from "@fortawesome/free-solid-svg-icons";
import {Cancel} from "@mui/icons-material";


export default function Fine({formData, handleChange, errors}) {
    const inputRefFront = useRef();
    const inputRefBack = useRef();
    const [selectedFronte, setSelectedFronte] = useState("");
    const [selectedRetro, setSelectedRetro] = useState("");

    const handleClick = (value) => {
        if (value === 'fronte') {
            inputRefFront.current.click();
        } else if (value === 'retro') {
            inputRefBack.current.click();
        }
    };

    const handleUploadFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (e.target.name === 'frontID') {
                handleChange(e);
                setSelectedFronte(file.name);
            } else if (e.target.name === 'backID') {
                handleChange(e);
                setSelectedRetro(file.name);
            }
        }
    }

    const handleRemoveFile = (value) => {
        if (value === 'fronte') {
            console.log("Rimozione file: " + value);
            setSelectedFronte("");
        } else if (value === 'retro') {
            console.log("Rimozione file: " + value);
            setSelectedRetro("");
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        Fronte del documento (jpg, jpeg, png, pdf)
                    </Typography>
                    <TextField
                        type="text"
                        name="frontID"
                        onClick={() => handleClick('fronte')}
                        value={selectedFronte === "" ? "Clicca per selezionare un file" : selectedFronte}
                        sx={{
                            cursor: 'pointer',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={() => handleClick('fronte')}>
                                        <FontAwesomeIcon icon={faIdBadge}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {selectedFronte !== "" && (
                                        <Tooltip title="Cambia file">
                                            <IconButton onClick={() => handleRemoveFile('fronte')}>
                                                <Cancel/>
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </InputAdornment>
                            ),
                            readOnly: true
                        }}
                        fullWidth
                        required
                        error={errors.frontID}
                        helperText={errors.frontID && 'Inserire il fronte del proprio documento'}
                    />
                    <input
                        ref={inputRefFront}
                        type="file"
                        name="frontID"
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                        style={{display: 'none'}}
                        onChange={handleUploadFile}

                    />
                </Grid>

                <Grid item xs={12} sx={{mt: 2}}>
                    <Typography variant="subtitle1" gutterBottom>
                        Retro del documento (jpg, jpeg, png, pdf)
                    </Typography>
                    <TextField
                        type="text"
                        name="backID"
                        onClick={() => handleClick('retro')}
                        value={selectedRetro === "" ? "Clicca per selezionare un file" : selectedRetro}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={() => handleClick('retro')}>
                                        <FontAwesomeIcon icon={faIdBadge}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {selectedFronte !== "" && (
                                        <Tooltip title="Cambia file">
                                            <IconButton onClick={() => handleRemoveFile('retro')}>
                                                <Cancel/>
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </InputAdornment>
                            ),
                            readOnly: true,
                        }}
                        fullWidth
                        required
                        error={errors.backID}
                        helperText={errors.backID && 'Inserire il retro del proprio documento'}
                    />
                    <input
                        ref={inputRefBack}
                        type="file"
                        name="backID"
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                        style={{display: 'none'}}
                        onChange={handleUploadFile}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkTerms"
                                checked={formData.checkTerms}
                                onChange={handleChange}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                        }
                        label={
                            <Typography variant="body1">
                                Accetto i <Link href="/terms" variant="body1">Termini e Condizioni</Link>
                            </Typography>
                        }
                        // error={errors.checkTerms}
                        // helperText={errors.checkTerms && 'È necessario accettare i termini e le condizioni'}
                    />
                </Grid>
            </Grid>
        </>
    )
}