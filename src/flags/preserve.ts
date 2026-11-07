import { Flags } from '@oclif/core';

/**
 * Preserve flag
 */
export const PreserveFlag = Flags.boolean({
   char: 'x',
   default: false,
   description: 'Preserve cluster files so it can be booted again'
});
