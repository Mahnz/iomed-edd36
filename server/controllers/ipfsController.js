const ipfsClient = require('ipfs-http-client');


async function addFileToIPFS(req, res) {
    try {
        const fileContent = req.body.fileContent;
        const result = await ipfs.add(fileContent);
        const ipfsHash = result.cid.toString();
        res.json({success: true, ipfsHash});
    } catch (error) {
        console.error('Errore durante l\'aggiunta del file a IPFS:', error);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
}

async function getFileFromIPFS(req, res) {
    try {
        const ipfsHash = req.params.ipfsHash;
        const files = await ipfs.get(ipfsHash);
        res.json({success: true, files});
    } catch (error) {
        console.error('Errore durante il recupero del file da IPFS:', error);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
}

module.exports = {
    addFileToIPFS,
    getFileFromIPFS,
};