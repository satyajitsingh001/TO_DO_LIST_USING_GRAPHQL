import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    by:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    }

})

mongoose.model("Quotes",quoteSchema);