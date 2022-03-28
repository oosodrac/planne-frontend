import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Home from "../../modules/Home";
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
    const [isNew, setIsNew] = useState(true);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Inputs>();

    const onAddFruta = (data: Inputs) => {

        if (isNew) {

            const fruta = new FrutaModel(data.nome, Number(data.preco), Number(data.expiracao));
            FrutaService.createFruta(fruta).then(() => {
                getFrutas();
            });
        } else {

            const fruta = new FrutaModel(data.nome, Number(data.preco), Number(data.expiracao));
            FrutaService.updateFruta(Number(data.id), fruta).then(() => {
                getFrutas();
            });
        }

        setIsNew(true);

        reset();
    }

    const getFrutas = () => {
        FrutaService.getFrutas().then(response => {
            setFrutas(response.data);

        });
    }

    useEffect(() => {
        getFrutas();
    }, [])

    const onSubmit: SubmitHandler<Inputs> = data => {
        onAddFruta(data);
    };

    const onSelecionaFruta = (fruta: IFruta) => {
        setValue("id", fruta.id);
        setValue("nome", fruta.nome);
        setValue("preco", fruta.preco);
        setValue("expiracao", fruta.expiracao);
        setIsNew(false);
    }

    const errorStyle = {
        color: "red",
        fontSize: "8px"
    }

    return (
        <div>

            <Row>
                <Col>
                    <Home />
                </Col>

                <Col>


                    <h4>Registrar fruta</h4>

                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Row>
                            {/* <Col> */}
                                    <div className="col-md-4">
                                        <label>Nome</label>
                                        <input className="form-control" placeholder="Banana" type="text" {...register("nome", { required: true })} />
                                        {errors.nome && <span style={ errorStyle } >Nome é obrigatório</span>}
                                    </div>

                                    <div className="col-md-3" >
                                        <label>Preço</label>
                                        <input className="form-control mb-2" placeholder="0.00" min={0} step={0.01} type="number" {...register("preco", { required: true })} />
                                        {errors.preco && <span style={ errorStyle } >Preço é obrigatório</span>}
                                    </div>

                                    <div className="col-md-3" >
                                        <label>Expiração</label>
                                        <input className="form-control mb-2" placeholder="0" min={1} step={1} type="number" {...register("expiracao", { required: true })} />
                                        {errors.expiracao && <span style={ errorStyle } >Expiração é obrigatório</span>}
                                    </div>

                                    <div className="col-md-2 mt-4" >
                                        <Button variant="success" type="submit" > Salvar </Button>
                                    </div>
                            {/* </Col> */}
                        </Row>
                    </form>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th></th>
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
                                                    <td> <Button className="btn btn-info w-100 text-white" onClick={() => { onSelecionaFruta(fruta) }} >Selecionar</Button> </td>
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