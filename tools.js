var Tools = (function(){

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
    function getParameterByName(name){
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1]);
    }







    /**
     * 接口
     * @type {{}}
     */
	var api = {};

	api.renderMsg = renderMsg;
	api.getParameterByName = getParameterByName;

	return api;
})();