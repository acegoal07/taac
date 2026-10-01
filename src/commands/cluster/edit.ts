import { Command, ux } from '@oclif/core';

import { NameArg } from '../../args/name.js';
import { CPUsFlag } from '../../flags/cpus.js';
import { DatabaseFlag } from '../../flags/database.js';
import { MemoryFlag } from '../../flags/memory.js';
import { ModuleFlag } from '../../flags/module.js';
import { NodesFlag } from '../../flags/nodes.js';
import { PortFlag } from '../../flags/port.js';
import Cluster, { type ClusterOptions } from '../../lib/cluster.js';
import { dockerUp } from '../../lib/util.js';

export default class ClusterEdit extends Command {
   static override readonly args = { name: NameArg };

   static override readonly description = "Edit's a taac cluster";
   static override readonly flags = {
      cpus: CPUsFlag,
      database: DatabaseFlag,
      memory: MemoryFlag,
      module: ModuleFlag,
      nodes: NodesFlag,
      port: PortFlag
   };

   public async run(): Promise<void> {
      const { args, flags } = await this.parse(ClusterEdit);

      // Check whether docker is running
      console.log();
      ux.action.start('Checking docker');

      if (!(await dockerUp())) {
         ux.action.stop(ux.colorize('red', 'Down'));
         throw new Error(ux.colorize('red', 'Docker needs to be running'));
      }

      ux.action.stop(ux.colorize('green', 'Running'));

      // Get cluster
      const cluster = new Cluster(args.name);

      // Check that cluster exists
      if (!cluster.exists()) {
         throw new Error(ux.colorize('red', "The cluster you're trying to edit doesn't exists"));
      }

      // Get cluster information
      const clusterData: ClusterOptions | undefined = cluster.dumpInfo();

      // Make sure there is cluster information
      if (!clusterData) {
         throw new Error(ux.colorize('red', 'Failed to retrieve cluster information'));
      }

      // Merge new data with old
      const updates = Object.fromEntries(
         Object.entries(flags).filter(([, value]) => value !== undefined)
      ) as Partial<Omit<ClusterOptions, 'name'>>;

      // Merge the options
      const updatedCluster: ClusterOptions = {
         ...clusterData,
         ...updates
      };

      // Destroy old cluster if data changed
      const isChanged = (Object.keys(clusterData) as Array<keyof ClusterOptions>).some(
         (key) => clusterData[key] !== updatedCluster[key]
      );

      // Make sure there is ta least one change
      if (!isChanged) {
         throw new Error(ux.colorize('yellow', 'No changes were made'));
      }

      // Destroys the cluster
      ux.action.start('Clearing old cluster information');
      if (await cluster.destroy()) {
         ux.action.stop(ux.colorize('green', 'Successful'));
      } else {
         ux.action.stop(ux.colorize('red', 'Failed'));
         throw new Error(ux.colorize('red', 'Failed to clear old cluster information'));
      }

      // Create updated cluster
      ux.action.start('Updating cluster with new options');
      if (cluster.create(updatedCluster)) {
         ux.action.stop(ux.colorize('green', 'Successful'));
      } else {
         ux.action.stop(ux.colorize('red', 'Failed'));
         throw new Error(ux.colorize('red', 'Failed to update cluster with new options'));
      }
   }
}
