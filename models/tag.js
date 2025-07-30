import mongoose from 'mongoose';
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true,
    },
    description: {
        type: String,
    },
}, { timestamps: true });

const Tag = mongoose.model('tag',tagSchema);
export default Tag;