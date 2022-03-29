/* eslint-disable import/no-anonymous-default-export */
import http from "../../config/http-common";
import { FrutaModel } from "./FrutaModel";
const uri = "/frutas";

const getFrutas = () => {
    return http.get( uri );
}

const getFruta = (id:number) => {
    return http.get( `${uri}/${id}` );
}

const createFruta = (data:FrutaModel) => {
    return http.post(uri, data);
}

const updateFruta = (id:number, data: FrutaModel) => {
    return http.put( `${uri}/${id}`, data )
}

const removeFruta = (id?:string) => {
    return http.delete(`${uri}/${id}`);
}

export default {
    getFrutas,
    getFruta,
    createFruta,
    updateFruta,
    removeFruta
}