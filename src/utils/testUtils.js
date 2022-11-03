import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import setupStore from '../app/store';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
