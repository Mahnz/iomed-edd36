// Modello Paziente
class Paziente {
    constructor(form) {
        this.CF = form.CF;
        this.address = form.address;
        this.birthDate = form.birthDate;
        this.birthPlace = form.birthPlace;
        this.city = form.city;
        this.confirmPassword = form.confirmPassword;
        this.email = form.email;
        this.firstName = form.firstName;
        this.lastName = form.lastName;
        this.password = form.password;
        this.telefono = form.telefono;
        this.province = form.province;
        this.sex = form.sex;
        this.cap=form.cap;
        this.docType = form.docType;
        this.doctors = [];
        this.requests = [];
    }
}

export default Paziente