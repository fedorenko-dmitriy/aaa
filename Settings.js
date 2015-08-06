/**
 * Created by pioner on 18.07.15.
 */

var Settings = {
    baseURL: null,
    tplStoragePath: "/assets/templates/",
    hasFlash: checkShockwaveFlash(),

    getTplStoragePath: function(){
        return this.getBaseURL()+this.tplStoragePath;
    },

    getBaseURL: function(){
        if(this.baseURL){
            return this.baseURL;
        }else{
            return window.location.href;
        }
    }
}

function checkShockwaveFlash(){
    try {
        return  Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
    } catch(exception) {
        return  ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
    }
}
