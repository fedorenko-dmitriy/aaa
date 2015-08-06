var Data;

(function(){
    $.getJSON("data.json", function(data){
        Data = data;
    });
})();

$(document).ready(function () {
    checkData();
});

function checkData(){
    if(!Data){
        setTimeout(function(){
            checkData();
        },10);
    }
    else{
        renderPartitionContent();
        renderPartitionMenu();
    }
}


function renderPartitionContent(){
    templateEngine.render("partition", {partition: Data} , ".content", renderItemContent);

}

function renderPartitionMenu(){
    templateEngine.render("menuMainItem", {partition: Data} , ".menu", renderItemMenu);
}

function renderItemContent(){
    for(var el in Data){
        var partition = Data[el];
        templateEngine.render("item", {item : partition.children}, ".content ."+el);
    }
}

function renderItemMenu(){
    for(var el in Data){
        var partition = Data[el];
        templateEngine.render("menuSubItem", {item : partition.children} , ".menu ."+el);
    }
}


