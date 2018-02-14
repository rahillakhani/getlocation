const axios = require('axios');
var MongoWrapper = require('./mongo')
const config = require('./config')
const querystring = require("querystring");
let encodedString = querystring.stringify({destinations: 'Mazgaon, Anjeerwadi Road, Rambhau Bhogle Marg, Mustafa Bazar, Mazgaon, Mumbai, Maharashtra 400010'})

async function job() {
    setInterval(async function() {
        console.log("getting latest location")
        const vehicles = await getLocation()
        const vehicleCollection = await MongoWrapper.getVehicleCollection()
        // const vehicleCollection = db.collection(config.mongo.collections.vehicles)
        vehicleCollection.insert(vehicles)
    }, 5000)
}

async function getLocation() {

    const response = await axios.get('https://tms.adititracking.com/tracking_data.php?action=json&user_name=sahil@gmail.com&hash_key=HEPDCJAUTJ')
    const vehicles = response.data.data.vehicles
    const promises = vehicles.map(function(vehicle){
        return new Promise(function(resolve, reject){
            axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${vehicle.latitude},${vehicle.longitude}&${encodedString}&key=AIzaSyBfVvEY-tpaxhLBcQqslPDQrr5hWrvp2P4`)
            .then(function(googleResponse) {
                console.log("googleResponse==", googleResponse.data, googleResponse.data.rows)
                vehicle.eta = googleResponse.data.rows[0].elements[0].duration ? googleResponse.data.rows[0].elements[0].duration.text : 'ETA'
                console.log("ETA==", vehicle.eta)
                resolve(vehicle)
            })
            .catch(function(error) {
                console.log("ETA error==", error)
                vehicle.eta = 'ETA'
                resolve(vehicle)
            })
        }) 
    })

    return await Promise.all(promises)
}

setTimeout(function() {
    job()
}, 5000)

module.exports = job