import { Router, Request, Response } from "express";
import Cargos from "./Cargos";
import Funcionario from "./Funcionario";
import Mensalidade from "./Mensalidade";



const routes = Router();
routes.use("/cargos", Cargos);
routes.use("/funcionario", Funcionario);
routes.use("/mensalidade", Mensalidade);
//aceita qualquer método HTTP ou URL
routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;