import { Flags } from '@oclif/core';

/**
 * Database flag
 */
export const DatabaseFlag = Flags.boolean({
   char: 'd',
   default: false,
   description: 'Whether or not a database should be setup for the cluster'
});
