const fs = require('fs');
const { exec } = require('child_process');
const codeHelper = require('../helpers/codeHelper');

const compile = ( req, res, next ) => {
    console.log("Inside compile: ", req.body);
    let code = req.body.code;
    let input = req.body.input;
    let id = req.body.id;
    let lang = req.body.lang;


    const sourceExt = {
        'cpp': '.cpp',
        'java': '.java',
        'python': '.py',
    }

    const command = {
        'cpp': `cd ${id} && g++ Main.cpp -o out && ./out < input.txt`,
        'java': `cd ${id} && javac Main.java && java Main < input.txt`,
        'python': `cd ${id} && python3 Main.py < input.txt`,
    }


    codeHelper.createDir(id);
    codeHelper.createFile(`./${id}/Main`, sourceExt[lang], code);
    codeHelper.createFile(`./${id}/input`, '.txt', input);

    exec(command[lang], (error, stdout, stderr) => {
        codeHelper.removeDir(id);
        if (stderr) {

            res.status(400).json(stderr);
        }
        else
            res.send(stdout);
    });
}



module.exports = {
    compile
}
