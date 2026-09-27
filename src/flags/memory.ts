import { Flags } from '@oclif/core';

/**
 * Memory flag
 */
export const MemoryFlag = Flags.integer({
   char: 'm',
   default: 1024,
   description: 'How much memory will be given to the cluster',
   max: 4096,
   min: 1024
});
