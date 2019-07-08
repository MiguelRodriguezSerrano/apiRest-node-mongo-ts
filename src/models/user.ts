import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {type: String, required: true, unique: true, lowercase: true },
    password: {type: String, required: true},
    username: {type: String, required: true},
    createdAt: { type: Date, default: Date.now},
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

export default model('User', UserSchema);