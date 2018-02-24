// @flow

import fs from 'fs';
import findDeff from '../src';

describe('gendiff complex test', () => {
  const excepted = fs.readFileSync('__tests__/__fixtures__/exceptedJson.txt', 'utf8');

  test('jsonDeff', () => {
    const jsonBefore = '__tests__/__fixtures__/before.json';
    const jsonAfter = '__tests__/__fixtures__/after.json';
    expect(findDeff(jsonBefore, jsonAfter, 'json')).toBe(excepted);
  });

  test('yamldeff', () => {
    const yamlBefore = '__tests__/__fixtures__/before.yaml';
    const yamlAfter = '__tests__/__fixtures__/after.yaml';
    expect(findDeff(yamlBefore, yamlAfter, 'json')).toEqual(excepted);
  });

  test('iniDeff', () => {
    const iniBefore = '__tests__/__fixtures__/before.ini';
    const iniAfter = '__tests__/__fixtures__/after.ini';
    expect(findDeff(iniBefore, iniAfter, 'json')).toEqual(excepted);
  });
});

