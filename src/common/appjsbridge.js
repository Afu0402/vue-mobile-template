/*
 * @Descripttion:
 * @Author: chenjunwei
 * @Date: 2020-07-10 15:31:32
 * @LastEditors: chenjunwei
 * @LastEditTime: 2020-11-06 14:58:46
 */
// 这里根据移动端原生的 userAgent 来判断当前是 Android 还是 ios
const u = navigator.userAgent

const appjsbridge = {
    // 判断是否是 iOS终端
    isIos: function () {
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    // 判断是否是android终端
    isAndroid: function () {
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    },

    // 获取用户信息
    // 入参：返回结果回调函数
    beforeGetData: function () {
        if (this.isIos()) {
            window.webkit.messageHandlers.beforeGetData.postMessage(null)
        } else if (this.isAndroid()) {
            window.AndroidToJS.beforeGetData(null)
        }
    },
    // 赣州银行电子钱包
    siroPay: function (msg) {
        if (this.isIos()) {
            window.webkit.messageHandlers.siroPay.postMessage(msg)
        } else if (this.isAndroid()) {
            window.AndroidToJS.siroPay(msg)
        }
    },
    wechatPay: function (msg) {
        if (this.isIos()) {
            window.webkit.messageHandlers.wechatPay.postMessage(msg)
        } else if (this.isAndroid()) {
            window.AndroidToJS.wechatPay(msg)
        }
    },
    //赣州银行微信支付
    siroWechatPay: function (msg) {
        if (this.isIos()) {
            window.webkit.messageHandlers.siroWechatPay.postMessage(msg)
        } else if (this.isAndroid()) {
            window.AndroidToJS.siroWechatPay(msg)
        }
    },
    // 银联支付
    siroUnionPay: function (msg) {
        if (this.isIos()) {
            window.webkit.messageHandlers.siroUnionPay.postMessage(msg)
        } else if (this.isAndroid()) {
            window.AndroidToJS.siroUnionPay(msg)
        }
    },
    //支付宝
    alipay: function (msg) {
        if (this.isIos()) {
            window.webkit.messageHandlers.alipay.postMessage(msg)
        } else if (this.isAndroid()) {
            window.AndroidToJS.alipay(msg)
        }
    }
}

export default appjsbridge