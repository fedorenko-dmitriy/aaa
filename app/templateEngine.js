/**
 * Created by pioner on 18.07.15.
 **/
var templateEngine = (function(){
    var TemplateEngine = function(){
        this.store = [];
        this.chain = [];
    }

    TemplateEngine.prototype.render= function(name, data, appendTo, callback){
        if(this.isLoaded(name)){
            var tplSrc = this.getTemplate(name),
                template = Handlebars.compile(tplSrc),
                html = template(data);
            this.appendElem(appendTo, html);
            callback && callback();
        }else{
            this.load(name, data, appendTo, callback);
        }
    }

    TemplateEngine.prototype.load = function(name, data, appendTo, callback){
        var self = this;
        $.get(self.getURL(name), function(tplSrc){
            self.store.push({name:name, template:tplSrc});
            self.render(name, data, appendTo, callback);
        });
    }

    TemplateEngine.prototype.isLoaded= function(name){
        for(var e=0; e<this.store.length; e++){
            if(this.store[e].name == name){
                return true;
            }
        }
    }

    TemplateEngine.prototype.getTemplate= function(name){
        for(var e=0; e<this.store.length; e++){
            if(this.store[e].name == name){
                return this.store[e].template;
            }
        }
    }

    TemplateEngine.prototype.getURL = function(name){
        return Settings.getTplStoragePath()+name+".html";
    }

    TemplateEngine.prototype.appendElem = function(appendTo, html){
        $(appendTo).append(html);
        setTimeout(function(){eventBus.addElem();},10);
    }

    return new TemplateEngine();

})();

