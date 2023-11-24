// import { create } from 'ipfs-http-client'
// const client = create(new URL('http://127.0.0.1:5002'))
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({host: 'localhost', port: 5002, protocol: 'http'});

async function addFileToIPFS(req, res) {
    try {
        // const fileContent = req.body.fileContent;
        // const result = await ipfs.add(fileContent);
        // const ipfsHash = result.cid.toString();
        // res.json({success: true, ipfsHash});
        const cid = await ipfs.add("Ahoooo ciao!");
        console.log(cid)
    } catch (error) {
        console.error("Errore durante l'aggiunta del file a IPFS:", error);
        res.status(500).json({success: false, error: 'Internal Server Error', details: error.message});
    }
}

async function getFileFromIPFS(req, res) {
    try {
        const ipfsHash = req.params.ipfsHash;
        const files = await ipfs.get(ipfsHash);
        res.json({success: true, files});
    } catch (error) {
        console.error("Errore durante il recupero del file da IPFS:", error);
        res.status(500).json({success: false, error: 'Internal Server Error', details: error.message});
    }
}

module.exports = {
    addFileToIPFS,
    getFileFromIPFS,
};
