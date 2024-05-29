const { MongoClient } = require('mongodb');
async function main() {
    const url = 'mongodb://localhost:27017/';//mongocompas string
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db('GuviDB');//DB name
        const collection = database.collection('products');//collection name
        const result = await collection.find({}).toArray();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}
main();