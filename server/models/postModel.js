import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    desc: { type: String },
    likes: [],
    comments: [{
        userId: String, // User ID of the commenter
        text: String, // The comment text
        createdAt: Date // The timestamp when the comment was created
    }],
    trendingTags: [String],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    image: String,
    video: String,
    gif: String,
}, {
    timestamps: true,
});

const PostModel = mongoose.model('Posts', postSchema);

export default PostModel;