import { Command, ux } from '@oclif/core';

import { NameArg } from '../../args/name.js';
import Cluster from '../../lib/cluster.js';
import { dockerUp } from '../../lib/util.js';

export default class ClusterRestart extends Command {
   static override readonly args = { name: NameArg };

   static override readonly description = 'Restarts a running taac cluster';

   public async run(): Promise<void> {
      const { args } = await this.parse(ClusterRestart);

      // Check whether docker is running
      this.log();
      ux.action.start('Checking docker');

      if (!(await dockerUp())) {
         ux.action.stop(ux.colorize('red', 'Down'));
         this.error(ux.colorize('red', 'Docker needs to be running'));
      }

      ux.action.stop(ux.colorize('green', 'Running'));

      // Get the cluster
      ux.action.start('Checking cluster');
      const cluster = new Cluster(args.name);

      // Check that a cluster exists
      if (!cluster.exists()) {
         ux.action.stop(ux.colorize('yellow', 'Not Found'));
         this.error(ux.colorize('yellow', 'No cluster exists with that name'));
      }

      // Check if anything within the cluster is running
      if (!(await cluster.isUp())) {
         ux.action.stop(ux.colorize('red', 'Not Running'));
         this.error(ux.colorize('red', "The cluster isn't running"));
      }

      ux.action.stop(ux.colorize('green', 'Complete'));

      // Stopping the cluster
      ux.action.start(`Stopping ${cluster.name}`);
      await cluster
         .stop()
         .then(() => {
            ux.action.stop(ux.colorize('green', 'Successful'));
         })
         .catch((error: unknown) => {
            ux.action.stop(ux.colorize('red', 'Failed'));
            this.error(
               ux.colorize(
                  'red',
                  `\nAn error occurred while initialising the cluster:\n${error instanceof Error ? error.message : String(error)}\n`
               )
            );
         });

      // Start the cluster
      ux.action.start(`Starting ${cluster.name}`);
      await cluster
         .start()
         .then(() => {
            ux.action.stop(ux.colorize('green', 'Successful'));
            this.log(
               ux.colorize(
                  'green',
                  `\n${args.name} has been restarted and can now be connect to using:\ntaac connect ${cluster.name}\n`
               ) +
                  ux.colorize(
                     'yellow',
                     'Some nodes might still be starting so might not be accessible straight away\n'
                  )
            );
         })
         .catch((error: unknown) => {
            ux.action.stop(ux.colorize('red', 'Failed'));
            this.error(
               ux.colorize(
                  'red',
                  `\nAn error occurred while starting the cluster:\n${error instanceof Error ? error.message : String(error)}\n`
               )
            );
         });
   }
}
