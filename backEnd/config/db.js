import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://swagato731123_db_user:resume1234@cluster0.ysm1apd.mongodb.net/ResumeBuilderMERN')
    .then(()=>{
        console.log('DB CONNECTED')
    })
}

