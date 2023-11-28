//
// async function uploadFile(req, res) {
//     try {
//         const apiKey = 'z6Mkn53wURVNPLkXj2Exz8kqEWtQj3PVbDTFaeX4gKJt9nFm';
//         const web3Storage = new Web3Storage({token: apiKey});
//
//         const {content, filename} = req.body;
//
//         const files = [{path: `/${filename}`, content: Buffer.from(content)}];
//         const cid = await web3Storage.put(files);
//
//         res.json({success: true, cid});
//     } catch (error) {
//         console.error('Errore durante il caricamento su Web3 Storage:', error);
//         res.status(500).json({success: false, error: 'Internal Server Error'});
//     }
// }
//
// async function retrieveFile(req, res) {
//     // try {
//     //     const ipfsHash = req.params.ipfsHash;
//     //     const files = await ipfs.get(ipfsHash);
//     //     res.json({success: true, files});
//     // } catch (error) {
//     //     console.error("Errore durante il recupero del file da IPFS:", error);
//     //     res.status(500).json({success: false, error: 'Internal Server Error', details: error.message});
//     // }
// }
//
// module.exports = {
//     uploadFile,
//     retrieveFile,
// };


// const { Web3Storage, getFilesFromPath } = require('web3.storage')
// const storage = new Web3Storage({ token: process.env.WEB3_TOKEN })
// const files = await getFilesFromPath(process.env.PATH_TO_ADD)
// const cid = await storage.put(files)
// console.log(`IPFS CID: ${cid}`)
// console.log(`Gateway URL: https://dweb.link/ipfs/${cid}`)