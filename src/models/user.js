import mongoose from '../mongoose';
const {Schema} = mongoose;

export const UserSchema = new Schema({
    displayName: String,
    login: String,
    twitchId: {type: String, unique: true},
    scopes: [String],
    avatar: String,
    accessToken: {type: String, select: false},
    refreshToken: {type: String, select: false},
    isBanned: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
}, {versionKey: false, timestamps: true});

export const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
