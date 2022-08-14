import { checkFile } from '@universal-packages/fs-utils'
import { loadConfig, loadFileConfig, processConfig } from '@universal-packages/config-loader'
import { LoadPluginConfigurationOptions, PluginConfigLocation } from './loadPluginConfig.types'

const PROCESSORS_MAP: Record<PluginConfigLocation, Function> = {
  package: loadPackageConfig,
  root: loadRootConfig,
  '.root': loadDotRootConfig,
  directory: loadDirectoryConfig,
  '.directory': loadDotDirectoryConfig
}

/** Loads configs in the match priority order */
export async function loadPluginConfig<T = any>(pluginName: string, options?: LoadPluginConfigurationOptions): Promise<Record<string, any>> {
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
      loaded = await PROCESSORS_MAP[priorityName](pluginName, finalOptions)

      if (loaded) return loaded
    } catch {
      continue
    }
  }
}

async function loadPackageConfig(pluginName: string, options: LoadPluginConfigurationOptions): Promise<Record<string, any>> {
  const finalLocation = checkFile(`${options.loadFrom}/package.json`)
  const contents = await import(finalLocation)

  return processConfig(contents[pluginName], options.selectEnvironment === true ? process.env['NODE_ENV'] : options.selectEnvironment)
}

async function loadRootConfig(pluginName: string, options: LoadPluginConfigurationOptions): Promise<Record<string, any>> {
  return await loadFileConfig(`${options.loadFrom}/${pluginName}`, options)
}

async function loadDotRootConfig(pluginName: string, options: LoadPluginConfigurationOptions): Promise<Record<string, any>> {
  return await loadRootConfig(`.${pluginName}`, options)
}

async function loadDirectoryConfig(pluginName: string, options: LoadPluginConfigurationOptions): Promise<Record<string, any>> {
  return await loadConfig(`${options.loadFrom}/${pluginName}`, options)
}

async function loadDotDirectoryConfig(pluginName: string, options: LoadPluginConfigurationOptions): Promise<Record<string, any>> {
  return await loadDirectoryConfig(`.${pluginName}`, options)
}
