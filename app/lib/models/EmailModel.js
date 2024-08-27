import mongoose from "mongoose";

// Define the Email schema
const Schema = new mongoose.Schema({
    email: {
        type: String,  // Correct type
        required: true
    },
    date: {
        type: Date,
        default: Date.now  // Use Date.now (without parentheses)
    }
});

// Check if the 'Email' model already exists to avoid re-compilation errors
const EmailModel = mongoose.models.Email || mongoose.model('Email', Schema);

export default EmailModel;