import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://hsg001:v62sXpljFYy4nG5V@cluster0.agfjmg2.mongodb.net/blog-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error: ", error);
        process.exit(1); // Optional: Exit the process if the connection fails
    }
};