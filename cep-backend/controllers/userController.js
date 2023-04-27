const userModel = require('../models/user');
const sessionModel = require("../models/session")

const test = (req, res, next) => {
    res.json({ message: "Vegeta's Final Flash!" }); // Check if the Api is working
}

const signup = async (req, res) => {
    console.log("Inside signup: ", req.body);

    try {
        let userPresent;
        userPresent = await userModel.findOne({ email: req.body.email });
        if (userPresent) {
            res.status(400).json({ message: "User already exists" });
        }
        else {
            const user = new userModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                type: req.body.type,
            });
            await user.save((err, result) => {
                if (err) {
                    console.log('Error saving the details: ', err);
                    res.status(500).json({ message: "Error saving the details" });
                }
                else {
                    console.log('User registered successfully!');
                    res.send(result);
                }
            });
        }
    }
    catch (err) {
        console.log('Error in signup: ', err);
        res.status(500).json({ message: "Error in signup" });
    }
}

const signin = async (req, res) => {
    console.log("Inside signin: ", req.body);

    try {
        let user;
        user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            res.status(400).json({ message: "User does not exist" });
        }
        else if (user.password !== req.body.password) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        else {
            //req.session.user = user; //If session in backend is required(for future use)
            console.log("User signed in successfully");
            console.log("User: ", user);
            res.status(200).send(user);
        }
    }
    catch (err) {
        console.log('Error in signin: ', err);
        res.status(500).json({ message: "Error in signin" });
    }
}

const sessionPost = async (req, res) => {
    console.log("Inside session: ", req.body);

    const { sessionId, fileUrl } = req.body;

    try {
        console.log(fileUrl)
        let pdf = await sessionModel.findOneAndUpdate(
            { sessionId },
            { sessionId, fileUrl },
            { upsert: true, new: true }
        );

        res.json(pdf);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

const sessionGet = async (req, res) => {
    console.log("Inside session heyeyeye: ", req.body);

    const { sessionId } = req.body;
    console.log(sessionId)
    try {
        const session = await sessionModel.findOne({ sessionId });

        if (!session) {
            return res.status(404).json({ msg: 'Session not found' });
        }
        console.log(session.fileUrl)
        res.json(session)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

module.exports = {
    test,
    signup,
    signin,
    sessionPost,
    sessionGet
}