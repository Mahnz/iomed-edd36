import {create} from 'ipfs-http-client'
import all from 'it-all'

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
        await ipfs.files.mkdir(userDirectory)
        const dirObj = await ipfs.files.stat(userDirectory)
        console.log(`DIRECTORY: '${userDirectory}' - CID: ${dirObj.cid.toString()}`)
        return dirObj.cid.toString()
    } catch (err) {
        console.error(err)
    }
}


const addVisita = async (req, res) => {
    const ipfs = await connect()
    const codiceFiscale = req.body.codiceFiscale
    const userDirectory = `/patients/${codiceFiscale}`

    try {
        const visitaDetails = {
            nomeVisita: req.body.nomeVisita,
            medico: req.body.medico,
            reparto: req.body.reparto,
            descrizione: req.body.descrizione,
            lastUpdate: new Date(),
        }

        // ? CREAZIONE DELLA CARTELLA DELLA VISITA
        const visitaDirectory = userDirectory + "/"
            + visitaDetails.lastUpdate.getDate() + "."
            + (visitaDetails.lastUpdate.getMonth() + 1) + "."
            + visitaDetails.lastUpdate.getFullYear() + "-"
            + visitaDetails.medico
        await ipfs.files.mkdir(visitaDirectory, {parents: true})

        // ? SCRITTURA SU IPFS DEL FILE 'dettagli.json'
        const stringJSON = JSON.stringify(visitaDetails)
        await ipfs.files.write(visitaDirectory + '/details.json', stringJSON, {create: true});

        // const objUser = await ipfs.files.stat(userDirectory);
        // console.log(`DIRECTORY '${codiceFiscale}' CID: ${objUser.cid.toString()}`);
        // const objJSON = await ipfs.files.stat(visitaDirectory + '/details.json');
        // console.log("FILE: details.json: " + objJSON.cid.toString() + "\n")

        const allegati = req.files

        if (allegati && allegati.length > 0) {
            for (const file of allegati) {
                console.log("- - - - - - - - - - - - - - - - - - - - - - - -")
                console.log(file.toString())
                console.log("Nome del file: " + file.originalname)
                console.log("Tipo MIME: " + file.mimetype)
                console.log("Dimensione: " + file.size + "\n")

                const filePath = visitaDirectory + "/" + file.originalname
                await ipfs.files.write(filePath, file.buffer, {create: true})

                const fileObj = await ipfs.files.stat(filePath)
                const dirObj = await ipfs.files.stat(userDirectory)
                console.log(`FILE: ${file.originalname} - CID: ${fileObj.cid.toString()}`)
                console.log(`DIRECTORY: '${userDirectory}' - CID: ${dirObj.cid.toString()}`)
            }
            res.status(200).json({success: true})
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

const saveToIpfs = async (req, res) => {
    const ipfs = await connect()
    const userDirectory = "/patients/MZZDNC02B23A662Z"
    const files = req.files
    try {
        for (let file of files) {
            console.log("Nome del file: " + file.originalname)
            console.log("Tipo MIME: " + file.mimetype)
            console.log("Dimensione: " + file.size + "\n")
            console.log("- - - - - - - - - - - - - - - - - - - - - - - -")

            const filePath = `${userDirectory} /${file.originalname}`
            await ipfs.files.write(filePath, file.buffer, {create: true, parents: true})

            const fileObj = await ipfs.files.stat(filePath)
            const dirObj = await ipfs.files.stat(userDirectory)
            console.log(`FILE: ${file.originalname} - CID: ${fileObj.cid.toString()}`)
            console.log(`DIRECTORY: '${userDirectory}' - CID: ${dirObj.cid.toString()}`)
            res.status(200).json({success: true, fileCID: fileObj.cid.toString()})
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

const getVisiteByUsername = async (req, res) => {
    const ipfs = await connect()
    const username = req.params.username
    const dirPath = ` / patients /${username}`
    const filesList = []

    try {
        console.log(`Richiesta elenco file per l'utente '${username}'`)
        console.log(`Controllo sulla directory '${dirPath}'`)
        let rootDirectoryContents = await all(ipfs.files.ls(dirPath))
        // console.log("Elenco di file: " + rootDirectoryContents)
        console.log("Numero di file: " + rootDirectoryContents.length)

        // ? LETTURA DEL FILE dettagli.json DALLA CARTELLA DELLA VISITA
        const chunks = [];
        for await (const chunk of ipfs.files.read(`${visitaDirectory}/details.json`)) {
            chunks.push(chunk);
        }
        const fileContent = Buffer.concat(chunks).toString();
        console.log(JSON.parse(fileContent));


        for (const file of rootDirectoryContents) {
            const filePath = `${dirPath}/${file.name}`
            const fileContent = await ipfs.files.read(filePath, {timeout: 10000})

            filesList.push({name: file.name, content: contentString});
        }
        console.log("Contenuto dei file:", filesList);

        // console.log(`Elenco dei file nella directory '${dirPath}':`, filesList)
        res.status(200).json({success: true, fileList: filesList})
    } catch (err) {
        console.log(`Errore nella lettura della directory '${dirPath}'`)
        // console.log("Numero di file: " + filesList.length)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

const removePatient = async (username) => {
    const ipfs = await connect()
    const userDirectory = `/patients/${username}`
    try {
        await ipfs.files.rm(userDirectory, {recursive: true})
        console.log(`Rimossa directory '${userDirectory}'`)
    } catch (err) {
        console.error(err)
    }
}

export const ipfsController = {
    connect,
    addUser,
    getVisiteByUsername,
    addVisita,
    saveToIpfs
}