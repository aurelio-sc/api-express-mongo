import mongoose from "mongoose";
import ENV from "./variables.js";

async function conectaNaDatabase() {
    mongoose.connect(`mongodb+srv://${ENV.dbUser}:${ENV.dbPassword}@cluster0.fcm2g.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0`);

    return mongoose.connection;
}

export default conectaNaDatabase;
