// Classe paziente
class Paziente {
    constructor(form) {
        this.CF=form.CF;
        this.address=form.address;
        this.birthDate=form.birthDate;
        this.birthPlace=form.birthPlace;
        this.city=form.city;
        this.confirmPassword=form.confirmPassword;
        this.email=form.email;
        this.firstName=form.firstName;
        this.lastName=form.lastName;
        this.password=form.password;
        this.phoneNumber=form.phoneNumber;
        this.province=form.province;
        this.sex=form.sex;
    }
}
export default Paziente;
