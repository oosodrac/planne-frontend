export interface IBaldeFruta {
    id: string,
    balde: string,
    fruta: string
}

export class BaldeFrutaModel implements IBaldeFruta {
    constructor( public id: string, public balde: string, public fruta: string ) {}
}