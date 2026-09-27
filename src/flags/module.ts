import { Flags } from '@oclif/core';

/**
 * Module flag
 */
export const ModuleFlag = Flags.string({
   char: 'l',
   default: 'lmod',
   description: 'The module loader type to use in the cluster',
   options: ['lmod', 'em']
});
