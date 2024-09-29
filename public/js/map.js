mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});
const marker = new mapboxgl.Marker({color:'rgb(255, 78, 78)'})
.setLngLat(coordinates)
.setPopup(
    new mapboxgl.Popup({offset:25}).setHTML(
        "<p>Precise Location on Booking!</p>"
    )
)
.addTo(map);