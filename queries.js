const { MongoClient } = require('mongodb');
async function main() {
    const uri = 'mongodb://localhost:27017';//mongocompas string
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();//connect mongo server
        const database = client.db('GuviDB');//connect DB
        const collection = database.collection('products');

       // Query 1: Find all the information about each product
        const result1 = await collection.find({}).toArray();
        console.log("Query 1: Find all the information about each product");
        console.log(result1);

        // Query 2: Find the product price which is between 400 to 800
        const result2 = await collection.find({ product_price: { $gte: 400, $lte: 800 } }).toArray();
        console.log("Query 2: Find the product price which is between 400 to 800");
        console.log(result2);

        // Query 3: Find the product price which is not between 400 to 600
        const result3 = await collection.find({ product_price: { $not: { $gte: 400, $lte: 600 } } }).toArray();
        console.log("Query 3: Find the product price which is not between 400 to 600");
        console.log(result3);

        // Query 4: List the four products which are greater than 500 in price
        const result4 = await collection.find({ product_price: { $gt: 500 } }).limit(4).toArray();
        console.log("Query 4: List the four products which are greater than 500 in price");
        console.log(result4);

        // Query 5: Find the product name and product material of each product
        const result5 = await collection.find({}, { product_name: 1, product_material: 1, _id: 0 }).toArray();
        console.log("Query 5: Find the product name and product material of each product");
        console.log(result5);

        // Query 6: Find the product with a row id of 10
        const result6 = await collection.find({ id: "10" }).toArray();
        console.log("Query 6: Find the product with a row id of 10");
        console.log(result6);

        // Query 7: Find only the product name and product material
        const result7 = await collection.find({}, { product_name: 1, product_material: 1 }).toArray();
        console.log("Query 7: Find only the product name and product material");
        console.log(result7);

        // Query 8: Find all products which contain the value "soft" in product material
        const result8 = await collection.find({ product_material: { $regex: /soft/i } }).toArray();
        console.log("Query 8: Find all products which contain the value 'soft' in product material");
        console.log(result8);

        // Query 9: Find products which contain product color "indigo" and product price 492.00
        const result9 = await collection.find({ product_color: "indigo", product_price: 492.00 }).toArray();
        console.log("Query 9: Find products which contain product color 'indigo' and product price 492.00");
        console.log(result9);

        // Query 10: Delete the products which have the same product price
        const duplicatePrices = await collection.aggregate([
            { $group: { _id: "$product_price", count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } }
        ]).toArray();
        duplicatePrices.forEach(async function(doc) {
            await collection.deleteMany({ product_price: doc._id });
        });
        console.log("Duplicate products with the same product price have been deleted.");
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}
main();