class MensalidadeModel {
    id:string = ""
    matricula:number;
    salario: number;
    funcionario:string;

    constructor(matricula: number, salario: number, funcionario:string){
        this.matricula = matricula;
        this.salario = salario;
        this.funcionario = funcionario;
    }
}

export default MensalidadeModel;