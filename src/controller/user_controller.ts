import { Request, Response } from "express";
import { User, getByEmail, insert } from "../model/user";

export function show_login(req: Request, res: Response) {
    res.render('login', { response: null });
}

export async function register(req: Request, res: Response) {
    const { nome, email, senha, data_criacao} = req.body;

    if(!nome || !email || !senha){
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Preencha os campos corretamente.'
            }
        });
    }

    const userFound = await getByEmail(email);

    if(userFound){
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Preencha os campos corretamente.'
            }
        })
    }

    const user: User = {
        nome,
        email,
        senha,
        data_criacao
    }

    await insert(user);

    return res.render('login',{
        response: {
            type: 'sucess',
            value: 'Usuário cadastrado com sucesso!'
        }
    });
}