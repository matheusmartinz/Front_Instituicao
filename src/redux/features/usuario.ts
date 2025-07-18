import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TipoPessoa  {
    ALUNO = "ALUNO",
    PROFESSOR = "PROFESSOR",

}

const initialState  = {
    nome: "" as string,
    email: "" as string,
    tipoPessoa: TipoPessoa.ALUNO
};

export type TDadosUsuario = {
    nome: string;
    email: string;
}

const usuario = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        onLogin: (s, {payload}: PayloadAction<TDadosUsuario>) => {
            s.nome = payload.nome;
            s.email = payload.email;
        }
    },
});

export const {
    onLogin
} = usuario.actions;

export const usuarioReducer = usuario.reducer;