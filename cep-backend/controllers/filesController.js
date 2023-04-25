const express = require("express");
const { Router } = require("express");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const firebaseConfig = require("../database/firebaseconfig");
const router = express.Router();
const files = require('../models/files')

initializeApp(firebaseConfig);

const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("filename"), async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();
        const userEmail = req.body.email;
        const filesize = req.file.size / (1024*1024)
        const filesizeInMB = `${filesize.toFixed(2)} MB`
        console.log(filesizeInMB)

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        const file = await files.findOneAndUpdate(
            { userEmail },
            { $push: { files: { fileName: req.file.originalname, fileUrl: downloadURL, size: filesizeInMB } } },
            { new: true, upsert: true }
        );
        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
            
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

router.get("/fetch", async (req, res) => {
    const userEmail = req.body.email;

    try {
        const userFiles = await files.findOne({ userEmail });

        if (!userFiles) {
            return res.status(404).json({ message: 'No files found for this user' });
        }

        res.status(200).json(userFiles.files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
