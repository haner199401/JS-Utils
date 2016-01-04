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
                if (!complete && (!status || status == "loaded" || status == "complete")) {
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
    function isEmpty(obj) {
        if (obj == null) return true;
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
    function isIE(version){
    	var b = document.createElement('b')
    	b.innerHTML = '<!--[if IE ' + version + ']><i></i><![endif]-->'
    	return b.getElementsByTagName('i').length === 1
	}

    /**
     * 接口
     * @type {{}}
     */
    var api = {};

    api.renderMsg = renderMsg;
    api.getParameterByName = getParameterByName;
    api.loadScript = loadScript;
    api.isEmpty = isEmpty;
    api.isIE = isIE;

    return api;
})();