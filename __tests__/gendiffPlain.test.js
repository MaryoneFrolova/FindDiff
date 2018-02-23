// @flow

import fs from 'fs';
import findDeff from '../src';

describe('gendiff complex test', () => {
  const excepted = fs.readFileSync('__tests__/__fixtures__/exceptedPlain.txt', 'utf8');

  test('jsonDeff', () => {
    const jsonBefore = '__tests__/__fixtures__/before.json';
    const jsonAfter = '__tests__/__fixtures__/after.json';
    expect(findDeff(jsonBefore, jsonAfter, 'plain')).toBe(excepted);
  });

  test('yamldeff', () => {
    const yamlBefore = '__tests__/__fixtures__/before.yaml';
    const yamlAfter = '__tests__/__fixtures__/after.yaml';
    expect(findDeff(yamlBefore, yamlAfter, 'plain')).toEqual(excepted);
  });

  test('iniDeff', () => {
    const iniBefore = '__tests__/__fixtures__/before.ini';
    const iniAfter = '__tests__/__fixtures__/after.ini';
    expect(findDeff(iniBefore, iniAfter, 'plain')).toEqual(excepted);
  });
});

