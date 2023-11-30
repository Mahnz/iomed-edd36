const { Contract } = require('fabric-contract-api');

class PatientContract extends Contract {
    async instantiate(ctx) {
        console.log('Contratto pazienti istanziato');
    }

    async createPatient(ctx, patientId, patient) {
        const exists = await this.patientExists(ctx, patientId);
        if (exists) {
            throw new Error(`Il paziente con ID ${patientId} esiste già.`);
        }

        await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(patient)));
        console.log(`Paziente creato con successo: ${patientId}`);
    }

    async getPatient(ctx, patientId) {
        const patientJSON = await ctx.stub.getState(patientId);
        if (!patientJSON || patientJSON.length === 0) {
            throw new Error(`Il paziente con ID ${patientId} non esiste.`);
        }

        const patient = JSON.parse(patientJSON.toString());
        console.log(`Lettura del paziente con successo: ${patientId}`);
        return patient;
    }

    async updatePatient(ctx, patientId, name) {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`Il paziente con ID ${patientId} non esiste.`);
        }

        const patient = await this.getPatient(ctx, patientId);
        patient.name = name;

        await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(patient)));
        console.log(`Aggiornamento del paziente con successo: ${patientId}`);
    }

    async deletePatient(ctx, patientId) {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`Il paziente con ID ${patientId} non esiste.`);
        }

        await ctx.stub.deleteState(patientId);
        console.log(`Paziente eliminato con successo: ${patientId}`);
    }

    async patientExists(ctx, patientId) {
        const patientJSON = await ctx.stub.getState(patientId);
        return patientJSON && patientJSON.length > 0;
    }
}

module.exports = PatientContract;


