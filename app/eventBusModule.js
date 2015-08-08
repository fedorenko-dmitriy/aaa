/**
 * Created by pioner on 23.07.15.
 */


var eventBus = (function(){
    var EventBus = function(){
        this.hasFlash = Settings.hasFlash;
    }

    EventBus.prototype.addElem = function(){
        this.addEventToElem();
    }

    EventBus.prototype.addEventToElem = function(){
        addZeroClipboard.call(this);
        appendCombobox();
        appendAffix();
    }

    function addZeroClipboard(){

        if(this.hasFlash){
            var TCBvariable;

            $("button.init-btn").each(function(key, elem){
                if($(this).hasClass("select init-btn")){
                    var selectZC = new ZeroClipboard(this);
                    selectZC.on( "ready", function( readyEvent ) {
                        console.log( "ZeroClipboard SWF is ready! " +selectZC.id);
                        selectZC.on("beforeCopy",function() {
                            //Do nothing...
                        });

                        selectZC.on("copy",function(event) {
                            TCBvariable = tempClipBoard.toClipBoard(event.target);
                            event.clipboardData.setData('text/plain', TCBvariable);
                        });

                        selectZC.on("afterCopy", function() {
                            var time = new Date().valueOf();
                            popUpWindows.showPopup(TCBvariable, time);
                        });
                    });
                } else {

                    var copyZC = new ZeroClipboard(this);
                    copyZC.on( "ready", function( readyEvent ) {
                        console.log("ZeroClipboard SWF is ready! " + copyZC.id);
                        copyZC.on("beforeCopy", function () {
                            // Do nothing...
                        });

                        copyZC.on("copy", function (event) {
                            TCBvariable = $(event.target).closest(".form-group").find("input").val();
                            event.clipboardData.setData('text/plain', TCBvariable);
                        });

                        copyZC.on("afterCopy", function () {
                            var time = new Date().valueOf();
                            popUpWindows.showPopup(TCBvariable, time);
                        });
                    });
                }
                $(this).removeClass("init-btn");
            });
        }
        else{
            $("button").hide();
            $(".form-group .input")
                .removeClass("col-md-7")
                .addClass("col-md-11");
        }
    }

    function appendCombobox(){
        $("select").each(function(key, elem){
            if($(this).attr("display") != "none" && !$(this).hasClass("combobox")){
                $(this).combobox();
                $(this).addClass("combobox");


                $(this).on("change", function(event){
                    var target = $(event.target);
                    var option = target.val();
                    if(option){
                        var newClass = option.split(".").join("\\.");
                        target.parents(".block").find(".folder").removeClass("active");
                        $("div[class='folder "+newClass+"']").addClass("active");
                    }
                });

                $('.bs-docs-sidebar').affix({
                    offset: {
                        top: $('.bs-docs-sidebar').offset().top-20
                    }
                });
            }
        });
    }

    function appendAffix(){
        if(!$('.bs-docs-sidebar') && (!$('.bs-docs-sidebar').hasClass(".affix") || !$('.bs-docs-sidebar').hasClass(".affix-top"))){
            $('.bs-docs-sidebar').affix({
                offset: {
                    top: $('.bs-docs-sidebar').offset().top-20
                }
            });
        }
    }


    return new EventBus();
})();



