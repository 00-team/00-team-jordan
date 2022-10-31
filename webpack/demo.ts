// plugins
import HtmlPlugin from 'html-webpack-plugin'
import { Configuration as MainConf } from 'webpack'
import { Configuration as DevConf } from 'webpack-dev-server'

import Base from './base'
// configs
import { DEMO_DIR } from './config/path'
import { DevStyle } from './config/style'

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
                test: /\.mp4/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlPlugin({
            templateContent: '<div id="root" class="root" />',
        }),
    ],
    devServer: {
        port: 8000,
        hot: true,
        historyApiFallback: true,
        client: {
            logging: 'none',
            reconnect: 2,
        },
    },
}

export default Config
