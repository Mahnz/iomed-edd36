'use strict';
import {createRequire} from "module";

const require = createRequire(import.meta.url);
const {Gateway, Wallets} = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {buildCAClient, registerAndEnrollUser, enrollAdmin} from "../../CAUtil.mjs";
import {buildCCPOrg1, buildWallet, prettyJSONString} from "../../AppUtil.mjs";
import Patient from "../models/Paziente.js";


const channelName = 'mychannel';
const chaincodeName = 'basic';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'javascriptAppUser';
const ccp =

    function prettyJSONString(inputString) {
        return JSON.stringify(JSON.parse(inputString), null, 2);
    }

const example = async (req, res) => {
    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        console.log("Prima dell'errore")

        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        console.log("Dopo l'errore")

        // Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        // Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

        // Eseguire funzione istantiate
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
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

        //Eseguire funzione di inserimento paziente
        const p = JSON.stringify(new Patient(req.body.formData));
        console.log(p);
        console.log(req.body.formData.CF);

        console.log("Inizio transazione di aggiunta utente");

        await contract.submitTransaction("createPatient", 50, p);
        res.status(200).json("Inserimento avvenuto correttamente");

        gateway.disconnect();

        console.log("Aggiunta avvenuta");

    } catch (e) {
        console.error(`Errore durante il richiamo della funzione`);
        res.status(500).json(`Errore`);
        throw new Error("Errore durante il richiamo della funzione")

    }
}

const deletePatient = async (req, res) => {
    const gateway = new Gateway();

    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

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
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

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
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

        //funzione di lettura paziente
        const p = await contract.evaluateTransaction("getPatient", req.cf);
        res.status(200).json({message: "Lettura eseguita correttamente",  value: p});

        gateway.disconnect();

    } catch (e) {
        console.error(`Errore durante il richiamo della funzione: ${e.message}`);
        res.status(500).json(`Errore ${e.message}`);
        throw new Error("Errore durante il richiamo della funzione: ${e.message}")
    }
}

const getAll = async (req, res) => {
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        const gateway = new Gateway();

        await gateway.connect(ccp, {
            wallet: wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

        console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
        let result = await contract.evaluateTransaction('GetAllAssets');

        console.log(prettyJSONString(result));

        gateway.disconnect();
    } catch (e) {
        console.log(e);
    }
}


const query = async (req, res) => {
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        const gateway = new Gateway();

        await gateway.connect(ccp, {
            wallet: wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

        const q = {
            selector: {
                name: "Giovanni",
            },
        };

        console.log(q);

        console.log('\n--> Evaluate Transaction: QueryAssets, assets of name Domenico');
        const result = await contract.evaluateTransaction('QueryAssets', JSON.stringify(q));

        console.log(prettyJSONString(result));

        gateway.disconnect();
    } catch (e) {
        console.log(e);
    }
}

const login = async (req, res) => {
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        const gateway = new Gateway();

        await gateway.connect(ccp, {
            wallet: wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

        const q = {
            selector: {
                email: req.body.email,
            },
        };

        console.log(q);

        console.log('\n--> Evaluate Transaction: Login');
        const result = await contract.evaluateTransaction('QueryAssets', JSON.stringify(q));

        console.log(prettyJSONString(result));

        gateway.disconnect();
    } catch (e) {
        console.log(e);
    }
}

export const bcController = {
    example,
    addPatient,
    deletePatient,
    updatePatient,
    getPatient,
    getAll,
    query,
    login
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

