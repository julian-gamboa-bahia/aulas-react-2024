// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <ul>
          {/* Use <Link> para definir links para outras rotas */}
          <li><Link to="/novo">novo</Link></li>          
        </ul>
      </nav>
    </div>
  );
}

export default Home;
