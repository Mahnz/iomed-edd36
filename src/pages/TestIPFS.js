import React, {useState} from 'react';
import {Button, Input} from '@mui/material';
import axios from 'axios';


export default function TestIPFS() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post("http://localhost:3001/upload", formData);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Input type="file" onChange={handleFileChange}/>
            <Button variant="contained" color="primary" onClick={handleUpload}>UPLOAD</Button>
        </div>
    );
};