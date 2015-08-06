/**
 * Created by pioner on 14.07.15.
 */

var popUpWindows = (function(){
    var html = "\
                <div class='header'>Copy status \
                    <div class='close'>&#215;</div> \
                </div> \
                <div class='body'></div> \
            ";

    var PopUpWindows = function(){
        this.popUpWindowsObj = {};
    };

    PopUpWindows.prototype.showPopup = function(text, id){
        var self = this,
            timeoutHandle = setTimeout(function(){ self.hidePopup(id); }, 2000);

        this.popUpWindowsObj[id] = create.call(this, text, id, timeoutHandle);
        this.popUpWindowsObj[id].animate({bottom: 0}, 1000);
    };

    PopUpWindows.prototype.hidePopup = function(id){
        var self = this;
        this.popUpWindowsObj[id].animate(
            {bottom: -self.popUpWindowsObj[id].height()-10},
            1000,
            function(){
                destroy.call(self, id);
            }
        );
    };

    function create(text, id, timeoutHandle) {
        var self = this;
        var popUpWindow = $("<div/>",{
            class:"popup",
            id: id
        }).appendTo("body");

        popUpWindow.html(html);
        popUpWindow.find(".body").text(text ? text : "Clipboard is empty");
        popUpWindow.find(".close").click(
            function(){
                self.hidePopup(id);
                clearTimeout(timeoutHandle);
            }
        );

        return popUpWindow;
    }

    function destroy(id) {
        for (var i in this.popUpWindowsObj) {
            if (i == id) {
                $("#" + id).remove();
                delete this.popUpWindowsObj[i];
            }
            console.log("popup destroyed")
        }
    }

    return new PopUpWindows;
})();


