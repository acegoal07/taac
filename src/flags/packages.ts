import { Flags } from '@oclif/core';

/**
 * Extras flag
 */
export const PackagesFlag = Flags.string({
   char: 'e',
   default: [],
   delimiter: ',',
   description: 'A command separated list of packages to install when setting up the cluster',
   multiple: true
});
