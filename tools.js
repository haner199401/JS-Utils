var Tools = {
    renderMsg: function() {
        var args = arguments,
            tpl = args[0],
            i = args.length;

        if (!tpl) return;

        while (--i) {
            tpl = tpl.replace('{' + i + '}', args[i]);
        }

        return tpl;
    },
    getParameterByName: function(name){
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1]);
    }
}
