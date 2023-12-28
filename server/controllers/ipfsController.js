import {create} from 'ipfs-http-client'
import all from 'it-all'
import {bcController} from "./bcController.mjs";
import {concat as uint8ArrayConcat} from "uint8arrays";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const jwt=require("jsonwebtoken");

const address = 'http://127.0.0.1:5002'
const connect = async (req, res) => {
    const ipfs = create(new URL(address))
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

    //TODO - Aggiunta convalida bc
    const pk=await bcController.enrolling();
    console.log(req.body.medico);
    console.log(pk);
    const id=await jwt.verify(req.body.medico,pk);


    try {
        const visitaDetails = {
            medico: id,
            dataVisita: req.body.dataVisita,
            nomeVisita: req.body.nomeVisita,
            reparto: req.body.reparto,
            descrizione: req.body.descrizione,
            lastUpdate: new Date()
        }

        // ? CREAZIONE DELLA CARTELLA DELLA VISITA
        const visitaDirectory = userDirectory + "/"
            + visitaDetails.nomeVisita + "!"
            + visitaDetails.medico + "!"
            + visitaDetails.dataVisita

        await ipfs.files.mkdir(visitaDirectory, {parents: true})

        // ? SCRITTURA SU IPFS DEL FILE 'dettagli.json'
        const stringJSON = JSON.stringify(visitaDetails)
        await ipfs.files.write(visitaDirectory + '/details.json', stringJSON, {create: true});

        const allegati = req.files

        if (allegati && allegati.length > 0) {
            for (const file of allegati) {
                console.log("- - - - - - - - - - - - - - - - - - - - - -")
                console.log("Nome del file: " + file.originalname)
                console.log("Tipo MIME: " + file.mimetype)

                const filePath = visitaDirectory + "/" + file.originalname
                await ipfs.files.write(filePath, file.buffer, {create: true})
            }
        }
        res.status(200).json({success: true})
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

// ! METODO DI TEST, DA ELIMINARE
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

const getAllVisiteByCF = async (req, res) => {
    const ipfs = await connect()
    const cf = req.params.codiceFiscale
    const dirPath = `/patients/${cf}/`
    const visiteList = []

    try {
        console.log(`Controllo sulla directory '${dirPath}'`)
        const visiteDirectories = await ipfs.files.ls(dirPath)

        for await (const element of visiteDirectories) {
            const visitaData = element.name.split('!')
            const visita = {
                codiceFiscale: cf,
                fullName: element.name,
                nomeVisita: visitaData[0],
                medico: visitaData[1],
                dataVisita: visitaData[2]
            }
            visiteList.push(visita)
        }
        console.log("Visite presenti: ", visiteList.length)
        res.status(200).json({success: true, visite: visiteList})
    } catch (err) {
        console.log(`Errore nella lettura della directory '${dirPath}'`)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

const getSingleVisitaByCF = async (req, res) => {
    const ipfs = await connect()
    const cf = req.params.codiceFiscale
    const nomeVisita = req.params.nomeVisita
    const dirPath = `/patients/${cf}/${nomeVisita}`

    let details = {}
    let filesList = []

    try {
        console.log(`Lettura dei file in '${dirPath}'`)

        const files = await ipfs.files.ls(dirPath)
        for await (const element of files) {
            if (element.name === "details.json") {
                console.log("- - - - - - - - - - - - - - - - - - - - - - -")
                const chunks = []
                for await (const chunk of ipfs.files.read(`${dirPath}/details.json`)) {
                    chunks.push(chunk)
                }
                const content = Buffer.concat(chunks).toString('utf8')
                details = JSON.parse(content)
                console.log("Dettagli della visita:", details)
                console.log("- - - - - - - - - - - - - - - - - - - - - - -")
            } else {
                filesList.push({name: element.name, size: element.size})
            }
        }
        console.log("Elenco di file allegati:", filesList)
        res.status(200).json({success: true, details: details, files: filesList})
    } catch (err) {
        console.log(`Errore nella lettura della directory '${dirPath}'`)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

const downloadFile = async (req, res) => {
    const ipfs = await connect()
    const cf = req.params.codiceFiscale
    const nomeVisita = req.params.nomeVisita
    const filename = req.params.filename;
    const filePath = `/patients/${cf}/${nomeVisita}/${filename}`;

    try {
        const data = uint8ArrayConcat(await all(ipfs.files.read(filePath)));
        // console.log("Data: " + data)
        res.setHeader('Content-Type', 'application/octet-stream'); // Imposta il tipo di contenuto come dati binari
        res.send(Buffer.from(data));
    } catch (error) {
        console.error(error);
        console.log(`Errore nella lettura di '${filename}'`)
        res.status(500).json({error: 'Internal Server Error'});
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
    addVisita,
    getAllVisiteByCF,
    getSingleVisitaByCF,
    downloadFile,
    saveToIpfs
}
