#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConf, secondConf) => console.log(genDiff(firstConf, secondConf, program.format)))
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
