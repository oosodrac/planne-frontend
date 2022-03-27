// import { IBaldeModel } from './../Balde/BaldeModel';

export interface IFruta {
    id?: string,
    nome: string,
    preco: number,
    expiracao: number
}

export class FrutaModel implements IFruta {

    constructor(public nome: string, public preco: number, public expiracao: number) {
    }

}