/* eslint-disable import/no-anonymous-default-export */
import http from "../../config/http-common";
import { IBaldeFruta } from "./BaldeFrutaModel";
const uri = "/balde-frutas";

const getBaldeFrutas = () => {
    return http.get( uri );
}

const getBaldeFruta = (id:number) => {
    return http.get( `${uri}/${id}` );
}

const createBaldeFruta = (data: IBaldeFruta) => {
    return http.post(uri, data);
}

const updateBaldeFruta = (id:number, data: IBaldeFruta) => {
    return http.put( `${uri}/${id}`, data )
}

const removeBaldeFruta = (balde:string, fruta: string) => {
    return http.delete(`${uri}/${balde}/${fruta}`);
}

const getResumoBaldeFruta = () => {
    return http.get( `${uri}/resumo` );
}

export default {
    getBaldeFruta,
    getBaldeFrutas,
    createBaldeFruta,
    updateBaldeFruta,
    removeBaldeFruta,
    getResumoBaldeFruta
}