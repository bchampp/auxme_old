// Host, spotify access token, refresh token
import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        host: {
            name: String,
            accessToken: String,
            refreshToken: String,
        },
        name: String, 
        queue: Array,
    }, {
        timestamps: true
    }
);

export default mongoose.model("Session", schema);