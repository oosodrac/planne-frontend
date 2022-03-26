import React, { useState } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { FrutaModel, IFruta } from './IFruta';

type Inputs = {
    nome: string,
    preco: number,
};

const Fruta = () => {

    const [frutas, setFrutas] = useState<IFruta[]>([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

    const onAddFruta = ( data: Inputs ) => {
        const fruta = new FrutaModel(data.nome, data.preco );
        setFrutas(prevFruta => [...prevFruta, fruta]);
        localStorage.setItem('frutas', JSON.stringify(frutas));
        reset();
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        onAddFruta( data ) ;
    };

    return (
        <div>
            <h1>Frutas</h1>

            <Row>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="mt-4" >
                            
                        <div className="mt-4">
                            <label>Nome da fruta</label>
                        <input className="form-control w-50" placeholder="Banana" type="text" {...register("nome", {required: true} )} />
                        </div>
                        <div className="mt-4" >
                            <label>Preço</label>
                        <input className="form-control mb-2 w-50" placeholder="0.00" step={0.01} type="number" {...register("preco", {required: true})}  />
                        </div>

                        <div className="mt-4" >
                            
                        <Button variant="primary" type="submit" > Adicionar fruta </Button>
                        </div>
                        </div>
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
                                    <th>Preço</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    frutas.map((fruta: IFruta, index) => {
                                        return (
                                            <tr key={index} >
                                                <td> {index + 1} </td>
                                                <td>
                                                    {fruta.nome}
                                                </td>
                                                <td>
                                                    {fruta.preco}
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

export default Fruta;