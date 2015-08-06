/**
 * Created by pioner on 19.07.15.
 */
Handlebars.registerHelper('url', function (path) {
    //var location = window.location.href
    return path.replace("../", window.location.href)
});

Handlebars.registerHelper('if-value', function (conditional, options) {
    if (options.hash.value === conditional) {
        return options.fn(this)
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('if-key', function (conditional, options) {
    if (options.data.index === conditional) {
        return options.fn(this)
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('if-key-last', function (options) {
    if (options.data.last) {
        return options.fn(this)
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('each_reverse',function (context, options) {
    var fn = options.fn, inverse = options.inverse;
    var length = 0, ret = "", data;

    if (Handlebars.Utils.isFunction(context)) { context = context.call(this); }

    if (options.data) {
        data = Handlebars.createFrame(options.data);
    }

    if(context && typeof context === 'object') {
        if (Handlebars.Utils.isArray(context)) {
            length=context.length;
            for(var j = context.length-1; j >= 0; j--) {//no i18n
                if (data) {
                    data.index = j;
                    data.first = (j === 0);
                    data.last  = (j === (context.length-1));
                }
                ret = ret + fn(context[j], { data: data });
            }
        } else {
            var keys = Object.keys(context);
            length=keys.length;
            for(j=length; j>=0;j--)
            {
                var key = keys[j-1]
                if(context.hasOwnProperty(key)) {
                    if(data) {
                        data.key = key;
                        data.value = context[key];
                        data.index = j;
                        data.first = (j === 0);
                    }
                    ret += fn(context[key], {data: data});
                }
            }
        }
    }

    if(length === 0){
        ret = inverse(this);
    }

    return ret;
} );