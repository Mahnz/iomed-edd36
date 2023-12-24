import Paziente from "./Paziente.js";

class Dottore extends Paziente {
    constructor(form) {
        super(form);
        this.telefono = form.telefonoPersonale;
        this.id = form.id;
        this.hospital = form.hospital;
        this.spec = form.spec;
        this.telefonoUfficio = form.telefonoUfficio;
    }
}

export default Dottore;