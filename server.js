const axios = require('axios');
const job = require('./job')
const express = require('express');
const app = express();
let url ;
const port = process.env.PORT || 8989;
let logger = require('logger').createLogger('development.log'); // logs to a file
logger.format = function(level, date, message) {
  return date.getTime().toString() + "; " + message;
};

let mongoWrapper = require('./mongo')

app.use(express.static('build'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.get('/', (req,res) => {
	re.send('index.html');
});


app.get('/tracker', async (req,res) => {
  console.log("received reques")
  const vehicleCollection = await mongoWrapper.getVehicleCollection()
  vehicleCollection.find({}).toArray(function(err, docs) {
    //  console.log("response from mongo==", err, docs)
     if (err) {
        res.send({success: false})
     } else {
        res.send(docs)
     }  
  })
	
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