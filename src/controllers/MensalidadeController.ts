import { Request, Response } from "express";
import { Funcionario, Mensalista } from "../models";

class MensalistaController {

    // Create
    public async create(req: Request, res: Response): Promise<Response> {
        const { matricula, salario, funcionario } = req.body;
        try {
            const funcionarioExistente = await Funcionario.findById(funcionario);
            if (!funcionarioExistente) {
                return res.json({ message: "Funcionário não encontrado!" });
            }
            const document = new Mensalista({ matricula, salario, funcionario });
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Esta matrícula já está em uso!" });
            } else if (error && error.errors["matricula"]) {
                return res.json({ message: error.errors["matricula"].message });
            } else if (error && error.errors["salario"]) {
                return res.json({ message: error.errors["salario"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // List
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const mensalistas = await Mensalista.find()
                .populate("funcionario") // Popula os dados do Funcionario relacionado
                .sort({ matricula: "asc" });
            return res.json(mensalistas);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
    

    // Delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body;
        try {
            const object = await Mensalista.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Mensalista excluído com sucesso!" });
            } else {
                return res.json({ message: "Mensalista inexistente!" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // Update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, matricula, salario, funcionario } = req.body;
        try {
            const document = await Mensalista.findById(id);
            if (!document) {
                return res.json({ message: "Mensalista inexistente!" });
            }
            const funcionarioExistente = await Funcionario.findById(funcionario);
            if (!funcionarioExistente) {
                return res.json({ message: "Funcionário não encontrado!" });
            }
            document.matricula = matricula;
            document.salario = salario;
            document.funcionario = funcionario;
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Esta matrícula já está em uso!" });
            } else if (error && error.errors["matricula"]) {
                return res.json({ message: error.errors["matricula"].message });
            } else if (error && error.errors["salario"]) {
                return res.json({ message: error.errors["salario"].message });
            }
            return res.json({ message: error.message });
        }
    }
}

export default new MensalistaController();
