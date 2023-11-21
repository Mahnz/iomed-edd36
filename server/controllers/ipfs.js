module.exports = {
    addFileToIPFS: async (req, res) => {
        try {
            const fileContent = req.body.fileContent; // Assumi che il contenuto del file venga inviato nel corpo della richiesta
            const result = await ipfs.add(fileContent);
            const ipfsHash = result.cid.toString();
            res.json({success: true, ipfsHash});
        } catch (error) {
            console.error("Errore durante l'aggiunta del file a IPFS: ", error);
            res.status(500).json({success: false, error: 'Internal Server Error'});
        }
    },

    getFileFromIPFS: async (req, res) => {
        try {
            const ipfsHash = req.params.ipfsHash;
            const files = await ipfs.get(ipfsHash);
            res.json({success: true, files});
        } catch (error) {
            console.error("Errore durante il recupero del file da IPFS: ", error);
            res.status(500).json({success: false, error: 'Internal Server Error'});
        }
    },

    removeMessageById: (req, res) => {
        const {messageId} = req.body;

        Message.findByIdAndRemove(messageId)
            .then(() => {
                res.status(200).json({message: "Messaggio eliminato con successo"});
            })
            .catch((error) => {
                console.error("Errore: ", error);
                res.status(500).json({error: "Errore durante l'eliminazione del messaggio"});
            });
    }
}