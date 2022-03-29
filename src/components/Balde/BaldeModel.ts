export interface IBaldeModel {
    id: string,
    nome: string,
    capacidade: number
}

export class BaldeModel implements IBaldeModel {

    constructor(public id: string, public nome: string, public capacidade: number) {
    }
}