class CargoModel {
    id:string = ""
    cbo:string;
    descricao: string;
    cargo:string

    constructor(codigo:string, descricao: string,cargo:string){
        this.cbo = codigo;
        this.descricao = descricao;
        this.cargo = cargo;
    }
}

export default CargoModel;