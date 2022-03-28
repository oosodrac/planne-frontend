export interface IBaldeFruta {
    id?: string,
    balde: string,
    fruta: string
}

export class BaldeFrutaModel implements IBaldeFruta {
    constructor(  public balde: string, public fruta: string ) {}
}