// @flow

import jsonDeff from '../../src';

const jsonBefore = '__tests__/__fixtures__/before.json';
const jsonAfter = '__tests__/__fixtures__/after.json';
const expected = ['  host: hexlet.io', '+ timeout: 20', '- timeout: 50',
  '- proxy: 123.234.53.22', '+ verbose: true'].join('\n');

test('jsondeff', () => {
  expect(jsonDeff(jsonBefore, jsonAfter)).toEqual(expected);
});
