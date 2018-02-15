var MongoWrapper = require('./mongo')
const config = require('./config')

async function authenticate(username, password) {
    const userCollection = await MongoWrapper.getUserCollection()
    const result = await userCollection.findOne({ _id: username })
    if (result.password === password) {
        return true
    } else {
        throw new Error("Invalid user credentials")
    }
}

module.exports = authenticate