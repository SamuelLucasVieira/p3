import mongoose from "mongoose";
const { Schema } = mongoose;

// Modelo para Cargo
const CargoSchema = new Schema({
    cbo: { 
        type: String, 
        required: [true, "O código CBO é obrigatório"], 
        unique: true 
    },
    descricao: { 
        type: String, 
        required: [true, "A descrição do cargo é obrigatória"] 
    }
});

// Modelo para Funcionário
const FuncionarioSchema = new Schema({
    nome: { 
        type: String, 
        required: [true, "O nome é obrigatório"], 
        maxlength: [50, "O nome pode ter no máximo 50 caracteres"]
    },
    idade: { 
        type: Number, 
        min: [14, "A idade mínima é 14 anos"], 
        required: true 
    },
    email: {
        type: String,
        required: [true, "O e-mail é obrigatório"],
        unique: true,
        maxlength: [60, "O e-mail pode ter no máximo 60 caracteres"],
        validate: {
            validator: function(value: string) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            },
            message: (props: any) => `${props.value} não é um formato de e-mail válido`
        }
    },
    fone: {
        type: String,
        required: [true, "O telefone é obrigatório"],
        validate: {
            validator: function(value: string) {
                const regex = /^[0-9]{10,11}$/;
                return regex.test(value); // Valida se é um telefone válido
            },
            message: (props: any) => `${props.value} não é um número de telefone válido`
        }
    },
    cargo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cargo', // Referência ao Cargo
        required: [true, "O cargo é obrigatório"]
    }
}, { timestamps: true });

// Modelo para Mensalista
const MensalistaSchema = new Schema({
    matricula: {
        type: String,
        required: [true, "A matrícula é obrigatória"],
        unique: true,
        validate: {
            validator: function(value: string) {
                return /^[0-9]{6,10}$/.test(value); // Validação de matrícula numérica de 6 a 10 caracteres
            },
            message: (props: any) => `A matrícula ${props.value} é inválida`
        }
    },
    salario: { 
        type: Number, 
        min: [0.01, "O salário deve ser maior que 0"], 
        required: true 
    },
    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario',
        required: [true, "O funcionário é obrigatório"],
        unique: true,
        validate: {
            validator: async function(id: string) {
                const funcionario = await Funcionario.findById(id);
                return !!funcionario;
            },
            message: 'O Funcionário fornecido não existe!'
        }
    }
});

// Modelos
const Funcionario = mongoose.model("Funcionario", FuncionarioSchema);
const Mensalista = mongoose.model("Mensalista", MensalistaSchema);
const Cargo = mongoose.model("Cargo", CargoSchema);

export { Funcionario, Mensalista, Cargo };
