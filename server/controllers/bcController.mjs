'use strict';
import {createRequire} from "module";
import Doctor from "../models/Dottore.js"
const require = createRequire(import.meta.url);
const {Gateway, Wallets} = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
import {ipfsController} from "./ipfsController.js";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {buildCAClient, registerAndEnrollUser, enrollAdmin} from "../../CAUtil.mjs";
import {buildCCPOrg1, buildWallet, prettyJSONString} from "../../AppUtil.mjs";
import Patient from "../models/Paziente.js";
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


const channelName = 'mychannel';
const chaincodeName = 'basic';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'javascriptAppUser';


const addPatient = async (req, res) => {
    const gateway = new Gateway();

    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        const pk=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

        //Inizio controlli
        console.log(req.body.formData);
        console.log(req.body.formData.docType);
        let q;
        if(req.body.formData.docType=="patient")
        {
            q = {
                selector: {
                    email: req.body.formData.email,
                }
            };

            console.log('\n--> Evaluate Transaction: Verifica paziente con stessa mail');
            let result = await contract.evaluateTransaction('QueryAssets', JSON.stringify(q));

            result=JSON.parse(prettyJSONString(result));

            if(result.length!=0)
                return res.status(409).json("Email associata già ad un altro utente");

            else
            {
                const p = new Patient(req.body.formData);
                console.log(p);
                let cid=await ipfsController.addUser(p.CF);
                p.cid=cid;

                console.log("inizio critto pass");
                const s=await bcrypt.genSalt(10);
                const pass=await bcrypt.hash(p.password,s);
                p.password=pass;

                console.log("Fine critto");

                console.log(p);

                console.log("Inizio transazione di aggiunta utente");

                const r=await contract.submitTransaction("createPatient", p.CF, JSON.stringify(p));
                gateway.disconnect();
                console.log(Buffer.from(r).toString());

                if(Buffer.from(r).toString()=="true")
                {
                    console.log("Aggiunta avvenuta");
                    return res.status(200).json("Inserimento avvenuto correttamente");
                }
                else
                {
                    console.log("Utente già esistente");
                    return res.status(409).json("Utente già esistente");
                }
            }
        }
        else
        {
            q = {
                selector: {
                    id: req.body.formData.id,
                }
            };

            console.log('\n--> Evaluate Transaction: Verifica medico con stesso id');
            let result = await contract.evaluateTransaction('QueryAssets', JSON.stringify(q));
            result=JSON.parse(prettyJSONString(result));

            if(result.length!=0)
                return res.status(409).json("Id già esistente, account creato in precedenza");
            else
            {
                let a= {
                    selector: {
                        email: req.body.formData.email
                    }
                };

                console.log('\n--> Evaluate Transaction: Verifica se esiste un paziente con la mail del medico');
                let r=await contract.evaluateTransaction('QueryAssets', JSON.stringify(a));

                r=JSON.parse(prettyJSONString(r));

                if(r.length==0)
                {
                    let d=new Doctor(req.body.formData);
                    console.log(d);
                    let cid=await ipfsController.addUser(d.CF);
                    d.cid=cid;

                    console.log("inizio critto pass");
                    let s=await bcrypt.genSalt(10);
                    let pass=await bcrypt.hash(d.password,s);
                    d.password=pass;

                    console.log("Fine critto");

                    console.log(d);

                    console.log("Inizio transazione di aggiunta medico");

                    const i=await contract.submitTransaction("createPatient", d.CF, JSON.stringify(d));
                    gateway.disconnect();
                    console.log(Buffer.from(i).toString());

                    if(Buffer.from(i).toString()=="true")
                    {
                        console.log("Aggiunta avvenuta");
                        return res.status(200).json("Inserimento avvenuto correttamente");
                    }
                    else
                    {
                        console.log("Utente già esistente");
                        return res.status(409).json("Utente già esistente");
                    }
                }
                else
                {
                    if(r[0].Record.docType=="doctor")
                        return res.status(409).json("Medico già registrato con questa mail");
                    else
                    {
                        console.log("Inizio operazione di update paziente a medico");
                        console.log(a);
                        console.log("Verifica password");
                        console.log(r[0].Record);
                        const verify=await bcrypt.compare(req.body.formData.password, r[0].Record.password);
                        if(verify)
                        {
                            let d=r[0].Record;
                            console.log(d);
                            d.id=req.body.formData.id;
                            d.hospital=req.body.formData.hospital;
                            d.telefonoUfficio=req.body.formData.telefonoUfficio;
                            d.spec=req.body.formData.spec;
                            console.log("Inizio transazione di modifica paziente in medico");
                            await contract.submitTransaction("updatePatient", d.CF, JSON.stringify(d));
                            res.status(200).json("Medico inserito correttamente da paziente");
                        }

                    }
                }
            }
        }
    } catch (e) {
        console.log(e);
        console.error(`Errore durante il richiamo della funzione`);
        res.status(500).json(`Errore`);
    }
}

const deletePatient = async (req, res) => {
    const gateway = new Gateway();

    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        const pk=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

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

        const pk=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

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

        const pk=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: {enabled: true, asLocalhost: true}
        });

        //Ritrovamento canale su cui è applicato il chaincode
        const network = await gateway.getNetwork(channelName);

        //Ritrovamento smartContract da chaincode
        const contract = network.getContract(chaincodeName);

        console.log("Ricerca iniziata");

        //funzione di lettura paziente
        const p = await contract.evaluateTransaction("getPatient", "1");
        console.log(p);

        console.log("Ricerca finita");

        gateway.disconnect();

    } catch (e) {
        console.log(e);
        console.error(`Errore durante il richiamo della funzione: ${e.message}`);
    }
}

const getAll = async (req, res) => {
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        const pk=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

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

        console.log(JSON.parse(prettyJSONString(result)));

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

        const pk=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

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

        const pk=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

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

        console.log('\n--> Evaluate Transaction: Login paziente');
        let result = await contract.evaluateTransaction('QueryAssets', JSON.stringify(q));

        result=JSON.parse(prettyJSONString(result));

        console.log("Verifica password");
        const verify=await bcrypt.compare(req.body.password, result[0].Record.password);

        console.log(result);
        console.log(verify);

        if(verify)
        {
            console.log("Andato tutto");
            res.status(200).json({CF: result[0].Record.CF, firstName: result[0].Record.firstName, lastName: result[0].Record.lastName});
        }

        else
        {
            console.log("Password diversa");
            res.status(401).json("Credenziali errate");
        }


        gateway.disconnect();
    } catch (e) {
        console.log(e);
        res.status(401).json("Accesso fallito");
    }
}

const loginM = async (req, res) => {
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        const pk=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

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
                id: req.body.id,
            },
        };

        console.log('\n--> Evaluate Transaction: Login');
        let result = await contract.evaluateTransaction('QueryAssets', JSON.stringify(q));

        result=JSON.parse(prettyJSONString(result));

        console.log("Verifica password");
        const verify=await bcrypt.compare(req.body.password, result[0].Record.password);

        if(verify)
        {
            console.log("Andato tutto");
            res.status(200).json({sessionid: 10});
        }

        else
        {
            console.log("Password diversa");
            res.status(401).json("Credenziali errate");
        }


        gateway.disconnect();
    } catch (e) {
        res.status(401).json("Accesso fallito");
    }
}

const testpv = async (req, res) => {
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        let p=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        console.log("Test pv");

        console.log(p);

        gateway.disconnect();
    } catch (e) {
        res.status(401).json("Accesso fallito");
    }
}

export const bcController = {
    addPatient,
    deletePatient,
    updatePatient,
    getPatient,
    getAll,
    query,
    login,
    loginM,
    testpv
};

