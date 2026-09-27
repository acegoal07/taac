import { Flags } from '@oclif/core';

/**
 * Preserve flag
 */
export const PreserveFlag = Flags.boolean({
   char: 'p',
   default: false,
   description: 'Preserve cluster files so it can be booted again'
});
