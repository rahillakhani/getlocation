const MongoClient = require('mongodb').MongoClient;
const config = require('./config').mongo
const url = config.url
const dbName = config.dbName
var db

class MongoWrapper {

    static async getDb() {
        if (db) {
            return db
        } else {
            db = await MongoClient.connect(url)
            // console.log("Connected successfully to server", db, db.collection);
            return db
        }
    }

    static async getVehicleCollection() {
        if (db) {
            return db.collection(config.collections.vehicles)
        } else {
            await this.getDb()
            return db.collection(config.collections.vehicles)
        }
    }

}
module.exports = MongoWrapper