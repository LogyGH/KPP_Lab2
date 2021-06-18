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
    var coords_cities = { //координати міст
        'vinnytsia' : {lat:  49.232823170243904, lng: 28.463282037424015},
        'kiev': {lat: 50.433, lng: 30.517},
        'lvov': {lat: 49.83938599935414, lng: 24.033975016706986 },
        'poltava': { lat: 49.5744, lng:34.5686 },
        'zaporizhzhia': { lat: 47.8378, lng: 35.1383 },
        'donetsk': { lat: 48.0089, lng: 37.8042 },
        'khmelnytskyi': { lat: 49.42, lng: 27 },
        'kharkiv': { lat: 50, lng: 36.2292 },
        'chernihiv': { lat: 51.5, lng: 31.3 },
        'luhansk': { lat: 48.5833, lng: 39.3333 },
        'odesa': { lat: 46.4775, lng: 30.7326 },
        'zhytomyr': { lat: 50.2544, lng: 28.6578 },
        'lutsk': { lat: 50.7478, lng: 25.3244 },
        'rivne': { lat: 50.6197, lng: 26.2514 },
        'chernivtsi': { lat: 48.2908, lng: 25.9344 },
        'kropyvnytskyi': { lat: 48.5103, lng: 32.2667 },
        'Kharkiv': { lat: 50, lng: 36.2292 },
    };
    var opt = {
        center: coords_cities['vinnytsia'],
        zoom: 6.5
    }
    var myMap = new google.maps.Map(document.getElementById('map'), opt);

    async function setMarker(coords) { //встановлення мітки на карті
        var inform = await weather(coords);

        var marker = new google.maps.Marker({ //встановлення іконки на мапі
            position: coords,
            map: myMap,
            title: `${inform['weather']}`,
            icon: inform['icon']
        });

        var info_click = new google.maps.InfoWindow({ //додаткова інформація при кліку
            content: `<h3>${inform['name']}</h3><p>${inform['weather']}</p><p>Temperature: ${inform['temp']}</p>`,
        });

        marker.addListener("click", function() {
            info_click.open(myMap, marker);
        });
    }

    setMarker(coords_cities['vinnytsia']);
    setMarker(coords_cities['kiev']);
    setMarker(coords_cities['lvov']);
    setMarker(coords_cities['poltava']);
    setMarker(coords_cities['zaporizhzhia']);
    setMarker(coords_cities['donetsk']);
    setMarker(coords_cities['khmelnytskyi']);
    setMarker(coords_cities['chernihiv']);
    setMarker(coords_cities['odesa']);
    setMarker(coords_cities['zhytomyr']);
    setMarker(coords_cities['lutsk']);
    setMarker(coords_cities['rivne']);
    setMarker(coords_cities['chernivtsi']);
    setMarker(coords_cities['kropyvnytskyi']);
    setMarker(coords_cities['Kharkiv']);
}