import { Command, ux } from '@oclif/core';

import { CommandArg } from '../../args/command.js';
import { NameArg } from '../../args/name.js';
import Cluster from '../../lib/cluster.js';

export default class ClusterCreate extends Command {
   // eslint-disable-next-line perfectionist/sort-objects
   static override readonly args = { name: NameArg, command: CommandArg };

   static override readonly description = 'Execute a command on the clusters login node';

   public async run(): Promise<void> {
      const { args } = await this.parse(ClusterCreate);

      // Get cluster
      const cluster = new Cluster(args.name);

      // Check if the cluster already exists
      if (cluster.exists()) {
         this.error(ux.colorize('red', 'A cluster with that name already exists'));
      }

      // Create spinner
      this.log();
      ux.action.start('Running command');

      // Execute command
      const commandOutput = await cluster.execCommand(args.command);

      if (commandOutput === undefined) {
         ux.action.stop(ux.colorize('red', 'Failed'));
         this.error(ux.colorize('red', 'Failed to execute command'));
      }

      // Success spinner
      ux.action.stop(ux.colorize('green', 'successful'));

      // Output the outcome of the command
      this.log(commandOutput.out);
   }
}
