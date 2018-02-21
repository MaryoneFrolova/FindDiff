// @flow

import findDeff from '../src';

const iniBefore = '__tests__/__fixtures__/before.ini';
const iniAfter = '__tests__/__fixtures__/after.ini';
const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('iniDeff', () => {
  expect(findDeff(iniBefore, iniAfter)).toEqual(expected);
});
