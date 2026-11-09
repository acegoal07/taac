import { Flags } from '@oclif/core';

export const CommandsFlag = Flags.string({
   char: 'f',
   default: [],
   delimiter: ',',
   description: 'Additional commands to run during the creation of the cluster',
   multiple: true
});
