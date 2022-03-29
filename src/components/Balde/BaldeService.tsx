/* eslint-disable import/no-anonymous-default-export */
import http from "../../config/http-common";
import { IBaldeModel } from './BaldeModel';
const uri = "/baldes";

const getBaldes = () => {
    return http.get( uri );
}

const getBalde = (id:number) => {
    return http.get( `${uri}/${id}` );
}

const createBalde = (data:IBaldeModel) => {
    return http.post(uri, data);
}

const updateBalde = (id:number, data: IBaldeModel) => {
    return http.put( `${uri}/${id}`, data )
}

const removeBalde = (id:string) => {
    return http.delete(`${uri}/${id}`);
}

export default {
    getBaldes,
    getBalde,
    createBalde,
    updateBalde,
    removeBalde
}