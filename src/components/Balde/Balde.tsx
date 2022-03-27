/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import Home from '../../modules/Home';
import { BaldeModel, IBaldeModel } from './BaldeModel';
import { useForm, SubmitHandler } from "react-hook-form";
import BaldeService from './BaldeService';
import BaldeFrutaService from '../BaldeFruta/BaldeFrutaService';
import { IResumoBaldeFruta } from './../BaldeFruta/ResumoBaldeFruta';

type Inputs = {
    nome: string,
    capacidade: number,
};

const Balde = () => {

    const [baldes, setBaldes] = useState<IBaldeModel[]>([]);
    const [resumos, setResumos] = useState<IResumoBaldeFruta[]>([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

    const onAddBalde = ( data: Inputs ) => {
        const balde = new BaldeModel( "1", data.nome, Number(data.capacidade));
        BaldeService.createBalde( balde ).then( () => {

            retrieveBaldes();
        } );
        reset();
    }
    
    const onRemoveBalde = ( id: string, nome: string ) => {

        BaldeService.removeBalde(id).then( (response) => {
            alert( `Balde removido` );
            console.log( response );
            retrieveBaldes();
        } );
    }

    useEffect( () => {
        retrieveBaldes();
        retrieveResumoBaldeFruta();
    }, [] );

    const retrieveBaldes = () => {
        BaldeService.getBaldes()
            .then( response => {
                setBaldes( response.data );
                console.log( baldes );
            } );
    }

    const retrieveResumoBaldeFruta = () => {
        
        BaldeFrutaService.getResumoBaldeFruta().then( response => {
            setResumos( response.data );
            console.log( resumos );
        } );
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        onAddBalde( data ) ;
    };

    return (
        <div>
            <Row>
                <Col>
                    <Home />
                    {baldes.length}
                </Col>
            </Row>
            <hr />
            <h1>Baldes</h1>

            <Row>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <input className="form-control w-25" placeholder="Nome do balde" type="text" {...register("nome", {required: true} )} />
                        <input className="form-control mt-2 mb-2 w-25" placeholder="Capacidade" type="number" {...register("capacidade", {required: true})}  />
                        <Button variant="primary" type="submit" > Adicionar balde </Button>
                    </form>
                </Col>
            </Row>

            <Row className="mt-4" >
                <Col>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Capacidade máxima</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    baldes.map((balde: IBaldeModel, index) => {
                                        return (
                                            <tr key={index} >
                                                <td> {balde.id} </td>
                                                <td>
                                                    {balde.nome}
                                                </td>
                                                <td>
                                                    {balde.capacidade} fruta(s)
                                                </td>
                                                <td>
                                                    <Button variant="danger" type="button" onClick={ () => { onRemoveBalde(balde.id, balde.nome) } } >X</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                </Col>
            </Row>
        </div>
    )
}

export default Balde;