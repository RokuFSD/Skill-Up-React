import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/testUtils';
import '@testing-library/jest-dom/';
import AuthDisplay from '../AuthDisplay';

import { apiUrl } from '../authActions';

export const handlers = [
  rest.post(`${apiUrl}/auth/login`, (req, res, ctx) => {
    return res(ctx.json({ accessToken: 'falsetoken' }), ctx.delay(150));
  }),
  rest.get(`${apiUrl}/auth/me`, (req, res, ctx) => {
    return res(ctx.json({ first_name: 'Emiliano', last_name: 'Ruiz', roleId: 2 }), ctx.delay(150));
  })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('AuthDisplay', () => {
  it('should render there is no user logged in', () => {
    renderWithProviders(<AuthDisplay />);
    expect(screen.getByText('Not logged in')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should render the user after button click', async () => {
    renderWithProviders(<AuthDisplay />);
    const button = screen.getByRole('button', { name: /login/i });
    fireEvent.click(button);
    expect(await screen.findByText('Emiliano Ruiz')).toBeInTheDocument();
    expect(screen.queryByText('Not logged in')).not.toBeInTheDocument();
  });

  it('should render the error message', async () => {
    server.use(
      rest.post(`${apiUrl}/auth/login`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.delay(150));
      })
    );
    renderWithProviders(<AuthDisplay />);
    const button = screen.getByRole('button', { name: /login/i });
    fireEvent.click(button);
    expect(await screen.findByText('Rejected')).toBeInTheDocument();
  });
});
