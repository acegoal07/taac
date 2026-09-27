import { Flags } from '@oclif/core';

/**
 * Nodes flag
 */
export const NodesFlag = Flags.integer({
   char: 'k',
   default: 1,
   description: 'How many nodes to give to the cluster',
   max: 5,
   min: 1
});
