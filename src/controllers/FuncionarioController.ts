import { Request, Response } from "express";
import { Funcionario } from "../models";

class FuncionarioController {

    // Create
    public async create(req: Request, res: Response): Promise<Response> {
        const { nome, idade, email, fone,cargo } = req.body;
        try {
            const document = new Funcionario({ nome, idade, email, fone, cargo });
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este e-mail já está em uso!" });
            } else if (error && error.errors["email"]) {
                return res.json({ message: error.errors["email"].message });
            } else if (error && error.errors["nome"]) {
                return res.json({ message: error.errors["nome"].message });
            } else if (error && error.errors["fone"]) {
                return res.json({ message: error.errors["fone"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // List
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const funcionarios = await Funcionario.find().sort({ nome: "asc" });
            return res.json(funcionarios);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // Delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body;
        try {
            const object = await Funcionario.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Funcionário excluído com sucesso!" });
            } else {
                return res.json({ message: "Funcionário inexistente!" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // Update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, nome, idade, email, fone } = req.body;
        try {
            const document = await Funcionario.findById(id);
            if (!document) {
                return res.json({ message: "Funcionário inexistente!" });
            }
            document.nome = nome;
            document.idade = idade;
            document.email = email;
            document.fone = fone;
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este e-mail já está em uso!" });
            } else if (error && error.errors["email"]) {
                return res.json({ message: error.errors["email"].message });
            } else if (error && error.errors["nome"]) {
                return res.json({ message: error.errors["nome"].message });
            } else if (error && error.errors["fone"]) {
                return res.json({ message: error.errors["fone"].message });
            }
            return res.json({ message: error.message });
        }
    }
}

export default new FuncionarioController();
