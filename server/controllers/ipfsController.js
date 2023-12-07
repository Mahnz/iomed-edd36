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

const saveToIpfs = async (req, res) => {
    const username = "test"
    const ipfs = await connect()
    const files = req.files
    // const userDirectoryCID = await addUser(username, ipfs)
    const userDirectory = `/users/${username}`
    try {
        for (let file of files) {
            console.log("Nome del file: " + file.originalname)
            console.log("Tipo MIME: " + file.mimetype)
            console.log("Dimensione: " + file.size + "\n")
            console.log("- - - - - - - - - - - - - - - - - - - - - - - -")

            const filePath = `/users/${username}/${file.originalname}`
            await ipfs.files.write(filePath, file.buffer, {create: true, parents: true})

            const fileObj = await ipfs.files.stat(filePath)
            const dirObj = await ipfs.files.stat(userDirectory)
            console.log(`FILE: ${file.originalname} - CID: ${fileObj.cid.toString()}`)
            console.log(`DIRECTORY: '${filePath}' - CID: ${dirObj.cid.toString()}`)
            res.status(200).json({success: true, fileCID: fileObj.cid.toString()})
        }
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
    getFilesByUsername,
    saveToIpfs,
}