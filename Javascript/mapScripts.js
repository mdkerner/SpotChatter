var position;
var marker;
var infoWindow;

var mapOptions = {
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

map = new google.maps.Map(document.getElementById('MainMap'), mapOptions);

// HTML5 geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {

        position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        map.setCenter(position);
        getChats(position);

    }, function () {
        noGeolocation();
    }, { timeout: 2000 });
}
else {
    noGeolocation();
}


function noGeolocation() {
    map.setOptions({ zoom: 18 });
    position = new google.maps.LatLng(34.430282, -119.704151);
    map.setCenter(position);
}
function addMarker(chats) {

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(chats[0].lat, chats[0].lng),
        map: map
    });

    google.maps.event.addListener(marker, 'click', function () {
        if (!infoWindow) {
            infoWindow = new google.maps.InfoWindow({
                content: getChatWindowData(chats),
                position: new google.maps.LatLng(chats[0].lat, chats[0].lng)
            });
        }
        else {
            infoWindow.setPosition(new google.maps.LatLng(chats[0].lat, chats[0].lng));
            infoWindow.content = getChatWindowData(chats);
        }
        infoWindow.open(map);
    });
}

function getChats(position) {

    var chats = new Array();
    var lat = position.lat();
    var lng = position.lng();
    $.ajax({
      url: "http://spotchatter.com:4567/Services/GetChats/",
      data: { "lat" : lat, "lng" : lng },
      dataType: "json"
    }).done(function(data) {
    	
		for(var i = 0; i < data.length; i++)
		{
    	  var jChat = eval("(" + data[i] + ")");
	      var chat = new Chat();
	      
	      chat.name = jChat.name;
	      chat.time = jChat.time;
	      chat.lat = jChat.lat;
	      chat.lng = jChat.lng;
	      chat.text = jChat.text;
	      chats.push(chat);
	    }
	    addMarker(chats)
    });
    
}

function Chat() {
    this.name;
    this.time;
    this.lat;
    this.lng
    this.text;
}

function getChatWindowData(chats) {

    var chatString = "<div>";

    chats.forEach(function (chat) {
        chatString += "<div> User: " + chat.name + "<br/>"
                        + "Time: " + chat.time + "<br/>"
                        + "<p>" + chat.text + "</p></div>"
    });

    chatString += "</div>";
    return chatString
}