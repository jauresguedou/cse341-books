

import app from './app.js';
import dns from 'node:dns';



import {connectToDb, getDb} from './src/db/connect.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const PORT = process.env.PORT;
if (!PORT) {
    throw new Error('PORT is not defined.Make sure your local npm scripts reference the .env file with --env-file=.env, or define PORT in your hosted environment settings.');
};



const startServer = async () => {
    try {
        await connectToDb();

        const books = await getDb().collection('books').find({}).toArray();
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
}
await startServer();