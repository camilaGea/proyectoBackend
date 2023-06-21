import mongoose from 'mongoose';

const collection = 'Menssage';

const schema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    }, 
    message: {
        type: String,
        require: true
    }, 
})

const messageModel = mongoose.model(collection, schema);

export default messageModel;