import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders header', () => {
  render(<App />);
  const header = screen.getByText(/yOurCARS/i);
  expect(header).toBeInTheDocument();
});
