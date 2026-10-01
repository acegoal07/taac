# taac - Technically Almost A Cluster

[View on NPM](https://www.npmjs.com/package/@acegoal07/taac)

taac is a CLI tool that allows users to create test clusters using docker. It offers the ability to customise the clusters, manage the created clusters, and access them all from within the CLI.

## Requirements:

- `Node.js v24 or higher`
- `Docker installed and running`

## How to install:

```sh
npm i -g @acegoal07/taac
```

## Available commands:

- `taac help`: Display help information
- `taac cluster:create`: Create a new cluster
   - `--name=<cluster_name>`: Specify the name of the cluster
   - `--nodes=<number_of_nodes>`: Specify the number of nodes in the cluster
   - `--cpus=<cpu_limit>`: Specify the CPU limit for each node
   - `--memory=<memory_limit>`: Specify the memory limit for each node
   - `--port=<port_number>`: Specify the port number for the cluster
   - `--database`: whether to include a database in the cluster
   - `--module=<module_name>`: which module manager to use (default is `Lmod`) available options are `lmod` and `em`
- `taac cluster:edit <cluster_name>`: Edit the configuration of a specific cluster
   - `--nodes=<number_of_nodes>`: Specify the number of nodes in the cluster
   - `--cpus=<cpu_limit>`: Specify the CPU limit for each node
   - `--memory=<memory_limit>`: Specify the memory limit for each node
   - `--port=<port_number>`: Specify the port number for the cluster
   - `--database`: whether to include a database in the cluster
   - `--module=<module_name>`: which module manager to use (default is `Lmod`) available options are `lmod` and `em` (Environment Modules)
- `taac cluster:restart <cluster_name>`: Restart a specific cluster
- `taac cluster:start <cluster_name>`: Start a specific cluster
- `taac cluster:stop <cluster_name>`: Stop a specific cluster
- `taac destroy:all`: Destroy all clusters
   - `--preserve`: Preserve the clusters file so it can be used to recreate the clusters later
- `taac destroy <cluster_name>`: Destroy a specific cluster
   - `--preserve`: Preserve the clusters file so it can be used to recreate the clusters later
- `taac ssh <cluster_name>`: SSH into a specific cluster
- `taac ssh:info <cluster_name>`: Get SSH connection information for a specific cluster
- `taac list`: List all available clusters
