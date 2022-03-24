import { IBaldeModel } from "./BaldeModel";

export class BaldeService {
    private baldes: IBaldeModel[] = [];

    adicionarBalde(balde: IBaldeModel): void {
        this.baldes.push(balde);
        console.log( this.baldes );
    }
}