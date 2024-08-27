import mongoose from "mongoose";

// Define the Blog schema
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true  // trims whitespace
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    authorImg: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now  // Set to Date.now (without parentheses)
    }
});

// Check if the 'Blog' model already exists to avoid re-compilation errors
const BlogModel = mongoose.models.Blog || mongoose.model('Blog', Schema);

export default BlogModel;