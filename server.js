var axios = require('axios');
var express = require('express');
var app = express();
var url ;
var port = process.env.PORT || 8989;
var logger = require('logger').createLogger('development.log'); // logs to a file
logger.format = function(level, date, message) {
  return date.getTime().toString() + "; " + message;
};
app.use(express.static('build'));


app.get('/', (req,res) => {
	re.send('index.html');
});


app.get('/tracker', (req,res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	axios.get('https://tms.adititracking.com/tracking_data.php?action=json&user_name=sahil@gmail.com&hash_key=HEPDCJAUTJ')
		.then(function (response) {
			// console.log(response.data.data.vehicles);
			res.send(response.data.data.vehicles);
		})
		.catch(function (error) {
			console.log(error);
		});


	// axios.get('https://tms.adititracking.com/tracking_data.php?action=json&user_name=sahil@gmail.com&hash_key=HEPDCJAUTJ')
	// .then((data) => {
	// 	console.log(data);
	// 	res.send(data);
	// })
	// .catch((err) => {
	// 	console.log(err);
	// 	res.send(err)
	// });
	
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