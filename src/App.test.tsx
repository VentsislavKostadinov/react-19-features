import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom"

describe('App Component', () => {
  it('renders the Vite + React heading', () => {
    render(<App />);
    const heading = screen.getByText(/Vite \+ React/i);
    expect(heading).toBeInTheDocument();
  });

  it('increments count on button click', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });

    expect(button).toHaveTextContent('count is 0');
    fireEvent.click(button);
    expect(button).toHaveTextContent('count is 1');
  });

  it('renders Vite and React logos with links', () => {
    render(<App />);
    const viteLogo = screen.getByAltText(/Vite logo/i);
    const reactLogo = screen.getByAltText(/React logo/i);

    expect(viteLogo.closest('a')).toHaveAttribute('href', 'https://vite.dev');
    expect(reactLogo.closest('a')).toHaveAttribute('href', 'https://react.dev');
  });
});
