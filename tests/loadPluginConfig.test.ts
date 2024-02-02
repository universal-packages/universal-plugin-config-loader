import { loadPluginConfig } from '../src'

describe(loadPluginConfig, (): void => {
  it('loads following location and format priority', async (): Promise<void> => {
    // Default to package .json
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__' })).toEqual({ test: { package: true } })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['package'], selectEnvironment: true })).toEqual({ package: true })

    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['root', '.root'] })).toEqual({ json: 'root' })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['root', '.root'], formatPriority: ['js', 'json'] })).toEqual({ js: 'root' })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['root', '.root'], formatPriority: ['ts', 'json'] })).toEqual({ ts: 'root' })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['root', '.root'], formatPriority: ['yaml', 'json'] })).toEqual({ json: 'root' }) // There is no yaml file
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['root', '.root'], formatPriority: ['yml', 'json'], selectEnvironment: true })).toEqual(
      { yml: 'root', test: true }
    )

    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.root', 'root'] })).toEqual({ json: '.root' })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.root', 'root'], formatPriority: ['js', 'json'] })).toEqual({ js: '.root' })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.root', 'root'], formatPriority: ['ts', 'json'] })).toEqual({ ts: '.root' })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.root', 'root'], formatPriority: ['yaml', 'json'] })).toEqual({ json: '.root' }) // There is no yaml file
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.root', 'root'], formatPriority: ['yml', 'json'] })).toEqual({ yml: '.root' })

    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['directory', '.directory'] })).toEqual({
      config: { json: 'directory' },
      more: { json: 'directory' }
    })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['directory', '.directory'], formatPriority: ['js', 'json'] })).toEqual({
      config: { js: 'directory' },
      more: { js: 'directory' }
    })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['directory', '.directory'], formatPriority: ['ts', 'json'] })).toEqual({
      config: { ts: 'directory' },
      more: { ts: 'directory' }
    })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['directory', '.directory'], formatPriority: ['yaml', 'json'] })).toEqual({
      config: { json: 'directory' },
      more: { json: 'directory' }
    })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['directory', '.directory'], formatPriority: ['yml', 'json'] })).toEqual({
      config: { yml: 'directory' },
      more: { yml: 'directory' }
    })

    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.directory', 'directory'] })).toEqual({
      config: { json: '.directory' },
      more: { json: '.directory' }
    })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.directory', 'directory'], formatPriority: ['js', 'json'] })).toEqual({
      config: { js: '.directory' },
      more: { js: '.directory' }
    })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.directory', 'directory'], formatPriority: ['ts', 'json'] })).toEqual({
      config: { ts: '.directory' },
      more: { ts: '.directory' }
    })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.directory', 'directory'], formatPriority: ['yaml', 'json'] })).toEqual({
      config: { json: '.directory' },
      more: { json: '.directory' }
    })
    expect(loadPluginConfig('plugin', { loadFrom: './tests/__fixtures__', locationPriority: ['.directory', 'directory'], formatPriority: ['yml', 'json'] })).toEqual({
      config: { yml: '.directory' },
      more: { yml: '.directory' }
    })
  })

  it('loads nothing if not found', async (): Promise<void> => {
    expect(loadPluginConfig('nothing', { loadFrom: './tests/__fixtures__' })).toEqual(undefined)
  })
})
