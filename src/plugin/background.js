var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "https://api.letscoinback.com/partner/all" );
xmlHttp.send( null );
xmlHttp.onload = createEvent;

function createEvent() {
    var response = JSON.parse(xmlHttp.responseText);
    var filter = [];
    response.forEach(element => {
        var str = element["redirect"].replace("https://", "").replace("http://", "");
        var spl = str.split(".");
        str = spl[0].substring(0, 2) == "ww" ? spl[1] : spl[0];
        filter.push({hostContains: "."+str+"."});
    });

    chrome.webNavigation.onCompleted.addListener(function(details) {
        var opt = {
            type: "basic",
            title: 'LetsCoin Cashback Disponível',
            message: 'Esta loja possui cashback disponível, click aqui para garantir.',
            iconUrl: "teste.ico"
        }
        chrome.notifications.create('notify', opt, function(notificationId) {});
    }, {
        url: filter
    });
} 

chrome.notifications.onClicked.addListener(id => {
    var url = window.location.host;
    window.open("https://letscoinback.com/#/?url="+url, "_blank");
});