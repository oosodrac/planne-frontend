import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { FrutaModel, IFruta } from './FrutaModel';
import FrutaService from "./FrutaService";

type Inputs = {
    id?: string,
    nome: string,
    preco: number,
    expiracao: number
};

const Fruta = () => {

    const [frutas, setFrutas] = useState<IFruta[]>([]);
    const [isNew, setIsNew] = useState( true );
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Inputs>();

    const onAddFruta = ( data: Inputs ) => {

        if ( isNew ) {
            
        const fruta = new FrutaModel(data.nome, Number(data.preco), Number(data.expiracao) );
        FrutaService.createFruta( fruta ).then( () => {
            getFrutas();
        } );
        } else {
            
        const fruta = new FrutaModel(data.nome, Number(data.preco), Number(data.expiracao) );
        FrutaService.updateFruta( Number(data.id), fruta ).then( () => {
            getFrutas();
        } );
        }

        setIsNew(true);

        reset();
    }

    const getFrutas = () => {
        FrutaService.getFrutas().then( response => {
            setFrutas( response.data );

        } );
    }

    useEffect( () => {
        getFrutas();
    }, [] )

    const onSubmit: SubmitHandler<Inputs> = data => {
        onAddFruta( data ) ;
    };

    const onSelecionaFruta = (fruta: IFruta) => {
        setValue( "id", fruta.id  );
        setValue( "nome", fruta.nome  );
        setValue( "preco", fruta.preco  );
        setValue( "expiracao", fruta.expiracao  );
        setIsNew(false);
    }

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
                            <label>Expiração <span >(em segundos)</span> </label>
                        <input className="form-control mb-2 w-50" placeholder="0" step={1} type="number" {...register("expiracao", {required: true})}  />
                        </div>

                        <div className="mt-4" >
                            
                        <Button variant="success" type="submit" > Salvar </Button>
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
                                    <th></th>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Expiração (segundos)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    frutas.map((fruta: IFruta, index) => {
                                        return (
                                            <tr key={index} >
                                            <td> <Button className="btn btn-info w-100 text-white" onClick={ () => { onSelecionaFruta(fruta) } } >Selecionar</Button> </td>
                                                <td> {fruta.id} </td>
                                                <td>
                                                    {fruta.nome}
                                                </td>
                                                <td>
                                                    {fruta.preco}
                                                </td>
                                                <td>
                                                    {fruta.expiracao}
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