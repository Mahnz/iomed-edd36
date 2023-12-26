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
const org1UserId = 'javascriptAppUser1';



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
                    let CF=await jwt.sign(p.CF, pk)
                    return res.status(200).json({CF: CF, firstName: p.firstName, lastName: p.lastName});
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
                        let id= await jwt.sign(d.id, pk);
                        return res.status(200).json({id: id, firstName: d.firstName, lastName: d.lastName});
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
                            let id=await jwt.sign(d.id, pk);
                            res.status(200).json({id: id, firstName:d.firstName, lastName: d.lastName});
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

const getPatient = async (req, res) => {
    const gateway = new Gateway();

    if(req.params.token==null)
        return res.status(401).json("Non autorizzato");

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

        console.log("Ritrovo il CF");

        let CF=await jwt.verify(req.params.token, pk);

        console.log("CF: "+CF);

        console.log("Ricerca iniziata");

        let q={
            selector:
                {
                    CF: CF
                }
        }

        //funzione di lettura paziente
        let p = await contract.evaluateTransaction("QueryAssets", JSON.stringify(q));
        p=JSON.parse(prettyJSONString(p));

        console.log("Ricerca finita");
        console.log(p);

        gateway.disconnect();

        return res.status(200).json(p);

    } catch (e) {
        console.log(e);
        console.error(`Errore durante il richiamo della funzione: ${e.message}`);
        res.status(500).json("Errore");
    }
}

const getDoctor = async (req, res) => {
    const gateway = new Gateway();

    if(req.params.token==null)
        return res.status(401).json("Non autorizzato");

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

        console.log("Ritrovo il CF");

        let id=await jwt.verify(req.params.token, pk);

        console.log("CF: "+CF);

        console.log("Ricerca iniziata");

        let q={
            selector:
                {
                    id: id
                }
        }

        //funzione di lettura paziente
        let p = await contract.evaluateTransaction("QueryAssets", JSON.stringify(q));
        p=JSON.parse(prettyJSONString(p));

        console.log("Ricerca finita");
        console.log(p);

        gateway.disconnect();

        return res.status(200).json(p);

    } catch (e) {
        console.log(e);
        console.error(`Errore durante il richiamo della funzione: ${e.message}`);
        res.status(500).json("Errore");
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
            let CF= await jwt.sign(result[0].Record.CF, pk)
            res.status(200).json({CF: CF, firstName: result[0].Record.firstName, lastName: result[0].Record.lastName});
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
            let id=await jwt.sign(result[0].Record.id, pk)
            res.status(200).json({id: id, firstName: result[0].Record.firstName, lastName: result[0].Record.lastName});
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

const enrolling=async () => {
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        let p=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        return p;

    } catch (e) {
        res.status(409).json("Non autorizzato");
    }
}

const verify=async (req,res) =>{
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

        console.log("Verifico esistenza cf");

        //funzione di lettura paziente
        let aux = await contract.evaluateTransaction("patientExist", req.body);
        console.log(aux);

        console.log("Ricerca finita");

        gateway.disconnect();

        if(aux)
            return res.status(200).json("CF trovato");
        else
            return res.status(404).json("Non trovato")

    } catch (e) {
        console.log(e);
        res.status(404).json("Errore");
    }
}

const addRequest=async(req,res)=>{
    const gateway = new Gateway();
    let v=[];

    if(req.body.token==null)
        return res.status(401).json("Errore autenticazione");

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

        console.log("Decriptiamo l'id del medico che sta passando tramite token");
        let id= await jwt.verify(req.body.token,pk);

        console.log("Troviamo il paziente con il CF specificato");
        let qU= {
            selector:
                {
                    CF: req.body.CF
                }
        }

        let user=await contract.evaluateTransaction("QueryAssets", JSON.stringify(qU));
        user=JSON.parse(prettyJSONString(user));
        user=user[0].Record;


        if(user.doctors.includes(id))
            return res.status(402).json("Il paziente le ha già fornito l'autorizzazione");
        else if (user.requests.includes(id))
            return res.status(402).json("E' già stata inviata una richiesta al paziente");
        else
        {
            console.log("Inizio aggiunta richiesta");
            user.requests.push(id);
            await contract.submitTransaction("updatePatient", user.CF, JSON.stringify(user));
            gateway.disconnect();
            return res.status(200).json("Richiesta aggiunta");
        }

    } catch (e) {
        console.log(e);
        res.status(404).json("Errore");
    }
}

const confirmRequest= async (req,res) => {
    const gateway = new Gateway();

    if(req.body.token==null)
        return res.status(401).json("Errore autenticazione");

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

        console.log("Decriptiamo il CF dell'utente che sta passando tramite token");
        let CF= await jwt.verify(req.body.token,pk);

        console.log("Troviamo il paziente col CF");
        let qU= {
            selector:
                {
                    CF: CF
                }
        }

        let user=await contract.evaluateTransaction("QueryAssets", JSON.stringify(qU));
        user=JSON.parse(prettyJSONString(user));
        user=user[0].Record;

        console.log("Aggiungiamo il medico della richiesta ai dottori autorizzati");
        user.doctors.push(req.body.id);
        console.log("Rimuoviamo la richiesta dalle pendenti");
        user.requests=user.requests.filter(e=> e!=req.body.id);

        await contract.submitTransaction("updatePatient", CF, JSON.stringify(user));
        gateway.disconnect();

        return res.status(200).json("Conferma richiesta avvenuta");


    } catch (e) {
        console.log(e);
        res.status(404).json("Errore");
    }
}

const deleteRequest= async (req,res) =>{
    const gateway = new Gateway();

    if(req.body.token==null)
        return res.status(401).json("Errore autenticazione");

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

        console.log("Decriptiamo il CF dell'utente che sta passando tramite token");
        let CF= await jwt.verify(req.body.token,pk);

        console.log("Troviamo il paziente col CF");
        let qU= {
            selector:
                {
                    CF: CF
                }
        }

        let user=await contract.evaluateTransaction("QueryAssets", JSON.stringify(qU));
        user=JSON.parse(prettyJSONString(user));
        user=user[0].Record;

        console.log("Rimuoviamo la richiesta che non viene accettata");
        user.requests=user.requests.filter(e=> e!=req.body.id);

        await contract.submitTransaction("updatePatient", CF, JSON.stringify(user));
        gateway.disconnect();

        return res.status(200).json("Rimozione richiesta effettuata");

    } catch (e) {
        console.log(e);
        res.status(404).json("Errore");
    }
}

const getDoctors= async (req,res) => {
    const gateway = new Gateway();
    let v=[];

    console.log("Inizio ricerca dottori");
    console.log("Parametri:");
    console.log(req.params);

    if(req.params.token==null)
        return res.status(401).json("Errore autenticazione");

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

        console.log("Decriptiamo il CF dell'utente che sta passando tramite token");
        let CF= await jwt.verify(req.params.token,pk);

        console.log("CF trovato: "+CF);
        let q={
            selector:
                {
                    CF: CF
                }
        }
        console.log("Troviamo il paziente col CF");
        let user=await contract.evaluateTransaction("QueryAssets", JSON.stringify(q));
        user=JSON.parse(prettyJSONString(user));
        user=user[0].Record;
        console.log("Utente trovato: ")
        console.log(user);

        console.log("Per ogni id nel vettore delle richieste, troviamo il relativo medico e lo aggiungiamo al vettore")
        for(e of user.doctors)
        {
            let q={
                selector: {
                    id: e
                }
            };

            let result=await contract.evaluateTransaction("QueryAssets", JSON.stringify(q));
            result=JSON.parse(prettyJSONString(result));

            v.push({
                firstName: result[0].Record.firstName,
                lastName: result[0].Record.lastName,
                id: result[0].Record.id,
                hospital: result[0].Record.hospital,
                spec: result[0].Record.spec,
                birthDate: result[0].Record.birthDate,

            });
        }
        gateway.disconnect();

        console.log("Restituiamo il vettore di tutti i medici associati al paziente")
        return res.status(200).json(v);

    } catch (e) {
        console.log(e);
        res.status(404).json("Errore");
    }
}

const deleteDoctor= async(req,res) =>{
    const gateway = new Gateway();

    if(req.body.token==null)
        return res.status(401).json("Errore autenticazione");

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

        console.log("Decriptiamo il CF dell'utente che sta passando tramite token");
        let CF= await jwt.verify(req.body.token,pk);

        console.log("Troviamo il paziente col CF");
        let qU= {
            selector:
                {
                    CF: CF
                }
        }

        let user=await contract.evaluateTransaction("QueryAssets", JSON.stringify(qU));
        user=JSON.parse(prettyJSONString(user));
        user=user[0].Record;

        console.log("Rimuoviamo l'autorizzazione dal dottore selezionato");
        user.doctors=user.doctors.filter(e=> e!=req.body.id);

        await contract.submitTransaction("updatePatient", CF, JSON.stringify(user));
        gateway.disconnect();

        return res.status(200).json("Rimozione autorizzazione medico effettuata");

    } catch (e) {
        console.log(e);
        res.status(404).json("Errore");
    }
}

const patientExist=async(req,res)=>{
    const gateway = new Gateway();

    if(req.body.token==null)
        return res.status(401).json("Errore autenticazione");

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

        let CF=await jwt.verify(req.body.token,pk);

        let aux=await contract.evaluateTransaction("patientExist", CF);
        gateway.disconnect();

        if(aux)
            return res.status(200).json("Rimozione autorizzazione medico effettuata");
        else
            return res.status(400).json("Non trovato il CF");
    } catch (e) {
        console.log(e);
        res.status(404).json("Errore");
    }
}

const getRequests= async (req,res) =>{
    const gateway = new Gateway();
    let v=[];

    if(req.params.token==null)
        return res.status(401).json("Errore autenticazione");

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

        console.log("Decriptiamo il CF dell'utente che sta passando tramite token");
        let CF= await jwt.verify(req.params.token,pk);

        console.log("Troviamo il paziente col CF");

        let qU= {
            selector:
                {
                    CF: CF
                }
        }

        let user=await contract.evaluateTransaction("QueryAssets", JSON.stringify(qU));
        user=JSON.parse(prettyJSONString(user));
        user=user[0].Record;

        console.log("Per ogni id nel vettore delle richieste, troviamo il relativo medico e lo aggiungiamo al vettore")
        for(e of user.requests)
        {
            let q={
                selector: {
                    id: e
                }
            };

            let result=await contract.evaluateTransaction("QueryAssets", JSON.stringify(q));
            result=JSON.parse(prettyJSONString(result));

            v.push({
                firstName: result[0].Record.firstName,
                lastName: result[0].Record.lastName,
                id: result[0].Record.id
            });
        }
        gateway.disconnect();

        console.log("Restituiamo il vettore di tutti i medici che hanno inoltrato la richiesta a un paziente")
        return res.status(200).json(v);

    } catch (e) {
        console.log(e);
        res.status(404).json("Errore");
    }
}

const getPatients= async (req,res) => {
    const gateway = new Gateway();
    let v=[];

    if(req.params.token==null)
        return res.status(401).json("Errore autenticazione");

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

        console.log("Decriptiamo l'id del medico che sta passando tramite token");
        let id= await jwt.verify(req.params.token,pk);

        const q = {
            selector: {
                doctors: {
                    $elemMatch: {
                        $eq: id,
                    },
                },
            },
        };

        console.log("Troviamo i pazienti con il medico associato");
        let users=await contract.evaluateTransaction("QueryAssets", JSON.stringify(q));
        users=JSON.parse(prettyJSONString(users));

        for(e of users)
        {
            v.push(e.Record);
        }

        gateway.disconnect();

        console.log("Restituiamo il vettore di tutti i pazienti associati al medico")
        return res.status(200).json(v);

    } catch (e) {
        console.log(e);
        res.status(404).json("Errore");
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

const getCF=async (req,res)=>{
    try {
        const ccp = buildCCPOrg1();
        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        let p=await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        let CF=await jwt.verify(req.params.token,p);

        console.log("Ritrovamento cf riuscito");
        console.log(CF);

        return res.status(200).json(CF);
    } catch (e) {
        console.log(e);
        res.status(401).json("Accesso fallito");
    }
}

export const bcController = {
    addPatient,
    getPatient,
    getAll,
    query,
    login,
    loginM,
    testpv,
    enrolling,
    verify,
    deleteRequest,
    confirmRequest,
    getDoctors,
    getRequests,
    deleteDoctor,
    getPatients,
    addRequest,
    getCF,
    patientExist,
    getDoctor
};

