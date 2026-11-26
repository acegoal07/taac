import { Args, Command, ux } from '@oclif/core';

import { NameArg } from '../../args/name.js';
import Cluster, { type ClusterOptions } from '../../lib/cluster.js';

export default class ClusterDuplicate extends Command {
   static override readonly args = {
      target: NameArg,
      // eslint-disable-next-line perfectionist/sort-objects
      destination: Args.string({
         ...NameArg,
         description: 'The name of the duplicate cluster',
         required: true
      })
   };

   static override readonly description = "Duplicates a cluster you've already made";

   public async run(): Promise<void> {
      const { args } = await this.parse(ClusterDuplicate);

      // Get target cluster
      const targetCluster = new Cluster(args.target);

      // Make sure the target cluster exists
      if (!targetCluster.exists()) {
         this.error(ux.colorize('red', 'The targeted cluster doesnt exist'));
      }

      // Get the destination cluster
      const destinationCluster = new Cluster(args.destination);

      // Make sure the destination doesnt already exist
      if (destinationCluster.exists()) {
         this.error(ux.colorize('red', 'The destination cluster already exists'));
      }

      // Create spinner
      this.log();
      ux.action.start('Creating cluster');

      // Get cluster information
      const clusterData: ClusterOptions | undefined = targetCluster.dumpInfo();

      // Make sure there is cluster information
      if (!clusterData) {
         this.error(ux.colorize('red', 'Failed to retrieve cluster information'));
      }

      // Create cluster
      if (destinationCluster.create(clusterData)) {
         // Success spinner
         ux.action.stop(ux.colorize('green', 'successful'));

         // Show cluster information
         this.log(
            ux.colorize(
               'green',
               `\nThe ${destinationCluster.name} cluster has been saved to:\n${destinationCluster.path}\n\nYou can now start up the cluster using:\ntaac cluster:start ${destinationCluster.name}\n`
            )
         );
      } else {
         ux.action.stop(ux.colorize('red', 'Failed'));
         this.error(ux.colorize('red', 'Failed to create a cluster'));
      }
   }
}
