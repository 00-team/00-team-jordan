import { Configuration } from 'webpack'
import Base from './base'

// path
import { SRC_DIR, LIB_DIR, resolve } from './config/path'

// style
import { BuildStyle } from './config/style'

// plugins
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const Config: Configuration = {
    ...Base,
    mode: 'production',
    entry: SRC_DIR,
    output: {
        path: LIB_DIR,
        clean: true,
        filename: 'index.js',
        sourceMapFilename: 'source_maps/[file].map',
        library: {
            name: '@00-team/vito',
            type: 'umd',
            umdNamedDefine: true,
        },
    },
    module: { rules: [...Base.module!.rules!, BuildStyle] },
    externals: {
        react: 'react',
    },
    plugins: [
        // new BundleAnalyzerPlugin()
    ],
    resolve: {
        ...Base.resolve!,
        alias: {
            components: resolve(SRC_DIR, 'components'),
            utils: resolve(SRC_DIR, 'utils'),
            icons: resolve(SRC_DIR, 'icons'),
            BaseComponent: resolve(SRC_DIR, 'BaseComponent'),
        },
    },
    optimization: {
        minimize: true,
        emitOnErrors: false,
    },
}

export default Config
