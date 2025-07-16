import { GridColDef, GridRowIdGetter, GridValidRowModel } from "@mui/x-data-grid"

export enum UF {
    AC = "AC",
    AL = "AL",
    AP = "AP",
    AM = "AM",
    BA = "BA",
    CE = "CE",
    DF = "DF",
    ES = "ES",
    GO = "GO",
    MA = "MA",
    MT = "MT",
    MS = "MS",
    MG = "MG",
    PA = "PA",
    PB = "PB",
    PR = "PR",
    PE = "PE",
    PI = "PI",
    RJ = "RJ",
    RN = "RN",
    RS = "RS",
    RO = "RO",
    RR = "RR",
    SC = "SC",
    SP = "SP",
    SE = "SE",
    TO = "TO"
}

export interface PessoaDTO {
    nome: string,
    cpf: string,
    email: string,
    telefone: PessoaTelefoneDTO,
    endereco: EnderecoDTO,
    uuid: string
}

export type EnderecoDTO = {
    uuid: string | null,
    cep: string,
    cidade: string,
    estado: UF
}

export type PessoaTelefoneDTO = {
    ddd: string,
    fone: string,
    pessoaUUID: string | null
}

export enum SerieAno {
    PRIMEIRO_ANO = "1°",
    SEGUNDO_ANO = "2°",
    TERCEIRO_ANO = "3°",
    QUARTO_ANO = "4°",
    QUINTO_ANO = "5°",
    SEXTO_ANO = "6°",
    SETIMO_ANO = "7°",
    OITAVO_ANO = "8°"

}

export type SalaDTO = {
    numeroSala: string,
    serieAno: SerieAno,
    capacidadeAlunos: number
    uuid: string
}

export type EscolaDTO = {
    nome: string,
    endereco: EnderecoDTO,
    pessoas: Array<PessoaDTO>,
    salas: Array<SalaDTO>,
    uuid: string
}

export type EscolaDataGridDTO = {
    nome: string;
    cidade: string;
    cep: string;
    estado: string;
    pessoas: number;
    salas: number;
    uuid: string
}

export type ProfessorDTO = {
    quantidadeAulas : string,
    disciplinas: Array<Disciplina>
}

export type SalaDataGridDTO = {
    uuid: string
    numeroSala: string;
    serieAno: string;
    capacidadeAlunos: number;
    alunos: number;
    professores: number;
    tarefas: number;
}

export type AlunoDataGridDTO = {
    nome: string; 
    cpf: string; 
    email: string; 
    ddd: string;
    fone: string;
    cidadeEstado: string;
    cep: string; 
    matricula: string; 
    serie: string; 
    tarefas: number; 
    disciplinas: number; 
    uuid: string;
    escolaUUID: string,
    escolaDescricao: string
}

export interface AlunoDTO extends PessoaDTO {
    matricula: string;
    tarefas: Array<TarefaDTO>;
    disciplinas: Array<Disciplina>;
    serieAno: string;
    uuid: string
}

export type TarefaDTO = {
    disciplina: Disciplina;
    descricao: string;
    dataEntrega: string;
    concluida: boolean;
    uuid: string;
}

export enum Disciplina {
    MATEMATICA,
    GEOGRAFICA,
    PORTUGUES,
    INGLES
}

export enum TipoTelaEscola {
    LISTAESCOLAS = 'ESCOLAS',
    NOVAESCOLA = 'NOVAESCOLA',
    EDITARESCOLA = 'EDITARESCOLA',
}

export enum TipoTelaAluno {
    LISTAGEM = 'LISTAGEM',
    CADASTRO = 'CADASTRO',
    EDITAR = 'EDITAR',
}

export enum TipoTelaHome {
    SOBRE = 'SOBRE',
    HOME = 'HOME',
    CADASTRO_LOGIN = 'CADASTRO',
    LOGIN = 'LOGIN'
}

export type TCep = {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: string
};


export type GenericTO = {
    uuid: string;
    descricao: string
}

export type LoginDTO = {
    login: string;
    senha: string;
    nome: string
    uuid: string
}

export type TCustomTypographyProps = {
    color?: string;
    title?: string;
    className?: string;
    hasIcon?: boolean;
    fontSize?: string 
    marginTop?: string
    marginLeft?: string
    noFontWeight?: boolean;
    width?: string
    onClick?: () => void;
    cursor?: string
    textDecoration?: string
}

export type TCustomDataGrid<T extends GridValidRowModel = any> = {
    rows: Array<T>;
    columns: readonly GridColDef<T>[];
    loading: boolean;
    getRowId: GridRowIdGetter<T>;
    noRowsLabel: string;
};


export type ArtistaPopularDTO = {
    descritivo: string;
    subTitulo:string;
    urlImagem:string;
}

export type TInitialState = {
    alunos: Array<AlunoDataGridDTO>;
    loading: boolean;
    anchorEl: null | HTMLElement;
    alunoSelecionado: null | AlunoDataGridDTO;
    tipoTela: TipoTelaAluno;
};

type WithIcon = {
    iconName: string;
    id: string;
  };
  
  type WithoutIcon = {
    iconName?: undefined;
    id?: undefined;
  };
  
  export type TCustomHoverTypographyProps = {
    title: string;
    fontSize?: string;
    color?: string;
  } & (WithIcon | WithoutIcon);
  

export type TLineSeparatorProps = {
    color: string,
    marginLeft?: string
}

export type SugestaoPlaylistDTO = {
    title: string;
    subtitle: string;
    sugestao: string;
};

export type SpotifyLinkDTO = {
    title: string;
    route: string;
};

export type CardItemPlayListDTO = {
    image: string;
    title: string;
    subTitle: string;
};

export type CardPlaylistDTO = {
    title: string;
    hasBorder: boolean;
    itens: Array<CardItemPlayListDTO>;
};

export type FooterCardDTO = {
    title: string 
    subtitles: Array<string>
}
