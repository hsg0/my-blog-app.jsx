import { ConnectDB } from "@/app/lib/config/db";
import EmailModel from "@/app/lib/models/EmailModel";
import { NextResponse } from "next/server";

// Function to establish a database connection
async function loadDB() {
    await ConnectDB();
}

export async function POST(request) {
    await loadDB();  // Ensure DB is connected

    try {
        const formData = await request.formData();
        const emailData = {
            email: formData.get('email')  // Directly assign the value
        };

        await EmailModel.create(emailData);

        return NextResponse.json({ success: true, msg: "Email Subscribed" });
    } catch (error) {
        console.error("Error subscribing email:", error);
        return NextResponse.json({ success: false, msg: "Failed to subscribe email" }, { status: 500 });
    }
}
export async function GET(request){
    const emails = await EmailModel.find({})
    return NextResponse.json({emails})
}

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get("id")
    await EmailModel.findByIdAndDelete()
    return NextResponse.json({success:true, msg:"Email Deleted"})
}