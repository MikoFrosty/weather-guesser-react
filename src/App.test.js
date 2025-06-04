import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the header', () => {
  render(<App />);
  const headerElement = screen.getByText(/weather guesser!/i);
  expect(headerElement).toBeInTheDocument();
});
