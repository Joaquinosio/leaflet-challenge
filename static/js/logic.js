let mymap = L.map('map').setView([37.77, -122.41], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url)
.then(data=>{
    
    // data.forEach(d=>{
        //     L.marker([d.location.coordinates[1], d.location.coordinates[0]]).addTo(mymap) 
        // })
        
    // let markers = []

    // data.forEach(d=>{
    //     markers.push(L.marker([d.location.coordinates[1], d.location.coordinates[0]]))        
    // })

    // L.layerGroup(markers).addTo(mymap)

    let heatArray = []

    data.forEach(d=>{
        heatArray.push(
            [d.location.mag[1], d.location.place[0]]
        )
    })

    L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(mymap)    

})
.catch(e=>{
    console.log(e)
})
