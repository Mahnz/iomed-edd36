const {Gateway, Wallets}=require("fabric-network");
const path=require("path");
const fs=require("fs");
const Patient=require("../models/Paziente.js");

const conPath=path.resolve("~/Scrivania/software-edd36/backend","connection.json");
const conJSON=fs.readFileSync(conPath, "utf8");
const conn= JSON.parse(conJSON);

module.exports= {
    example: async(req,res)=> {

        const gateway=new Gateway();

        try{
            //Instaurazione connessione con blockchain
            await gateway.connect(conn, {
                wallet: await Wallets.newFileSystemWallet("./wallet"),
                identity: "admin",
                discovery: {enabled: true, asLocalhost: true}
            });

            //Ritrovamento canale su cui è applicato il chaincode
            const network=await gateway.getNetwork("mychannel");

            //Ritrovamento smartContract da chaincode
            const contract= network.getContract("patientContract");

            //Eseguire funzione istantiate
            await contract.submitTransaction("istantiate");
            res.status(200).json("Istanziato");

            gateway.disconnect();

        }
        catch(e){
            console.error(`Errore durante il richiamo della funzione: ${e.message}`);
            res.status(500).json(`Errore ${e.message}`);
            throw new Error("Errore durante il richiamo della funzione: ${e.message}")

        }
    },

    addPatient: async(req,res)=> {
        const gateway=new Gateway();

        try{
            //Instaurazione connessione con blockchain
            await gateway.connect(conn, {
                wallet: await Wallets.newFileSystemWallet("./wallet"),
                identity: "admin",
                discovery: {enabled: true, asLocalhost: true}
            });

            //Ritrovamento canale su cui è applicato il chaincode
            const network=await gateway.getNetwork("mychannel");

            //Ritrovamento smartContract da chaincode
            const contract= network.getContract("patientContract");

            //Eseguire funzione di inserimento paziente
            const p=new Patient(req.nome, req.cognome, req.cf);
            await contract.submitTransaction("createPatient",req.cf,p);
            res.status(200).json("Inserimento avvenuto correttamente");

            gateway.disconnect();

        }
        catch(e){
            console.error(`Errore durante il richiamo della funzione: ${e.message}`);
            res.status(500).json(`Errore ${e.message}`);
            throw new Error("Errore durante il richiamo della funzione: ${e.message}")

        }
    },

    deletePatient: async(req,res)=> {
        const gateway=new Gateway();

        try{
            //Instaurazione connessione con blockchain
            await gateway.connect(conn, {
                wallet: await Wallets.newFileSystemWallet("./wallet"),
                identity: "admin",
                discovery: {enabled: true, asLocalhost: true}
            });

            //Ritrovamento canale su cui è applicato il chaincode
            const network=await gateway.getNetwork("mychannel");

            //Ritrovamento smartContract da chaincode
            const contract= network.getContract("patientContract");

            //Funzione di cancellazione paziente
            await contract.submitTransaction("deletePatient", req.cf);
            res.status(200).json("Eliminazione avvenuta correttamente");

            gateway.disconnect();

        }
        catch(e){
            console.error(`Errore durante il richiamo della funzione: ${e.message}`);
            res.status(500).json(`Errore ${e.message}`);
            throw new Error("Errore durante il richiamo della funzione: ${e.message}")
        }
    },

    updatePatient: async(req,res)=> {
        const gateway=new Gateway();

        try{
            //Instaurazione connessione con blockchain
            await gateway.connect(conn, {
                wallet: await Wallets.newFileSystemWallet("./wallet"),
                identity: "admin",
                discovery: {enabled: true, asLocalhost: true}
            });

            //Ritrovamento canale su cui è applicato il chaincode
            const network=await gateway.getNetwork("mychannel");

            //Ritrovamento smartContract da chaincode
            const contract= network.getContract("patientContract");

            //Funzione di aggiornamento paziente
            await contract.submitTransaction("updatePatient", req.cf, req.nome);
            res.status(200).json("Aggiornamento effettuato con successo");

            gateway.disconnect();

        }
        catch(e){
            console.error(`Errore durante il richiamo della funzione: ${e.message}`);
            res.status(500).json(`Errore ${e.message}`);
            throw new Error("Errore durante il richiamo della funzione: ${e.message}")
        }
    },

    getPatient: async(req,res)=> {
        const gateway=new Gateway();

        try{
            //Instaurazione connessione con blockchain
            await gateway.connect(conn, {
                wallet: await Wallets.newFileSystemWallet("./wallet"),
                identity: "admin",
                discovery: {enabled: true, asLocalhost: true}
            });

            //Ritrovamento canale su cui è applicato il chaincode
            const network=await gateway.getNetwork("mychannel");

            //Ritrovamento smartContract da chaincode
            const contract= network.getContract("patientContract");

            //funzione di lettura paziente
            const p=await contract.evaluateTransaction("getPatient", req.cf);
            res.status(200).json({message: "Lettura eseguita correttamente", value: p});

            gateway.disconnect();

        }
        catch(e){
            console.error(`Errore durante il richiamo della funzione: ${e.message}`);
            res.status(500).json(`Errore ${e.message}`);
            throw new Error("Errore durante il richiamo della funzione: ${e.message}")
        }
    }
}


