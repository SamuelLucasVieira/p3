import { Request, Response } from "express";
import { Cargo } from "../models";

class CargoController {

    // Create
    public async create(req: Request, res: Response): Promise<Response> {
        const { cbo, descricao } = req.body;
        try {
            const document = new Cargo({ cbo, descricao });
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este código CBO já está em uso!" });
            } else if (error && error.errors["cbo"]) {
                return res.json({ message: error.errors["cbo"].message });
            } else if (error && error.errors["descricao"]) {
                return res.json({ message: error.errors["descricao"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // List
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const cargos = await Cargo.find().sort({ descricao: "asc" });
            return res.json(cargos);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }    

    // Delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body;
        try {
            const object = await Cargo.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Cargo excluído com sucesso!" });
            } else {
                return res.json({ message: "Cargo inexistente!" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // Update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, cbo, descricao } = req.body;
        try {
            const document = await Cargo.findById(id);
            if (!document) {
                return res.json({ message: "Cargo inexistente!" });
            }
            document.cbo = cbo;
            document.descricao = descricao;
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este código CBO já está em uso!" });
            } else if (error && error.errors["cbo"]) {
                return res.json({ message: error.errors["cbo"].message });
            } else if (error && error.errors["descricao"]) {
                return res.json({ message: error.errors["descricao"].message });
            }
            return res.json({ message: error.message });
        }
    }
}

export default new CargoController();
