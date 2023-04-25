import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import { backendURL } from '../utils/config';
import axios from 'axios';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: '0 auto',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
    media: {
        height: 140,
    },
    uploadButton: {
        margin: theme.spacing(1),
    },
    searchBar: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

function PdfUploader() {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(`${backendURL}/files/fetch`, { data: { email: userEmail } });
                setFiles(response.data);
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        };

        fetchFiles();
    }, [userEmail, files]);

    const handleUploadClick = () => {
        document.getElementById('pdf-upload').click();
    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('filename', file);
        try {
            setFiles([...files, file])
            const response = await axios.post(`${backendURL}/files/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    userEmail
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCardClick = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div>
            <Header />
            <div className={classes.searchBar}>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                        Uploaded Files
                    </Typography>
                    <input
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        id="pdf-upload"
                        type="file"
                        multiple
                        onChange={handleUpload}
                    />
                    <button className={classes.uploadButton} onClick={handleUploadClick}>
                        <CloudUploadIcon fontSize="large" />
                        Upload PDF
                    </button>
                </Grid>
                {files.map((file) => (
                    <Grid item key={file._id} xs={12} sm={6} md={4}>
                        <Card className={classes.root}>
                            <CardActionArea onClick={() => handleCardClick(file.fileUrl)}>
                                <CardMedia className={classes.media} title="File" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {file.fileName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {file.size}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default PdfUploader;