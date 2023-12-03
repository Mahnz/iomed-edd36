import {create} from 'ipfs-http-client'
const address = 'http://127.0.0.1:5002'

const connect = async (req, res) => {
    try {
        const ipfs = create(new URL(address))
        const isOnline = ipfs.isOnline()

        if (isOnline) {
            console.log("IPFS online: " + address)
            return ipfs
        }
    } catch (err) {
        console.error(err)
    }
}

// const saveToIpfs = async ([file]) => {
const saveToIpfs = async (req, res) => {
    try {
        const ipfs = await connect()
        const { buffer } = req.formData.file;
        // const {file} = req.body;
        console.log(req.formData)
        // const added = await ipfs.add(
        //     file,
        //     {
        //         progress: (prog) => console.log(`received: ${prog}`)
        //     }
        // )
        // console.log("CID aggiunto: " + added.cid.toString())
        console.log("POEJFPIWJIDOEJIFWJFIEJNFENFJENI")
    } catch (err) {
        console.error(err)
    }
}

export const ipfsController = {
    connect,
    saveToIpfs,
};