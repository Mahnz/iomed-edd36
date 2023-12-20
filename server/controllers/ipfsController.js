import {create} from 'ipfs-http-client'

const address = 'http://127.0.0.1:5002'
const connect = async (req, res) => {
    const ipfs = create(new URL("http://127.0.0.1:5002"))
    const isOnline = ipfs.isOnline()

    if (isOnline) {
        console.log("IPFS online: " + address)
        return ipfs
    } else {
        console.log("IPFS offline")
    }
}

const addUser = async (cf) => {
    const ipfs = await connect()
    const userDirectory = `/patients/${cf}`
    try {
        await ipfs.files.mkdir(userDirectory, {parents: true})
        const dirObj = await ipfs.files.stat(userDirectory)
        console.log(`DIRECTORY: '${userDirectory}' - CID: ${dirObj.cid.toString()}`)
        return dirObj.cid.toString()
    } catch (err) {
        console.error(err)
    }
}

const addVisita = async (req, res) => {
    const ipfs = await connect()
    // const files = req.files

    // const userDirectoryCID = await addUser(username, ipfs)
    try {
        const codiceFiscale = req.body.codiceFiscale
        const userDirectory = `/patients/${codiceFiscale}`
        const objUser = await ipfs.files.stat(userDirectory);
        console.log(`DIRECTORY '${codiceFiscale}': - CID: ${objUser.cid.toString()}`);

        const visitaDetails = {
            nomeVisita: req.body.nomeVisita,
            reparto: req.body.reparto,
            descrizione: req.body.descrizione,
        };

        const stringJSON = JSON.stringify(visitaDetails)
        console.log(stringJSON)

        const pathJSON = `${userDirectory}/details.json`;
        console.log("DIRECTORY JSON: " + pathJSON + "\n")
        await ipfs.files.write(pathJSON, stringJSON, {create: true, parents: true});

        const objJSON = await ipfs.files.stat(pathJSON);
        console.log("FILE: details.json: " + objJSON.cid.toString() + "\n")

        console.log(ipfs.files.read(pathJSON))
        //     for (let file of files) {
        //         console.log("Nome del file: " + file.originalname)
        //         console.log("Tipo MIME: " + file.mimetype)
        //         console.log("Dimensione: " + file.size + "\n")
        //         console.log("- - - - - - - - - - - - - - - - - - - - - - - -")
        //
        //         const filePath = `/users/${username}/cartellaTest/${file.originalname}`
        //         await ipfs.files.write(filePath, file.buffer, {create: true, parents: true})
        //
        //         const fileObj = await ipfs.files.stat(filePath)
        //         const dirObj = await ipfs.files.stat(userDirectory)
        //         console.log(`FILE: ${file.originalname} - CID: ${fileObj.cid.toString()}`)
        //         console.log(`DIRECTORY: '${userDirectory}' - CID: ${dirObj.cid.toString()}`)
        //         res.status(200).json({success: true, fileCID: fileObj.cid.toString()})
        //     }
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

const getFilesByUsername = async (req, res) => {
    const ipfs = await connect()
    const username = req.params.username
    const dirPath = `/users/${username}`
    const filesList = []
    let directoryExists = true;

    try {
        console.log(`Richiesta elenco file per l'utente '${username}'`)
        if (directoryExists) {
            console.log(`Controllo sulla directory '${dirPath}'`)
            for await (let file of ipfs.files.ls(dirPath)) {
                console.log(file.name)
                filesList.push(file)
            }
            console.log(`Elenco dei file nella directory '${dirPath}':`, filesList)
            res.status(200).json({success: true, fileList: filesList})
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const ipfsController = {
    connect,
    addUser,
    getFilesByUsername,
    addVisita,
}