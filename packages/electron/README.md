[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Airthium_tanatloc-electron&metric=alert_status&token=85c07e6adc99ad2869724619d99df9057777451c)](https://sonarcloud.io/summary/new_code?id=Airthium_tanatloc-electron)

# Tanatloc electron

Electron builder from [Tanatloc](https://github.com/Airthium/tanatloc)

## Requirements

- [Docker](https://www.docker.com/)
  Follow the Docker installation instruction at https://docs.docker.com/get-docker/

- [postgres docker](https://hub.docker.com/_/postgres)
  Pull the latest postgres docker

  ```shell
  docker pull postgres
  ```

- [tanatloc/worker docker](https://hub.docker.com/repository/docker/tanatloc/worker/tags)
  Pull the latest tanatloc/worker docker
  ```shell
  docker pull tanatloc/worker
  ```

## App

Get the latest app for Linux, MacOS or Windows in the [release section](https://github.com/Airthium/tanatloc-electron/releases/latest).

<ins>Note:</ins> On Linux, you must allow execution of the AppImage file using

```shell
chmod +x ./Tanatloc-x.x.x.AppImage
```
