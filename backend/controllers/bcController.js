// Inserire i metodi per la gestione delle richieste in Blockchain
'use strict';

const { Contract } = require('fabric-contract-api');

class patientContract extends Contract {
    async instantiate(ctx) {
        console.log('Smart contract paziente istanziato');
    }

    async createPatient(ctx, patientId, patient) {
        const exists = await this.patientExists(ctx, patientId);
        if (exists) {
            throw new Error(`Il paziente con ID ${patientId} esiste già.`);
        }

        await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(patient)));
        console.log(`Paziente inserito con successo: ${patientId}`);
    }

    async getPatient(ctx, patientId) {
        const patientJSON = await ctx.stub.getState(patientId);
        if (!patientJSON || patientJSON.length === 0) {
            throw new Error(`Il paziente con ID ${patientId} non esiste.`);
        }

        const patient = JSON.parse(patientJSON.toString());
        console.log(`Paziente letto con succeso: ${patientId}`);
        return patient;
    }

    async updatePatient(ctx, patientId, newPatient) {
        const exists = await this.patientExists(ctx, patientId);
        if (!exists) {
            throw new Error(`Il paziente con ID ${patientId} non esiste.`);
        }

        await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(newPatient)));
        console.log(`Paziente aggiornato con successo: ${patientId}`);
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

module.exports = patientContract;


