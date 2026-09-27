import { Command, ux } from '@oclif/core';

import { NameArg } from '../../args/name.js';
import Cluster from '../../lib/cluster.js';

export default class SshInfo extends Command {
   static override readonly args = { name: NameArg };

   static override readonly description = 'Get tac cluster SSH information';

   public async run(): Promise<void> {
      const { args } = await this.parse(SshInfo);

      // Get cluster
      const cluster = new Cluster(args.name);

      // Checks whether the cluster exists
      if (!cluster.exists()) {
         throw new Error(ux.colorize('yellow', 'No cluster with that name exists'));
      }

      // Get cluster SSH connection information
      const connectionInformation = cluster.connectionInfo();

      // Output SSH connection information
      console.log(
         `\nusername: ${connectionInformation.username}\nhost: ${connectionInformation.host}\nport: ${connectionInformation.port}\nKey path: ${connectionInformation.privateKeyPath}\n`
      );
   }
}
