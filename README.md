<div align="center">

   <Img src="./logo.webp" alt="NPM version" style="max-width: 400px; height: auto;" />

---
  <a href="https://www.npmjs.com/package/@acegoal07/taac">
    <img src="https://img.shields.io/npm/v/@acegoal07/taac?style=for-the-badge&logo=npm" alt="NPM version" />
  </a>
  <a href="https://www.npmjs.com/package/@acegoal07/taac">
    <img src="https://img.shields.io/npm/dw/%40acegoal07%2Ftaac?style=for-the-badge&logo=npm" alt="NPM downloads" />
  </a>
  <a href="https://github.com/acegoal07/taac">
    <img src="https://img.shields.io/github/stars/acegoal07/taac?style=for-the-badge&logo=github" alt="GitHub stars" />
  </a>
  <a href="https://github.com/acegoal07/taac/issues">
    <img src="https://img.shields.io/github/issues/acegoal07/taac?style=for-the-badge&logo=github" alt="GitHub issues" />
  </a>
  <a href="https://github.com/acegoal07/taac/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/acegoal07/taac?style=for-the-badge&logo=github" alt="GitHub contributors" />
  </a>

---

[View on NPM](https://www.npmjs.com/package/@acegoal07/taac)

---

</div>

taac is a CLI tool that allows users to create test clusters using docker. It offers the ability to customise the clusters, manage the created clusters, and access them all from within the CLI.

## Requirements:

- `Node.js v24 or higher`
- `Docker installed and running`

## Versions used:

- `rockylinux:9`
- `slurm:26.05.1`

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
   - `--packages=<packages_name>`: Specify any extra packages to be installed in the cluster (comma-separated list)
   - `--commands=<command>`: Specify any extra commands to be executed in the cluster (comma-separated list) (run before packages installation)
- `taac cluster:edit <cluster_name>`: Edit the configuration of a specific cluster
   - `--nodes=<number_of_nodes>`: Specify the number of nodes in the cluster
   - `--cpus=<cpu_limit>`: Specify the CPU limit for each node
   - `--memory=<memory_limit>`: Specify the memory limit for each node
   - `--port=<port_number>`: Specify the port number for the cluster
   - `--database`: whether to include a database in the cluster
   - `--module=<module_name>`: which module manager to use (default is `Lmod`) available options are `lmod` and `em`
   - `--packages=<packages_name>`: Specify any extra packages to be installed in the cluster (comma-separated list)(Environment Modules)
   - `--commands=<command>`: Specify any extra commands to be executed in the cluster (comma-separated list) (run before packages installation)
- `taac cluster:exec <cluster_name> <command>`: Execute a command in a specific cluster
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
