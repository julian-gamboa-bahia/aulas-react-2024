import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Index from './index';

test('renders home component', () => {
  render(
    <Router>
      <Index />
    </Router>
  );

  const homeElement = screen.getByText(/Home/i);
  expect(homeElement).toBeInTheDocument();
});

test('renders novo component', () => {
  render(
    <Router initialEntries={['/novo']}>
      <Index />
    </Router>
  );

  const novoElement = screen.getByText(/Novo/i);
  expect(novoElement).toBeInTheDocument();
});

test('renders novo component with etiqueta', () => {
  render(
    <Router initialEntries={['/etiqueta1/etiqueta2']}>
      <Index />
    </Router>
  );

  const novoElement = screen.getByText(/Novo/i);
  expect(novoElement).toBeInTheDocument();
});