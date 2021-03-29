import mongoose from 'mongoose';


const connectDB = async ()  => {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true 
        });

        console.log(`Database connect to ${connect.connection.host}`)

        
    } catch (error) {
        console.log('database connect error', error)
    }
   
}

export default connectDB;