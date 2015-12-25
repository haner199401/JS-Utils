var Tools = (function () {

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
     * 接口
     * @type {{}}
     */
    var api = {};

    api.renderMsg = renderMsg;
    api.getParameterByName = getParameterByName;
    api.loadScript = loadScript;

    return api;
})();