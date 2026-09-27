import { Flags } from '@oclif/core';

/**
 * Port flag
 */
export const PortFlag = Flags.integer({
   char: 'p',
   default: 2200,
   description: 'Which port to use for the SSH',
   max: 2300,
   min: 2200
});
