(function(global,factory){// 匿名函数

    global.MyTemple = factory;

})(this,function(opt){
    
    var el = document.getElementById(opt.el);
    var tem = document.getElementById(opt.tem).innerHTML;
    var data = opt.data;

    var matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;//匹配有等于号和没有等于号的语法
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;//正则替换特殊符号
    var escapes = {
        "'":"'",
        "\\":"\\",
        "\r":"r",
        "\n":"n",
        "\t":"t",
        "\u2028":"u2028",
        "\u2029":"u2029",
    }

    var template = function(text, data){//模版渲染  模版，数据
        var index = 0;//记录扫描位置
        //创建的方法只是带有语法，而本身还是字符串
        var funcion_main = "var temp = '';";
        funcion_main += "temp += '";
        
        text.replace(matcher,function(match, interpolate,evaluate,offset){
            funcion_main += text.slice(index, offset).replace(escaper,function(match){
                return '\\' + escapes[match];
            });
            if(evaluate){
                funcion_main += "';" + evaluate + "temp += '";
            }
            if(interpolate){
                funcion_main += "' + " + interpolate + " + '";
            }
            index = offset + match.length;//得到一个新的位置
            return match;
        });
        funcion_main += "';return temp;";
        var render = new Function('obj',funcion_main);
        return render(data);
    }

    el.innerHTML = template(tem,data);

});// 自执行函数