import express from "express";

const app = express();


mongoose.connect('mongodb+srv://firstuser:password01@cluster0.qhuomr5.mongodb.net/').then(() => {
    console.log('connected to MongoDB')
    app.listen(4000, ()=> {
        console.log(`Node API app is running on port 4000`)
    });
}).catch((error) => {
    console.log(error)
})
