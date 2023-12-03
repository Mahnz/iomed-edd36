import {Gateway, Wallets} from "fabric-network";
import path from "path";
import {fileURLToPath} from 'url';
import fs from "fs";

import Patient from "../models/Paziente.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conPath = path.resolve(__dirname, "../connection.json");
const conJSON = fs.readFileSync(conPath, "utf8");
const conn = JSON.parse(conJSON);

const example = async (req, res) => {
    const gateway = new Gateway();
    try {
        //Instaurazione connessione con blockchain
        await gateway.connect(conn, {
            wallet: await Wallets.newFileSystemWallet("./wallet"),
            identity: "admin",
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork("mychannel");

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract("patientContract");

        //Eseguire funzione istantiate
        await contract.submitTransaction("istantiate");
        res.status(200).json("Istanziato");

        gateway.disconnect();

    } catch (e) {
        console.error(`Errore durante il richiamo della funzione: ${e.message}`);
        res.status(500).json(`Errore ${e.message}`);
        throw new Error("Errore durante il richiamo della funzione: ${e.message}")
    }
}

const addPatient = async (req, res) => {
    const gateway = new Gateway();

    try {
        //Instaurazione connessione con blockchain
        await gateway.connect(conn, {
            wallet: await Wallets.newFileSystemWallet("./wallet"),
            identity: "admin",
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork("mychannel");

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract("patientContract");

        //Eseguire funzione di inserimento paziente
        const p = new Patient(req.nome, req.cognome, req.cf);
        await contract.submitTransaction("createPatient", req.cf, p);
        res.status(200).json("Inserimento avvenuto correttamente");

        gateway.disconnect();

    } catch (e) {
        console.error(`Errore durante il richiamo della funzione: ${e.message}`);
        res.status(500).json(`Errore ${e.message}`);
        throw new Error("Errore durante il richiamo della funzione: ${e.message}")

    }
}

const deletePatient = async (req, res) => {
    const gateway = new Gateway();

    try {
        //Instaurazione connessione con blockchain
        await gateway.connect(conn, {
            wallet: await Wallets.newFileSystemWallet("./wallet"),
            identity: "admin",
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork("mychannel");

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract("patientContract");

        //Funzione di cancellazione paziente
        await contract.submitTransaction("deletePatient", req.cf);
        res.status(200).json("Eliminazione avvenuta correttamente");

        gateway.disconnect();

    } catch (e) {
        console.error(`Errore durante il richiamo della funzione: ${e.message}`);
        res.status(500).json(`Errore ${e.message}`);
        throw new Error("Errore durante il richiamo della funzione: ${e.message}")
    }
}

const updatePatient = async (req, res) => {
    const gateway = new Gateway();

    try {
        //Instaurazione connessione con blockchain
        await gateway.connect(conn, {
            wallet: await Wallets.newFileSystemWallet("./wallet"),
            identity: "admin",
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork("mychannel");

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract("patientContract");

        //Funzione di aggiornamento paziente
        await contract.submitTransaction("updatePatient", req.cf, req.nome);
        res.status(200).json("Aggiornamento effettuato con successo");

        gateway.disconnect();

    } catch (e) {
        console.error(`Errore durante il richiamo della funzione: ${e.message}`);
        res.status(500).json(`Errore ${e.message}`);
        throw new Error("Errore durante il richiamo della funzione: ${e.message}")
    }
}

const getPatient = async (req, res) => {
    const gateway = new Gateway();

    try {
        //Instaurazione connessione con blockchain
        await gateway.connect(conn, {
            wallet: await Wallets.newFileSystemWallet("./wallet"),
            identity: "admin",
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork("mychannel");

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract("patientContract");

        //funzione di lettura paziente
        const p = await contract.evaluateTransaction("getPatient", req.cf);
        res.status(200).json({message: "Lettura eseguita correttamente", value: p});

        gateway.disconnect();

    } catch (e) {
        console.error(`Errore durante il richiamo della funzione: ${e.message}`);
        res.status(500).json(`Errore ${e.message}`);
        throw new Error("Errore durante il richiamo della funzione: ${e.message}")
    }
}

export const bcController = {
    example,
    addPatient,
    deletePatient,
    updatePatient,
    getPatient
};


// module.exports = {
//     example: async (req, res) => {
//
//         const gateway = new Gateway();
//
//         try {
//             //Instaurazione connessione con blockchain
//             await gateway.connect(conn, {
//                 wallet: await Wallets.newFileSystemWallet("./wallet"),
//                 identity: "admin",
//                 discovery: {enabled: true, asLocalhost: true}
//             });
//
//             //Ritrovamento canale su cui è applicato il chaincode
//             const network = await gateway.getNetwork("mychannel");
//
//             //Ritrovamento smartContract da chaincode
//             const contract = network.getContract("patientContract");
//
//             //Eseguire funzione istantiate
//             await contract.submitTransaction("istantiate");
//             res.status(200).json("Istanziato");
//
//             gateway.disconnect();
//
//         } catch (e) {
//             console.error(`Errore durante il richiamo della funzione: ${e.message}`);
//             res.status(500).json(`Errore ${e.message}`);
//             throw new Error("Errore durante il richiamo della funzione: ${e.message}")
//         }
//     },
//
//     addPatient: async (req, res) => {
//         const gateway = new Gateway();
//
//         try {
//             //Instaurazione connessione con blockchain
//             await gateway.connect(conn, {
//                 wallet: await Wallets.newFileSystemWallet("./wallet"),
//                 identity: "admin",
//                 discovery: {enabled: true, asLocalhost: true}
//             });
//
//             //Ritrovamento canale su cui è applicato il chaincode
//             const network = await gateway.getNetwork("mychannel");
//
//             //Ritrovamento smartContract da chaincode
//             const contract = network.getContract("patientContract");
//
//             //Eseguire funzione di inserimento paziente
//             const p = new Patient(req.nome, req.cognome, req.cf);
//             await contract.submitTransaction("createPatient", req.cf, p);
//             res.status(200).json("Inserimento avvenuto correttamente");
//
//             gateway.disconnect();
//
//         } catch (e) {
//             console.error(`Errore durante il richiamo della funzione: ${e.message}`);
//             res.status(500).json(`Errore ${e.message}`);
//             throw new Error("Errore durante il richiamo della funzione: ${e.message}")
//
//         }
//     },
//
//     deletePatient: async (req, res) => {
//         const gateway = new Gateway();
//
//         try {
//             //Instaurazione connessione con blockchain
//             await gateway.connect(conn, {
//                 wallet: await Wallets.newFileSystemWallet("./wallet"),
//                 identity: "admin",
//                 discovery: {enabled: true, asLocalhost: true}
//             });
//
//             //Ritrovamento canale su cui è applicato il chaincode
//             const network = await gateway.getNetwork("mychannel");
//
//             //Ritrovamento smartContract da chaincode
//             const contract = network.getContract("patientContract");
//
//             //Funzione di cancellazione paziente
//             await contract.submitTransaction("deletePatient", req.cf);
//             res.status(200).json("Eliminazione avvenuta correttamente");
//
//             gateway.disconnect();
//
//         } catch (e) {
//             console.error(`Errore durante il richiamo della funzione: ${e.message}`);
//             res.status(500).json(`Errore ${e.message}`);
//             throw new Error("Errore durante il richiamo della funzione: ${e.message}")
//         }
//     },
//
//     updatePatient: async (req, res) => {
//         const gateway = new Gateway();
//
//         try {
//             //Instaurazione connessione con blockchain
//             await gateway.connect(conn, {
//                 wallet: await Wallets.newFileSystemWallet("./wallet"),
//                 identity: "admin",
//                 discovery: {enabled: true, asLocalhost: true}
//             });
//
//             //Ritrovamento canale su cui è applicato il chaincode
//             const network = await gateway.getNetwork("mychannel");
//
//             //Ritrovamento smartContract da chaincode
//             const contract = network.getContract("patientContract");
//
//             //Funzione di aggiornamento paziente
//             await contract.submitTransaction("updatePatient", req.cf, req.nome);
//             res.status(200).json("Aggiornamento effettuato con successo");
//
//             gateway.disconnect();
//
//         } catch (e) {
//             console.error(`Errore durante il richiamo della funzione: ${e.message}`);
//             res.status(500).json(`Errore ${e.message}`);
//             throw new Error("Errore durante il richiamo della funzione: ${e.message}")
//         }
//     },
//
//     getPatient: async (req, res) => {
//         const gateway = new Gateway();
//
//         try {
//             //Instaurazione connessione con blockchain
//             await gateway.connect(conn, {
//                 wallet: await Wallets.newFileSystemWallet("./wallet"),
//                 identity: "admin",
//                 discovery: {enabled: true, asLocalhost: true}
//             });
//
//             //Ritrovamento canale su cui è applicato il chaincode
//             const network = await gateway.getNetwork("mychannel");
//
//             //Ritrovamento smartContract da chaincode
//             const contract = network.getContract("patientContract");
//
//             //funzione di lettura paziente
//             const p = await contract.evaluateTransaction("getPatient", req.cf);
//             res.status(200).json({message: "Lettura eseguita correttamente", value: p});
//
//             gateway.disconnect();
//
//         } catch (e) {
//             console.error(`Errore durante il richiamo della funzione: ${e.message}`);
//             res.status(500).json(`Errore ${e.message}`);
//             throw new Error("Errore durante il richiamo della funzione: ${e.message}")
//         }
//     }
// }

