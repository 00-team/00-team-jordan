import { Configuration } from 'webpack'
import Base from './base'

// path
import { resolve, SRC_DIR, LIB_DIR } from './config/path'

// style
import { BuildStyle } from './config/style'

const Config: Configuration = {
    ...Base,
    mode: 'production',
    entry: resolve(SRC_DIR, 'index.ts'),
    output: {
        path: LIB_DIR,
        clean: true,
        filename: 'index.js',
        sourceMapFilename: 'source_maps/[file].map',
        library: {
            name: '@00-team/jordan',
            type: 'umd',
            umdNamedDefine: true,
        },
    },
    module: { rules: [...Base.module!.rules!, BuildStyle] },
    externals: {
        react: 'react',
    },
    optimization: {
        minimize: true,
        emitOnErrors: false,
    },
}

export default Config
