import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import { BaldeFrutaModel, IBaldeFruta } from './BaldeFrutaModel';
import { useEffect } from 'react';
import BaldeFrutaService from './BaldeFrutaService';
import { SubmitHandler, useForm } from 'react-hook-form';
import FrutaService from '../Fruta/FrutaService';
import BaldeService from '../Balde/BaldeService';
import { IBaldeModel } from './../Balde/BaldeModel';
import { IFruta } from '../Fruta/FrutaModel';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Home from '../../modules/Home';

type Inputs = {
    id: string,
    balde: string,
    fruta: string,
};

const Deposito = () => {

    const [depositos, setDepositos] = useState<BaldeFrutaModel[]>([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const [frutas, setFrutas] = useState<IFruta[]>([]);
    const [baldes, setBaldes] = useState<IBaldeModel[]>([]);

    useEffect(() => {
        getDepositos();
        getFrutas();
        getBaldes();
    }, []);

    const getDepositos = () => {
        BaldeFrutaService.getBaldeFrutas().then(response => {
            setDepositos(response.data);
        })
    }

    const getFrutas = () => {
        FrutaService.getFrutas().then(response => {
            setFrutas(response.data);
        })
    }


    const getBaldes = () => {
        BaldeService.getBaldes().then(response => {
            setBaldes(response.data);
        })
    }

    const onRemoveDeposito = (balde: string, fruta: string) => {
        BaldeFrutaService.removeBaldeFruta(balde, fruta).then(() => {
            getDepositos();
            alert('Fruta removida do balde');
        });

        console.log('Fruta removida do balde!');

    }


    const onSubmit: SubmitHandler<Inputs> = data => {
        const balde = new BaldeFrutaModel("1", data.balde, data.fruta);
        BaldeFrutaService.createBaldeFruta(balde).then(() => {

            getDepositos();
        });
        reset();
    };

    return (
        <div>

            <Row>

                <Col>
                    <Home/>
                </Col>

                <Col>

                    <h4>Deposito de frutas!</h4>

                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="row" >

                            <div className="col-md-4" >
                                <label>Escolhe uma fruta</label>
                                <select className="form-control" {...register("fruta", { required: true })}>
                                                <option></option>
                                    {
                                        frutas.map((fruta, index: number) => {
                                            return (
                                                <option key={fruta.id} > {fruta.nome} </option>
                                            )
                                        })
                                    }
                                </select>
                                        {errors.fruta && <span className="Error-Style" >Fruta é obrigatório</span>}
                            </div>

                            <div className="col-md-4" >
                                <label>Selecione o balde</label>
                                <select className="form-control" {...register("balde", { required: true })}>
                                                <option></option>
                                    {
                                        baldes.map((balde, index: number) => {
                                            return (
                                                <option key={balde.id} > {balde.nome} </option>
                                            )
                                        })
                                    }
                                </select>
                                        {errors.balde && <span className="Error-Style" >Balde é obrigatório</span>}
                            </div>
                            <div className="col-md-4 mt-4">

                                <Button variant="success" type="submit" > Depositar</Button>
                            </div>
                        </div>
                    </form>

                    <hr />

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Balde</th>
                                <th>Fruta</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                depositos.map((deposito: IBaldeFruta, index) => {
                                    return (
                                        <tr key={index} >
                                            <td> {deposito.id} </td>
                                            <td>
                                                {deposito.balde}
                                            </td>
                                            <td>
                                                {deposito.fruta}
                                            </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => { onRemoveDeposito(deposito.balde, deposito.fruta) }} > X </button>
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

export default Deposito;