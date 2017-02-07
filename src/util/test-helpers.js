import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../store';

// Provide all the context for components that connect to the Redux
// store, i18n, router, etc.
export const TestProvider = props => {
  const store = configureStore();
  return (
    <IntlProvider locale="en">
      <BrowserRouter>
        <Provider store={store}>
          {props.children}
        </Provider>
      </BrowserRouter>
    </IntlProvider>
  );
};

// Use Enzyme's shallow rendering to render the given component to a
// JSON structure that can be used in snapshot tests. This doesn't
// render the children within the given component, only a
// representation of the child component and its props.
//
// Useful for snapshot testing components that contain shared
// components. With deep rendering, if the child component changes
// internally, the test for the given component would also fail. This
// avoids the problem by not rendering the full tree but only the
// relevant structure for the given component.
export const renderShallow = component => {
  return toJson(shallow(component));
};

// Fully render the given component to a JSON structure that can be
// used in snapshot tests.
export const renderDeep = component => {
  const comp = renderer.create(
    <TestProvider>
      {component}
    </TestProvider>,
  );
  return comp.toJSON();
};
