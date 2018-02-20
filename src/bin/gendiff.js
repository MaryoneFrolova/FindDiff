#!/usr/bin/env node
import genDiff from '..';

const program = require('commander');

program
  .version('0.0.4')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig> [FILES...]')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

const pathBefore = program.args[0];
const pathAfter = program.args[1];

console.log(genDiff(pathBefore, pathAfter));

