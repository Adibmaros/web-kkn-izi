import { NextRequest, NextResponse } from "next/server";
import { supabase, STORAGE_BUCKET } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "File gambar wajib diupload" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF." },
                { status: 400 },
            );
        }

        // Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "Ukuran file maksimal 5MB" }, { status: 400 });
        }

        // Generate unique filename
        const ext = file.name.split(".").pop();
        const fileName = `articles/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

        // Convert File to ArrayBuffer then to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (uploadError) {
            console.error("Upload error:", uploadError);
            return NextResponse.json({ error: "Gagal mengupload gambar: " + uploadError.message }, { status: 500 });
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(fileName);

        return NextResponse.json({ url: urlData.publicUrl, path: fileName });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Gagal mengupload gambar" }, { status: 500 });
    }
}

// DELETE: remove image from storage
export async function DELETE(req: NextRequest) {
    try {
        const { path } = await req.json();

        if (!path) {
            return NextResponse.json({ error: "Path gambar wajib diisi" }, { status: 400 });
        }

        const { error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .remove([path]);

        if (error) {
            console.error("Delete error:", error);
            return NextResponse.json({ error: "Gagal menghapus gambar: " + error.message }, { status: 500 });
        }

        return NextResponse.json({ message: "Gambar berhasil dihapus" });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Gagal menghapus gambar" }, { status: 500 });
    }
}
