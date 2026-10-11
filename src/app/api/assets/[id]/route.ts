import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const asset = await prisma.uploadedAsset.findUnique({
      where: { id },
    });

    if (!asset) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return new NextResponse(Buffer.from(asset.data), {
      status: 200,
      headers: {
        "Content-Type": asset.mimeType || "image/jpeg",
        "Content-Length": String(asset.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Asset serve error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
