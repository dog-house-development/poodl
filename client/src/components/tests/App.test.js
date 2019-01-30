import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

test('App renders links', () => {
  const component = renderer.create(
    <App />,
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
