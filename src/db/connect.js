import {MongoClient} from 'mongodb';

let database;

const connectToDb = async () => {
    const connectionString = process.env.MONGO_URI;
    if(!connectionString) {
        throw new Error('MONGO_URI is required.');
    }
    const client = new MongoClient( connectionString);
    await client.connect();
    database = client.db(process.env.MONGO_DB_NAME || 'practice');
    return database;
};
const getDb = () => {
    if(!database) {
        throw new Error('Database not initialized. Call connectToDb first.');
    }
    return database;
}

export { connectToDb, getDb };