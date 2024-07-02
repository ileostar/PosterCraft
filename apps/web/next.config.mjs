import UnoCSS from '@unocss/webpack'
import AutoImport from 'unplugin-auto-import/webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(UnoCSS())
    config.plugins.push(AutoImport({
      imports: ['react']
    }))
    return config
  },
}

export default nextConfig
