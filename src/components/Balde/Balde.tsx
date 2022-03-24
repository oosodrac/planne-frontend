import React, { useState } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import Home from '../../modules/Home';
import { BaldeModel, IBaldeModel } from './BaldeModel';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    nome: string,
    capacidadeMaxima: number,
};

const Balde = () => {

    const [baldes, setBaldes] = useState<IBaldeModel[]>([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        const balde = new BaldeModel(data.nome, data.capacidadeMaxima);
        setBaldes(prevBalde => [...prevBalde, balde]);
        localStorage.setItem('baldes', JSON.stringify(baldes));
        reset();
        console.log(data);
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
                        <input className="form-control mt-2 mb-2 w-25" placeholder="Capacidade" type="number" {...register("capacidadeMaxima", {required: true})}  />
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
                                                <td> {index + 1} </td>
                                                <td>
                                                    {balde.nome}
                                                </td>
                                                <td>
                                                    {balde.capacidadeMaxima}
                                                </td>
                                                <td>
                                                    <Button variant="danger" type="button" >X</Button>
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