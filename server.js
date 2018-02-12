var axios = require('axios');
var express = require('express');
var querystring = require("querystring");
var app = express();
var url ;
var port = process.env.PORT || 8989;
var logger = require('logger').createLogger('development.log'); // logs to a file
logger.format = function(level, date, message) {
  return date.getTime().toString() + "; " + message;
};

let encodedString = querystring.stringify({destinations: 'Mazgaon, Anjeerwadi Road, Rambhau Bhogle Marg, Mustafa Bazar, Mazgaon, Mumbai, Maharashtra 400010'})

app.use(express.static('build'));


app.get('/', (req,res) => {
	re.send('index.html');
});


app.get('/tracker', (req,res) => {
  console.log("received reques")
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	axios.get('https://tms.adititracking.com/tracking_data.php?action=json&user_name=sahil@gmail.com&hash_key=HEPDCJAUTJ')
	  .then(function (response) {
      const vehicles = response.data.data.vehicles
      
      const promises = vehicles.map(function(vehicle){
        return new Promise(function(resolve, reject){
          axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${vehicle.latitude},${vehicle.longitude}&${encodedString}&key=AIzaSyBfVvEY-tpaxhLBcQqslPDQrr5hWrvp2P4`)
            .then(function(googleResponse) {
              vehicle.eta = googleResponse.data.rows[0].elements[0].duration ? googleResponse.data.rows[0].elements[0].duration.text : 'ETA'
              resolve(vehicle)
            })
            .catch(function(error) {
              vehicle.eta = 'ETA'
              resolve(vehicle)
            })
         }) 
      })

      Promise.all(promises).then(function(vehicles) {
        res.send(vehicles);
      })
      
		})
		.catch(function (error) {
			console.log(error);
		});
});


// app.get('/:loc', (req, res) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
// 	var com;
// 	if (req.params.loc.indexOf(',') > 1) {
// 		var location = req.params.loc;

// 		url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${req.params.loc}&destinations=Mazgaon, Anjeerwadi Road, Rambhau Bhogle Marg, Mustafa Bazar, Mazgaon, Mumbai, Maharashtra 400010&key=AIzaSyBfVvEY-tpaxhLBcQqslPDQrr5hWrvp2P4`;

// 		url = url.indexOf(" ") > 0 ? url.replace(" ", "") : url;
// 		console.log(url)
// 		axios.get(url)
// 			.then(
// 			(data) => {
// 				com = data.data.rows[0].elements;
// 				console.log(com);
// 				com = com.map(elem => elem['duration'].text);
// 				res.send(com[0]);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				res.send(err)
// 			});
// 	}
// 	else {
// 		res.send('pur proper location');
// 	}
// });

app.listen(port, (req, res, port) => {
	// console.log(port);
});