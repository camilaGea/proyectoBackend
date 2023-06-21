import mongoose from 'mongoose';
import { Schema} from "mongoose";

const collection = 'carts';

const cartSchema  = new mongoose.Schema({
    product: [
        {
            idProduct:{
                type: Schema.Types.ObjectId,
                ref:'products'
            },
            quantity:{
                type:Number,
                require:true
            }
        }
    ],
    default: []
})


cartSchema.pre("findOne", function () {
    this.populate("product.idProduct");
});


cartSchema.pre("find", function () {
    this.populate("product.idProduct");
});

const cartModel = mongoose.model(collection, cartSchema );

export default cartModel;