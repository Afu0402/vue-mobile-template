
const path = require("path");
const theme = path.resolve(__dirname, "src/assets/vant-theme.less");

module.exports = {
    publicPath: './',
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },

    },
    lintOnSave: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [ 
                    require('postcss-px-to-viewport')({
                        viewportWidth: 750, //根据视觉稿的宽度进行设置
                        unitPrecision: 5,
                        viewportUnit: 'vw',
                        selectorBlackList: ['el'], //忽略转换的css选择器
                        minPixelValue: 1,
                        mediaQuery: false
                    }),
                ]
            },
            less: {
                lessOptions: {
                    modifyVars: {
                        hack: `true; @import "${theme}";`,
                    }
                }
            }
        }
    },
}