import { Args } from '@oclif/core';

/**
 * Command arg
 */
export const CommandArg = Args.string({
   description: 'The command to execute',
   required: true
});
