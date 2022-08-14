import { FormatPriority } from '@universal-packages/config-loader'
export { Format, FormatPriority } from '@universal-packages/config-loader'

export type PluginConfigLocation = 'package' | 'root' | '.root' | 'directory' | '.directory'
export type PluginConfigLocationPriority = PluginConfigLocation[]

export interface LoadPluginConfigurationOptions {
  formatPriority?: FormatPriority
  loadFrom?: string
  locationPriority?: PluginConfigLocationPriority
  selectEnvironment?: string | true
}
