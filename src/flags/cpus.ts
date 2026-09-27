import { Flags } from '@oclif/core';

/**
 * CPUs flag
 */
export const CPUsFlag = Flags.integer({
   char: 'c',
   default: 2,
   description: 'How many CPUs to give each node',
   max: 4,
   min: 1
});
