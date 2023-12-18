import * as React from 'react'
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField, InputAdornment, Typography, IconButton, Tooltip
} from '@mui/material'
import province from "../../province.js";
import {Cancel, Fax, LocalPhone, Place} from "@mui/icons-material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIdBadge} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";


export default function Contatti({formData, handleChange, errors}) {
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
                <Grid item xs={12} md={6}>
                    <TextField name="province"
                               label="Provincia di residenza"
                               select
                               value={formData.province}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               required
                               error={errors.province}
                               helperText={errors.province && 'Campo obbligatorio'}
                    >
                        <MenuItem value="" disabled>Seleziona la provincia</MenuItem>
                        {province.map((province, index) => (
                            <MenuItem key={index} value={province}>
                                {province}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type="text"
                               name="city"
                               label="Comune di residenza"
                               value={formData.city}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               required
                               error={errors.city}
                               helperText={errors.city && 'Campo obbligatorio'}
                    />
                </Grid>
                <Grid item xs={3} md={3}>
                    <TextField type="text"
                               name="cap"
                               label="CAP"
                               value={formData.cap}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               InputProps={{
                                   minLength: 5,
                                   maxLength: 5
                               }}
                               inputProps={{
                                   minLength: 5,
                                   maxLength: 5
                               }}
                               required
                               error={errors.cap}
                               helperText={errors.cap && 'Campo obbligatorio'}
                    />
                </Grid>
                <Grid item xs={9} md={9}>
                    <TextField type="text"
                               name="address"
                               label="Indirizzo di residenza"
                               value={formData.address}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Place/>
                                       </InputAdornment>
                                   ),
                               }}
                               required
                               error={errors.address}
                               helperText={errors.address && 'Campo obbligatorio'}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <TextField type="text"
                               name="telefono"
                               label="Numero di telefono"
                               value={formData.telefono}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <LocalPhone/>
                                       </InputAdornment>
                                   ),
                                   minLength: 10,
                                   maxLength: 10
                               }}
                               inputProps={{
                                   minLength: 10,
                                   maxLength: 10
                               }}
                               required
                               error={errors.telefono}
                               helperText={errors.telefono && 'Campo obbligatorio'}
                    />
                </Grid>

                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom>
                            Fronte (<em>jpg, jpeg, png, pdf</em>)
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
                            helperText={errors.frontID && 'Campo obbligatorio'}
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

                    <Grid item xs={6}>
                        <Typography variant="subtitle1" gutterBottom>
                            Retro (<em>jpg, jpeg, png, pdf</em>)
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
                            helperText={errors.backID && 'Campo obbligatorio'}
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
                </Grid>
            </Grid>
        </>
    )
}