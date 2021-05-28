async function weather(coords) {
    const key = '1b5ee5a1a74d624a74750350327ea372'; //ключ openweather
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords['lat']}&lon=${coords['lng']}&appid=${key}`);
    const rezult = await response.json();
    const weather = rezult['weather'][0];

    var temp = rezult['main']['temp']-273.15
    temp = temp.toFixed(1); //температура

    var information = {
        'name': rezult.name,
        'weather': rezult['weather'][0]['description'],
        'icon': `http://openweathermap.org/img/w/${rezult['weather'][0]['icon']}.png`,
        'temp': temp
    };

    return information;
}

function initMap() {
    var coords_cities = {
        'vinnytsia' : {lat:  49.232823170243904, lng: 28.463282037424015},
        'kiev': {lat: 50.433,lng: 30.517},
        'lvov': {lat: 49.83938599935414,lng: 24.033975016706986 }
    };
    var opt = {
        center: coords_cities['vinnytsia'],
        zoom: 6.5
    }
    var myMap = new google.maps.Map(document.getElementById('map'), opt);

    async function setMarker(coords) {
        var inform = await weather(coords);

        var marker = new google.maps.Marker({
            position: coords,
            map: myMap,
            title: `${inform['weather']}`,
            icon: inform['icon']
        });

        var info_click = new google.maps.InfoWindow({
            content: `<h3>${inform['name']}</h3><p>${inform['weather']}</p><p>Температура: ${inform['temp']}</p>`,
        });

        marker.addListener("click", function() {
            info_click.open(myMap, marker);
        });
    }

    setMarker(coords_cities['vinnytsia']);
    setMarker(coords_cities['kiev']);
    setMarker(coords_cities['lvov']);
}