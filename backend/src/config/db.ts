import mongoose from "mongoose"

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/behired')
        console.log(`MongoDB connected:${conn.connection.host}`)
    }catch(error){
        console.log(`Error: ${error}`)
        
    }
}

export default connectDB

