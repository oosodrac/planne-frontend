/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import Home from "../../modules/Home";
import { BaldeModel, IBaldeModel } from "./BaldeModel";
import { useForm, SubmitHandler } from "react-hook-form";
import BaldeService from "./BaldeService";
import BaldeFrutaService from "../BaldeFruta/BaldeFrutaService";
import { IResumoBaldeFruta } from "./../BaldeFruta/ResumoBaldeFruta";

type Inputs = {
  nome: string;
  capacidade: number;
};

const Balde = () => {
  const [baldes, setBaldes] = useState<IBaldeModel[]>([]);
  const [resumos, setResumos] = useState<IResumoBaldeFruta[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onAddBalde = (data: Inputs) => {
    const balde = new BaldeModel("1", data.nome, Number(data.capacidade));
    BaldeService.createBalde(balde).then(() => {
      retrieveBaldes();
    });
    reset();
  };

  const onRemoveBalde = (id: string, nome: string) => {
    BaldeService.removeBalde(id).then((response) => {
      alert(`Balde removido`);
      console.log(response);
      retrieveBaldes();
    });
  };

  useEffect(() => {
    retrieveBaldes();
    retrieveResumoBaldeFruta();
  }, []);

  const retrieveBaldes = () => {
    BaldeService.getBaldes().then((response) => {
      setBaldes(response.data);
      console.log(baldes);
    });
  };

  const retrieveResumoBaldeFruta = () => {
    BaldeFrutaService.getResumoBaldeFruta().then((response) => {
      setResumos(response.data);
      console.log(resumos);
    });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onAddBalde(data);
  };

  return (
    <div>
      <Row>
        <Col>
          <Home />
        </Col>
        <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Balde"
                  type="text"
                  {...register("nome", { required: true })}
                />
              </Col>
              <Col className="col-md-4">
                <input
                  className="form-control mb-2"
                  placeholder="Capacidade"
                  type="number"
                  {...register("capacidade", { required: true })}
                />
              </Col>
              <Col className="col-md-4">
                <Button variant="success" type="submit">
                  Salvar
                </Button>
              </Col>
            </Row>
          </form>

          <Table striped bordered hover size="sm" className="mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Capacidade máxima</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {baldes.map((balde: IBaldeModel, index) => {
                return (
                  <tr key={index}>
                    <td> {balde.id} </td>
                    <td>{balde.nome}</td>
                    <td>{balde.capacidade} fruta(s)</td>
                    <td>
                      <Button
                        variant="danger"
                        type="button"
                        className="btn-sm"
                        onClick={() => {
                          onRemoveBalde(balde.id, balde.nome);
                        }}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Balde;
