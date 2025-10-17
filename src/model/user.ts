import { connection } from "../infra/connection";

export type User = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    data_criacao: string;
}

    export async function insert(user:User){
        await connection .query(
            'INSERT INTO users(nome, email, senha, data_criacao) VALUES ($1, $2, $3, $4);',
            [
                user.nome,
                user.email,
                user.senha,
                user.data_criacao
            ]
        );
    }

    export async function getByEmail(email: string) {
        const { rows } = await connection .query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return rows [0];
    }