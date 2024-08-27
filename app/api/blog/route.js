import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { ConnectDB } from "@/app/lib/config/db";
import BlogModel from "@/app/lib/models/BlogModel";

async function loadDB() {
  await ConnectDB();
}

// API Endpoint to get all blogs
export async function GET(request) {
  await loadDB();

  try {
    const blogId = request.nextUrl.searchParams.get('id');

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// API Endpoint for uploading blogs
export async function POST(request) {
  await loadDB();

  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;

    await writeFile(path, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: `${formData.get('title')}`,
      description: `${formData.get('description')}`,
      category: `${formData.get('category')}`,
      author: `${formData.get('author')}`,
      image: `${imgUrl}`,
      authorImg: `${formData.get('authorImg')}`,
    };

    await BlogModel.create(blogData);

    console.log("Blog saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}

// API Endpoint to delete Blog
export async function DELETE(request) {
  await loadDB();

  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "Blog ID not provided" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const filePath = `./public${blog.image}`;
    await unlink(filePath).catch((error) => console.error("Error deleting file:", error));

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Blog Deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}