import { Request, Response } from "express";
import { User, getByEmail, getByEmailAndPassword, insert } from "../model/user";

export function show_login(req: Request, res: Response) {
    res.render('login', { response: null });
}

export async function register(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

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
        senha
    }

    await insert(user);

    return res.render('login',{
        response: {
            type: 'sucess',
            value: 'Usuário cadastrado com sucesso!'
        }
    });
}

export async function login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if( !email || !senha){
        return res.render('login', {
            response: {
                type: 'error',
                value: 'Preencha os campos corretamente.'
            }
        });
    }

    const usuario = await getByEmailAndPassword(email, senha);

    if(!usuario) {
        return res.render('login', {
          response: {
            type: 'error',
            value: 'email ou senha incorretos'
          }
        });
    }

    res.render('dashboard', {
        nome: usuario.nome
    });
}