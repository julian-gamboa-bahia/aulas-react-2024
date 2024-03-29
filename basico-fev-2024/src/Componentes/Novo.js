import React, { useState, useEffect } from 'react';


import ListaPastas from './ListaPastas';


function Novo() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contador, setContador] = useState(0); // Adiciona o estado do contador
    const [key, setKey] = useState('');

    // Método para lidar com o evento de pressionar uma tecla
    const handleKey = (event) => {

        switch (event.key) {
            case 'ArrowUp':
                setContador(contador => contador + 10);
                break;
            case 'ArrowDown':
                setContador(contador => contador - 10);
                break;
            case 'ArrowLeft':
                setContador(contador => contador - 1);
                break;
            case 'ArrowRight':
                setContador(contador => contador + 1);
                break;
            default:
        }

        setKey(event.key);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Faz a requisição para a API
                const response = await fetch('http://localhost:3001/novas');
                //const response = await fetch('http://localhost:3001/lista_pastas');

                // Verifica se a resposta foi bem-sucedida (status code 200-299)
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                // Converte a resposta para JSON
                const jsonData = await response.json();

                // Atualiza o estado com os dados recebidos da API
                setData(jsonData);


            } catch (error) {
                // Em caso de erro, atualiza o estado de erro
                setError(error);
            } finally {
                // Indica que a requisição foi concluída, seja com sucesso ou com erro
                setIsLoading(false);
            }
        };

        // Chama a função fetchData para buscar os dados da API
        fetchData();


        // Adiciona um intervalo para incrementar o contador a cada segundo
        const intervalId = setInterval(() => {
            setContador(contador => contador + 1);
        }, 3000);

        window.addEventListener('keydown', handleKey);


        return () => {
            clearInterval(intervalId);
            window.removeEventListener('keydown', handleKey);
        }

    }, []); // O segundo argumento vazio [] garante que o useEffect será executado apenas uma vez, após a montagem do componente

    // Se ocorreu um erro ao buscar os dados, exibe uma mensagem de erro
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Se ainda estiver carregando os dados, exibe uma mensagem de carregamento
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Se os dados foram carregados com sucesso, renderiza os dados na tela
    return (
        
        <div>            
            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <ListaPastas />
                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src={data[contador]} alt="Card image cap"
                                    width="300" height="200"></img>
                                <div class="card-body">

                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src={data[contador + 1]} alt="Card image cap"
                                    width="300" height="200"></img>

                                <div class="card-body">

                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src={data[contador + 2]} alt="Card image cap"
                                    width="300" height="200"></img>
                                <div class="card-body">

                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src={data[contador + 3]} alt="Card image cap"
                                    width="300" height="200"></img>
                                <div class="card-body">

                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src={data[contador + 4]} alt="Card image cap"
                                    width="300" height="200"></img>
                                <div class="card-body">

                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src={data[contador + 5]} alt="Card image cap"
                                    width="300" height="200"></img>
                                <div class="card-body">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Novo;
