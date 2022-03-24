export interface IBaldeModel {
    nome: string,
    capacidadeMaxima: Number
}

export class BaldeModel implements IBaldeModel {
    nome: string;
    capacidadeMaxima: Number;

    constructor(nome: string, capacidadeMaxima: Number) {
        this.nome = nome;
        this.capacidadeMaxima = capacidadeMaxima;
    }
}