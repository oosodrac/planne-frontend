import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { IResumoBaldeFruta } from './../components/BaldeFruta/ResumoBaldeFruta';

const Home = () => {

    const [resumos, setResumos] = useState<IResumoBaldeFruta[]>([]);

    useEffect( () => {
        const sse = new EventSource('http://localhost:8080/api/v1/balde-frutas/sse-resumo', { withCredentials: false });

        function getRealTimeData(data: IResumoBaldeFruta[]) {
            setResumos( data );
        }

        sse.onmessage = e => getRealTimeData( JSON.parse(e.data) );
        sse.onerror = () => {
            console.log('Erro no stream de data: Resumo do Balde de fruta');
            sse.close();
        }

        return () => {
            sse.close();
        }
    }, [] )

    return (
        <div>
            <h4 className="mb-4" > Estatistica dos baldes </h4>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Balde</th>
                                    <th>Ocupação</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    resumos.map((resumo: IResumoBaldeFruta, index: number) => {
                                        return (
                                            <tr key={index} >
                                                <td> {index + 1} </td>
                                                <td>
                                                    {resumo.balde}
                                                </td>
                                                <td>
                                                    {resumo.ocupacao}%
                                                </td>
                                                <td>
                                                    {resumo.total} 
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
        </div>
    )
}

export default Home;