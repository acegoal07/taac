import { Flags } from '@oclif/core';

/**
 * Cluster name flag
 */
export const NameFlag = Flags.string({
   char: 'n',
   default: 'taac',
   description: 'The name of the cluster',
   async parse(value) {
      const trimmed = value.trim();

      if (trimmed.length === 0) {
         throw new Error('The name cannot be empty');
      }

      if (trimmed.length > 25) {
         throw new Error('The name cannot be more than 25 characters');
      }

      if (!/^[a-zA-Z0-9_ \-]+$/v.test(trimmed)) {
         throw new Error(
            'The name may only contain letters, numbers, spaces, hyphens, and underscores'
         );
      }

      return trimmed;
   }
});
