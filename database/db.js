import mongoose from "mongoose";

export const Connection = async(username, password) =>{
    
    const URL = `mongodb+srv://${username}:${password}@cluster0.fxdqlzr.mongodb.net/?appName=Cluster0`
    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(`Error while connecting with database`,error.message);
    }
}