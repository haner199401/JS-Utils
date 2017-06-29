var Tools = (function () {

    //长方法名称存储，以便于压缩文件尺寸
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * 占位符替换
     * @returns {*}
     * var str = 'aa{0}aa{1}bb{2}';
     */
    function renderMsg() {
        var args = arguments,
            tpl = args[0],
            i = args.length;

        if (!tpl) return;

        while (--i) {
            tpl = tpl.replace('{' + i + '}', args[i]);
        }

        return tpl;
    }

    /**
     * 路由 key 获取 value
     * @param name 路由中 key
     * @returns {string}
     * http://www.xxx.com?a=1&b=2
     */
    function getParameterByName(name) {
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1]);
    }

    /**
     * 动态加载 script 脚本
     * @param uri
     * @param callback
     */
    function loadScript(uri, callback) {
        var complete = false;
        var el = document.createElement("script");
        el.setAttribute("type", "text/javascript");
        el.setAttribute("src", uri);
        if (callback) {
            el.onload = el.onreadystatechange = function () {
                var status = this.readyState;
                if (!complete && (!status || status === "loaded" || status === "complete")) {
                    complete = true;
                    callback();
                }
            };
        }
        document.getElementsByTagName("head")[0].appendChild(el);
    }

    /**
     * 对象判空
     * @param obj
     */
    function isEmptyObj(obj) {
        if (obj === null) return true;
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;
        for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
        return true;
    }

    /**
     * IE浏览器判断
     * @param version 版本号码
     * isIE(8) isIE(9) ...
     */
    function isIE(version) {
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE ' + version + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    }

    /**
     * 判断某个对象是否有指定的className
     * @param ele
     * @param cls
     */
    function hasClass(ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    /**
     * 给指定对象添加className
     * @param ele
     * @param cls
     */
    function addClass(ele, cls) {
        if (!hasClass(ele, cls)) ele.className += " " + cls;
    }

    /**
     * 删除className
     * @param ele
     * @param cls
     */
    function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }

    /**
     * 实现字符串长度截取 省略号
     * @param str
     * @param len
     * @returns {string}
     */
    function cutStr(str, len) {
        var temp;
        var icount = 0;
        var patrn = /[^\x00-\xff]/;
        var strre = "";
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            if (icount < len - 1) {
                temp = str.substr(i, 1);
                if (patrn.exec(temp) === null) {
                    icount = icount + 1
                } else {
                    icount = icount + 2
                }
                strre += temp
            } else {
                break
            }
        }
        return strre + "..."
    }

    /**
     * 添加事件兼容
     * @param oTarget
     * @param sEvtType
     * @param fnHandle
     */
    function addEvent(oTarget, sEvtType, fnHandle) {
        if (!oTarget) {
            return;
        }
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEvtType, fnHandle, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEvtType, fnHandle);
        } else {
            oTarget["on" + sEvtType] = fnHandle;
        }
    }

    /**
     * 判断变量是否空值
     * undefined, null, '', false, 0, [], {} 均返回true，否则返回false
     */
    function isEmpty(v) {
        switch (typeof v) {
            case 'undefined' :
                return true;
            case 'string'    :
                if (v.trim().length === 0) return true;
                break;
            case 'boolean'   :
                if (!v) return true;
                break;
            case 'number'    :
                if (0 === v) return true;
                break;
            case 'object'    :
                if (v === null) return true;
                if (v.length > 0) return false;
                if (v.length === 0)  return true;
                for (var key in v) if (hasOwnProperty.call(v, key)) return false;
                break;
        }
        return false;
    }

    /**
     * API
     */
    return {
        renderMsg: renderMsg,
        getParameterByName: getParameterByName,
        loadScript: loadScript,
        isEmptyObj: isEmptyObj,
        isEmpty: isEmpty,
        isIE: isIE,
        removeClass: removeClass,
        addClass: addClass,
        hasClass: hasClass,
        cutStr: cutStr,
        addEvent: addEvent,
    };
})();