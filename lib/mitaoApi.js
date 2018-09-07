/**
 * mitaoApi for webview
 * @authors Changhe (xuwu125@gmail.com)
 * @date    2018-09-06 16:48:33
 */
if (window.mitaoApi == undefined) {
    String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
        if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
            return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
        } else {
            return this.replace(reallyDo, replaceWith);
        }
    }
    window.mitaoApi = {
        version: 1.1,
        /**
         * 是否为IOS
         * @returns
         */
        isIOS: function() {
            var isIos = /\((iPhone|iPad|iPod)/i.test(navigator.userAgent) ? true : false;
            return isIos;
        },
        /**
         * 是否为Android
         * @returns
         */
        isAndroid: function() {
            return navigator.userAgent.indexOf('Android') != -1 ? true : false;
        },
        /**
         * 是否为微信
         * @returns
         */
        isWeChat: function() {
            return navigator.userAgent.indexOf('MicroMessenger') != -1 ? true : false;
        },
        /**
         * 判断是否为FF游览器
         * @return {Boolean} [true为是，否则为不是]
         */
        isFirefox: function() {
            return navigator.userAgent.indexOf('Firefox') != -1 ? true : false;
        },
        /**
         * 判断是否为Huicui游览器
         * @return {Boolean} [true为是，否则为不是]
         */
        isMitao: function() {
            return navigator.userAgent.indexOf('mitao') != -1 ? true : false;
        },
        /**
         * 生成指定大小的随机数
         * @param  {[type]} min [description]
         * @param  {[type]} max [description]
         * @return {[type]}     [description]
         */
        rand: function(min, max) {　　　　
            return Math.ceil(random() * number) + min;
        },
        /**
         * 生成随机数
         * @return {[type]} [description]
         */
        random: function() {
            return Math.random();
        },
        /**
         * 检测是否为 Email
         * @param  {[type]}  email [description]
         * @return {Boolean}       [description]
         */
        is_email: function(email) {
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
                return true;
            }
            return false;
        },
        /**
         * 检测是否为网址
         * @param  {[type]}  str_url [description]
         * @return {Boolean}         [description]
         */
        isUrl: function(str_url) {
            var strRegex = "^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$";
            var re = new RegExp(strRegex);
            //re.test()
            if (re.test(str_url)) {
                return (true);
            } else {
                return (false);
            }
        },
        readyFunc: undefined,
        ready: function() {
            if (mitaoApi.readyFunc != undefined && typeof(mitaoApi.readyFunc) == 'function') {
                try {
                    mitaoApi.readyFunc();
                } catch (e) {
                    console.log(e);
                }
            }
        },
        callfun: {},
        invoke: function(apiname, param, callbackfun) {
            try {
                // 先处理回调
                if (window.mitaoApi.isIOS()) {
                    if (!param || param == undefined || typeof(param) != 'object') {
                        var param = {};
                    }
                    var callback = function() {};
                    if (callbackfun && callbackfun != undefined && typeof(callbackfun) == 'function') {
                        callback = callbackfun;
                    }
                    window.mitaoApi.callfun[apiname] = callbackfun;
                    window.WebViewJavascriptBridge.callHandler(apiname, param, callback);
                } else {
                    if (callbackfun && callbackfun != undefined && typeof(callbackfun) == 'function') {
                        window.mitaoApi.callfun[apiname] = callbackfun;
                    }
                    if (!param || param == undefined || typeof(param) != 'object') {
                        console.log("mitaoApi js call:" + 'window.mitao.' + apiname + '()');
                        //eval('window.mitao.' + apiname + '()');
                        window.mitao[apiname]();
                    } else {
                        console.log("mitaoApi js call:" + 'window.mitao.' + apiname + '(\'' + JSON.stringify(
                            param) + '\')');
                        //eval('window.mitao.' + apiname + '(\'' + JSON.stringify(param) + '\')');
                        window.mitao[apiname](JSON.stringify(param));
                    }
                }
            } catch (e) {
                console.log("mitaoApi js error:", e);
                alert('发生异常：' + e);
            }
        },
        callback: function(apiname, param) {
            //console.log("ApiName:"+apiname);
            try {
                if (param) {
                    if (mitaoApi.callfun[apiname] != undefined) {
                        (mitaoApi.callfun[apiname])(param);
                        //delete mitaoApi.callfun[apiname];
                    }
                } else {
                    if (mitaoApi.callfun[apiname] != undefined) {
                        (mitaoApi.callfun[apiname])();
                        //delete mitaoApi.callfun[apiname];
                    }
                }
            } catch (e) {
                console.log(param);
            }
        },
        ready: function(readycall) {
            try {
                mitaoApi.readyFunc = readycall;
            } catch (e) {
                console.log(param);
            }
        }
    }
}
