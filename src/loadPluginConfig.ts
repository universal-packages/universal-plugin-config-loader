import { loadConfig, loadFileConfig, processConfig } from '@universal-packages/config-loader'
import { checkFile } from '@universal-packages/fs-utils'

import { LoadPluginConfigurationOptions, PluginConfigLocation } from './loadPluginConfig.types'

const PROCESSORS_MAP: Record<PluginConfigLocation, Function> = {
  package: loadPackageConfig,
  root: loadRootConfig,
  '.root': loadDotRootConfig,
  directory: loadDirectoryConfig,
  '.directory': loadDotDirectoryConfig
}

/** Loads configs in the match priority order */
export function loadPluginConfig<T = Record<string, any>>(pluginName: string, options?: LoadPluginConfigurationOptions): T {
  const finalOptions: LoadPluginConfigurationOptions = {
    loadFrom: './',
    locationPriority: ['package', 'root', '.root', 'directory', '.directory'],
    formatPriority: ['json', 'yaml', 'yml', 'js', 'ts'],
    ...options
  }
  let loaded: any

  for (let i = 0; i < finalOptions.locationPriority.length; i++) {
    const priorityName = finalOptions.locationPriority[i]

    try {
      loaded = PROCESSORS_MAP[priorityName](pluginName, finalOptions)

      if (loaded) return loaded
    } catch {
      continue
    }
  }
}

function loadPackageConfig(pluginName: string, options: LoadPluginConfigurationOptions): Record<string, any> {
  const finalLocation = checkFile(`${options.loadFrom}/package.json`)
  const contents = require(finalLocation)

  const processedConfig = processConfig(
    contents[pluginName],
    options.cleanOrphanReplaceable,
    options.selectEnvironment === true ? process.env['NODE_ENV'] : options.selectEnvironment
  )

  return processedConfig
}

function loadRootConfig(pluginName: string, options: LoadPluginConfigurationOptions): Record<string, any> {
  return loadFileConfig(`${options.loadFrom}/${pluginName}`, options)
}

function loadDotRootConfig(pluginName: string, options: LoadPluginConfigurationOptions): Record<string, any> {
  return loadRootConfig(`.${pluginName}`, options)
}

function loadDirectoryConfig(pluginName: string, options: LoadPluginConfigurationOptions): Record<string, any> {
  return loadConfig(`${options.loadFrom}/${pluginName}`, options)
}

function loadDotDirectoryConfig(pluginName: string, options: LoadPluginConfigurationOptions): Record<string, any> {
  return loadDirectoryConfig(`.${pluginName}`, options)
}
