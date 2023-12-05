import React, {useState} from 'react';
import {Button, Input, List, ListItem, TextField, Typography} from '@mui/material';
import axios from "axios";

export default function TestIPFS() {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [username, setUsername] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            console.log("Nessun file selezionato");
            return;
        } else {
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append('file', file);
            });

            console.log("LOG: file presi in input")

            await axios.post('http://localhost:3001/api/ipfs/upload', formData, {
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(progress);
                    },
                },
                {
                    'Content-Type': 'multipart/form-data'
                })
                .then(res => {
                    console.log(res.statusText);
                    setUploadProgress(0);
                })
                .catch(error => {
                    console.error(error);
                    setUploadProgress(0);
                });
        }
    };

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };
    const handleReadFiles = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/ipfs/getFilesByUsername/${username}`);
            setFileList(response.data.fileList);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <Input type="file" name="file" onChange={handleFileChange}/>
                <Button variant="contained" color="primary" onClick={handleUpload}>UPLOAD</Button>
                {uploadProgress > 0 && <p>Progresso: {uploadProgress}%</p>}
            </div>

            <div>
                <Typography variant="h5" gutterBottom>
                    Inserisci l'username:
                </Typography>
                <TextField
                    id="usernameInput"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleReadFiles}>
                    Ottieni Elenco File
                </Button>

                <Typography variant="h6" gutterBottom style={{marginTop: '20px'}}>
                    Elenco dei file:
                </Typography>
                <List>
                    {fileList.map((file, index) => (
                        <ListItem key={index}>
                            <Typography>{file.name}</Typography>
                        </ListItem>
                    ))}
                </List>
            </div>
        </>
    );
};