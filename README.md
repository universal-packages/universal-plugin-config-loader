# Plugin Config Loader

[![npm version](https://badge.fury.io/js/@universal-packages%2Fplugin-config-loader.svg)](https://www.npmjs.com/package/@universal-packages/plugin-config-loader)
[![Testing](https://github.com/universal-packages/universal-plugin-config-loader/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-plugin-config-loader/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-plugin-config-loader/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-plugin-config-loader)

Load your plugin configuration easily into a single plain old javascript object, either if it has been provided in the `package.json` file or in some file named with your plugin's name.

## Install

```shell
npm install @universal-packages/plugin-config-loader
```

## loadPluginConfig()

Reads deeply into files and directories named as the plugin name provided and get all the contents of the configuration files into a plain old javascript object.

```js
import { loadPluginConfig } from '@universal-packages/plugin-config-loader'

async function test() {
  const config = await loadPluginConfig('plugin')

  console.log(config)
}

test()
```

Loads all config files as json that matches the criteria in a conventional, files like:

```
 | package.json           <- First priority
   | "plugin": { ... }
 | plugin                 <- Forth priority
   | anything.json          <- 2
   | anything.yaml          <- loaded if not json
   | anything.[js|ts]       <- loaded if not yaml
 | .plugin                <- Fifth priority
   | anything.json          <- 2
   | anything.yaml          <- loaded if not json
   | anything.[js|ts]       <- loaded if not yaml
 | plugin.json            <- Second priority
 | plugin.yaml            <- loaded if not json
 | plugin.[js|ts]         <- loaded if not yaml
 | .plugin.json           <- Third priority
 | .plugin.yaml           <- loaded if not json
 | .plugin.[js|ts]        <- loaded if not yaml
```

You can always modify the priority of location and format in the options.

## Options

- **`formatPriority`** `['json' | 'yaml' | 'yml' | 'js' | 'ts']`
  Prioritization order if one format is desired but does not exists which one try next?

- **`loadFrom`** `string`
  By default it will try to load from the root path but a different path can be specified to load from.

- **`locationPriority`** `['package' | 'root' | '.root' | 'directory' | '.directory']`
  By default is loaded from the package first but you can change the order of the location to be fetch first.
  - `package`: Internally embedded in the package.json file
  - `root`: A file named as the plugin name, ex: `jest.js`
  - `.root`: A file named as the plugin name with a prefixed dot, ex: `.jest.js`
  - `directory`: A folder containing more that one config file named as the plugin name, ex: `./github`
  - `.directory`: A folder containing more that one config file named as the plugin name with a prefixed dot, ex: `./.github`

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
