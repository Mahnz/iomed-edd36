// Classe paziente
class Patient {
    constructor(nome, cognome, codiceFiscale) {
        this.nome = nome;
        this.cognome = cognome;
        this.codiceFiscale = codiceFiscale;
    }
}

// Esporta la classe come modulo
// module.exports = Paziente;
export default Patient;