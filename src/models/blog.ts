import {Schema, model} from 'mongoose';

const BlogSchema = new Schema({
    title: { type: String, required: true },
    url: {type: String, required: true, unique: true, lowercase: true },
    content: {type: String, required: true},
    image: String, //Tipo string por que se requiere una url no la imagen en sí
    createdAt: { type: Date, default: Date.now},
    updateAt: Date
});

export default model('Blog', BlogSchema);