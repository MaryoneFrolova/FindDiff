// @flow

import findDeff from '../src';

const yamlBefore = '__tests__/__fixtures__/before.yaml';
const yamlAfter = '__tests__/__fixtures__/after.yaml';
const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('yamldeff', () => {
  expect(findDeff(yamlBefore, yamlAfter)).toEqual(expected);
});
