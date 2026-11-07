import { Command, ux } from '@oclif/core';

import { CPUsFlag } from '../../flags/cpus.js';
import { DatabaseFlag } from '../../flags/database.js';
import { MemoryFlag } from '../../flags/memory.js';
import { ModuleFlag } from '../../flags/module.js';
import { NameFlag } from '../../flags/name.js';
import { NodesFlag } from '../../flags/nodes.js';
import { PackagesFlag } from '../../flags/packages.js';
import { PortFlag } from '../../flags/port.js';
import Cluster from '../../lib/cluster.js';

export default class ClusterCreate extends Command {
   static override readonly description = 'Creates a clusters using the flags provided';
   static override readonly flags = {
      cpus: CPUsFlag,
      database: DatabaseFlag,
      memory: MemoryFlag,
      module: ModuleFlag,
      name: NameFlag,
      nodes: NodesFlag,
      packages: PackagesFlag,
      port: PortFlag
   };

   public async run(): Promise<void> {
      const { flags } = await this.parse(ClusterCreate);

      // Get cluster
      const cluster = new Cluster(flags.name);

      // Check if the cluster already exists
      if (cluster.exists()) {
         this.error(ux.colorize('red', 'A cluster with that name already exists'));
      }

      // Create spinner
      this.log();
      ux.action.start('Creating cluster');

      // Create cluster
      if (
         cluster.create({
            cpus: flags.cpus,
            database: flags.database,
            memory: flags.memory,
            module: flags.module,
            name: flags.name,
            nodes: flags.nodes,
            packages: flags.packages,
            port: flags.port
         })
      ) {
         // Success spinner
         ux.action.stop(ux.colorize('green', 'successful'));

         // Show cluster information
         this.log(
            ux.colorize(
               'green',
               `\nThe ${cluster.name} cluster has been saved to:\n${cluster.path}\n\nYou can now start up the cluster using:\ntaac cluster:start ${cluster.name}\n`
            )
         );
      } else {
         ux.action.stop(ux.colorize('red', 'Failed'));
         this.error(ux.colorize('red', 'Failed to create a cluster'));
      }
   }
}
