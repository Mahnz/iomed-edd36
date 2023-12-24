// Modello Paziente
class Paziente {
    constructor(form) {
        this.CF = form.CF;
        this.firstName = form.firstName;
        this.lastName = form.lastName;
        this.sex = form.sex;
        this.birthDate = form.birthDate;
        this.birthPlace = form.birthPlace;
        this.address = form.address;
        this.city = form.city;
        this.email = form.email;
        this.password = form.password;
        this.telefono = form.telefono;
        this.province = form.province;
        this.cid = null;
        this.docType = form.docType;
        this.doctors = [];
        this.requests = [];
    }
}

export default Paziente