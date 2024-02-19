import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ListaPastas = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/lista_pastas');
            const data = await response.json();
            setData(data);
        };

        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;


    const handleChange = (event) => {
        navigate(`/${event.target.value}/${event.target.value}`);
    };

    return (
        <div>
            <select onChange={handleChange}>
                <option >Escolher Pasta</option>
                {data.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default ListaPastas;