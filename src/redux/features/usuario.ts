import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TipoPessoa  {
    ALUNO = "ALUNO",
    PROFESSOR = "PROFESSOR",

}

const initialState  = {
    nome: "" as string,
    email: "" as string,
    senha: "" as string,
    uuid: "" as string,
    tipoPessoa: TipoPessoa.ALUNO
};

export type TDadosUsuario = {
    nome: string;
    email: string;
    uuid: string
}

export type TDadosUpdateProfle = {
    nome: string;
    email: string
}

const usuario = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        onLogin: (s, {payload}: PayloadAction<TDadosUsuario>) => {
            s.nome = payload.nome;
            s.email = payload.email;
            s.uuid = payload.uuid
        },
        onUpdate: (s,{payload}: PayloadAction<TDadosUpdateProfle>) => {
            s.nome = payload.nome;
            s.email = payload.email
        }
    },
});

export const {
    onLogin, onUpdate
} = usuario.actions;


export const usuarioReducer = usuario.reducer;