/**
 * Created by pioner on 14.07.15.
 */

/*Default obj = {id:'string', value: 'string'}*/

var tempClipBoard = (function(){
    var TempClipBoard = function(){
        this.tempClipBoard = [];
    }

    TempClipBoard.prototype.toClipBoard = function(elem){
        var self = this;
        var copyObj = {
            id: $(elem).attr("id"),
            value: $(elem).closest(".form-group").find("input").val()
        }
        var flag = this._checkMatchOnTempClipBoard(copyObj);
        console.log(copyObj.id);
        this._manipulationWithTempClipBoard(flag, copyObj);
        this._manipulationWithButtonClass(flag, copyObj);

        return this._copyToClipBoard();
    }

    TempClipBoard.prototype._checkMatchOnTempClipBoard = function(copyObj) {
        var self = this;
        var flag = false;
        $.each(self.tempClipBoard, function(key, item){

            if(item.value == copyObj.value){
                flag = true;
                return false;
            }
        });
        return flag;
    };

    TempClipBoard.prototype._manipulationWithTempClipBoard = function (flag, copyObj) {
        var self = this;
        if (flag) {
            var array = [];
            $.each(self.tempClipBoard, function (key, item) {
                if (item.value !== copyObj.value) {
                    array.push(item);
                }
            });
            self.tempClipBoard = array;
        } else {
            self.tempClipBoard.push(copyObj);
        }
    }

    TempClipBoard.prototype._manipulationWithButtonClass = function(flag, copyObj){
        if(flag){
            $("button#"+copyObj.id).removeClass("addedToClipBoard");console.log("class del")
        } else {
            $("button#"+copyObj.id).addClass("addedToClipBoard");console.log("class add")
        }

    };

    TempClipBoard.prototype._copyToClipBoard = function(){
        var self = this;
        var stringToClipBoard = "";
        $.each(self.tempClipBoard, function(key, item){
            stringToClipBoard += item.value+"\n";
            console.log(item.value)
        });
        return stringToClipBoard;
    };

    return new TempClipBoard();

});
