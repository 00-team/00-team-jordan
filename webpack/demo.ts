import { Configuration as MainConf } from 'webpack'
import { Configuration as DevConf } from 'webpack-dev-server'

import Base from './base'

// configs
import { DEMO_DIR, resolve } from './config/path'
import { DevStyle } from './config/style'

// plugins
import HtmlPG from 'html-webpack-plugin'

interface Configuration extends MainConf {
    devServer: DevConf
}

const Config: Configuration = {
    ...Base,
    mode: 'development',
    entry: DEMO_DIR,
    module: {
        rules: [
            ...Base.module!.rules!,
            DevStyle,
            {
                test: /\.(mp4|ico)$/i,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new HtmlPG({
            template: resolve(DEMO_DIR, 'template.html'),
        }),
    ],
    devServer: {
        port: 8000,
        hot: true,
        historyApiFallback: true,
        client: {
            logging: 'none',
            reconnect: 7,
        },
    },
}

export default Config
