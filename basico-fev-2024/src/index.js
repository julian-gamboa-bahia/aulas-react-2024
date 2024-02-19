import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Home from './Componentes/Home';
import Novo from './Componentes/Novo';
import Etiquetas from './Componentes/Etiquetas';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/js/bootstrap.esm.min';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <div>
      <Router>
      <Routes>
        <Route path="/" element={<Novo />} />   
        
        <Route path="/:etiqueta/:etiqueta" element={<Etiquetas />} />        
      </Routes>
    </Router>
      </div>
  </React.StrictMode>
);

reportWebVitals();
