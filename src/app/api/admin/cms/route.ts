import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 80) +
    "-" +
    Math.floor(100 + Math.random() * 900)
  );
}

function revalidateAllPublicPages() {
  revalidatePath("/");
  revalidatePath("/notice");
  revalidatePath("/gallery");
  revalidatePath("/about");
  revalidatePath("/admission");
  revalidatePath("/contact");
  revalidatePath("/admin");
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contentType = req.headers.get("content-type") || "";

    // 1. Handle direct file upload (multipart/form-data) -> UploadedAsset in Neon DB
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { error: "No image file provided." },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 4.5MB limit check for serverless payload safety
      if (buffer.byteLength > 4.5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Image file must be under 4.5 MB." },
          { status: 400 }
        );
      }

      const asset = await prisma.uploadedAsset.create({
        data: {
          filename: file.name || "uploaded-photo.jpg",
          mimeType: file.type || "image/jpeg",
          size: buffer.byteLength,
          data: buffer,
        },
      });

      return NextResponse.json({
        success: true,
        url: `/api/assets/${asset.id}`,
        assetId: asset.id,
      });
    }

    // 2. Handle JSON CMS operations
    const body = await req.json();
    const { entity, action, data } = body;

    if (entity === "notice") {
      if (action === "create") {
        const created = await prisma.notice.create({
          data: {
            title: String(data.title).trim(),
            slug: slugify(String(data.title || "notice")),
            category: String(data.category || "General"),
            excerpt: String(data.excerpt || data.content?.slice(0, 160) || "").trim(),
            content: String(data.content || "").trim(),
            coverImage: data.coverImage || "/images/school/DSC_0064.jpg",
            isPinned: Boolean(data.isPinned),
            published: data.published !== false,
            publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
          },
        });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true, item: created });
      }

      if (action === "update") {
        const updated = await prisma.notice.update({
          where: { id: String(data.id) },
          data: {
            ...(data.title !== undefined ? { title: String(data.title).trim() } : {}),
            ...(data.category !== undefined ? { category: String(data.category) } : {}),
            ...(data.excerpt !== undefined ? { excerpt: String(data.excerpt).trim() } : {}),
            ...(data.content !== undefined ? { content: String(data.content).trim() } : {}),
            ...(data.coverImage !== undefined ? { coverImage: data.coverImage } : {}),
            ...(data.isPinned !== undefined ? { isPinned: Boolean(data.isPinned) } : {}),
            ...(data.published !== undefined ? { published: Boolean(data.published) } : {}),
          },
        });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true, item: updated });
      }

      if (action === "delete") {
        await prisma.notice.delete({ where: { id: String(data.id) } });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true });
      }
    }

    if (entity === "event") {
      if (action === "create") {
        const created = await prisma.schoolEvent.create({
          data: {
            title: String(data.title).trim(),
            description: data.description ? String(data.description).trim() : null,
            eventDate: new Date(data.eventDate),
            timeString: data.timeString ? String(data.timeString).trim() : null,
            location: data.location
              ? String(data.location).trim()
              : "El-Shadai Campus, Tema Newtown Manhean",
            category: String(data.category || "Term Date"),
            isFeatured: data.isFeatured !== false,
          },
        });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true, item: created });
      }

      if (action === "update") {
        const updated = await prisma.schoolEvent.update({
          where: { id: String(data.id) },
          data: {
            ...(data.title !== undefined ? { title: String(data.title).trim() } : {}),
            ...(data.description !== undefined ? { description: data.description } : {}),
            ...(data.eventDate !== undefined ? { eventDate: new Date(data.eventDate) } : {}),
            ...(data.timeString !== undefined ? { timeString: data.timeString } : {}),
            ...(data.location !== undefined ? { location: data.location } : {}),
            ...(data.category !== undefined ? { category: data.category } : {}),
          },
        });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true, item: updated });
      }

      if (action === "delete") {
        await prisma.schoolEvent.delete({ where: { id: String(data.id) } });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true });
      }
    }

    if (entity === "gallery") {
      if (action === "create") {
        const created = await prisma.galleryItem.create({
          data: {
            title: String(data.title || "Campus Moment").trim(),
            caption: data.caption ? String(data.caption).trim() : null,
            category: String(data.category || "Classroom Learning"),
            imageUrl: String(data.imageUrl),
            featured: Boolean(data.featured),
            sortOrder: Number(data.sortOrder || 0),
          },
        });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true, item: created });
      }

      if (action === "update") {
        const updated = await prisma.galleryItem.update({
          where: { id: String(data.id) },
          data: {
            ...(data.title !== undefined ? { title: String(data.title).trim() } : {}),
            ...(data.caption !== undefined ? { caption: data.caption ? String(data.caption).trim() : null } : {}),
            ...(data.category !== undefined ? { category: String(data.category).trim() } : {}),
            ...(data.imageUrl !== undefined ? { imageUrl: String(data.imageUrl).trim() } : {}),
            ...(data.featured !== undefined ? { featured: Boolean(data.featured) } : {}),
          },
        });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true, item: updated });
      }

      if (action === "delete") {
        await prisma.galleryItem.delete({ where: { id: String(data.id) } });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true });
      }
    }

    if (entity === "leader") {
      if (action === "create") {
        const created = await prisma.leaderMember.create({
          data: {
            name: String(data.name).trim(),
            role: String(data.role).trim(),
            bio: data.bio ? String(data.bio).trim() : null,
            imageUrl: String(data.imageUrl || "/images/school/leader-headteacher.jpg"),
            facebookUrl: data.facebookUrl || "#",
            twitterUrl: data.twitterUrl || "#",
            linkedinUrl: data.linkedinUrl || "#",
            sortOrder: Number(data.sortOrder || 10),
          },
        });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true, item: created });
      }

      if (action === "update") {
        const updated = await prisma.leaderMember.update({
          where: { id: String(data.id) },
          data: {
            ...(data.name !== undefined ? { name: String(data.name).trim() } : {}),
            ...(data.role !== undefined ? { role: String(data.role).trim() } : {}),
            ...(data.bio !== undefined ? { bio: data.bio } : {}),
            ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl } : {}),
            ...(data.sortOrder !== undefined ? { sortOrder: Number(data.sortOrder) } : {}),
          },
        });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true, item: updated });
      }

      if (action === "delete") {
        await prisma.leaderMember.delete({ where: { id: String(data.id) } });
        revalidateAllPublicPages();
        return NextResponse.json({ success: true });
      }
    }

    if (entity === "settings" && action === "update") {
      const updated = await prisma.siteSettings.upsert({
        where: { id: "default" },
        update: {
          schoolName: data.schoolName,
          motto: data.motto,
          heroBadge: data.heroBadge,
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          heroImage: data.heroImage,
          aboutSummary: data.aboutSummary,
          mission: data.mission,
          vision: data.vision,
          coreValues: data.coreValues,
          headteacherName: data.headteacherName,
          headteacherRole: data.headteacherRole,
          headteacherMessage: data.headteacherMessage,
          headteacherImage: data.headteacherImage,
          address: data.address,
          phonePrimary: data.phonePrimary,
          phoneSecondary: data.phoneSecondary,
          emailInfo: data.emailInfo,
          emailAdmissions: data.emailAdmissions,
          admissionFeeTitle: data.admissionFeeTitle,
          admissionFeeText: data.admissionFeeText,
          primaryTuitionText: data.primaryTuitionText,
          jhsTuitionText: data.jhsTuitionText,
          facebookUrl: data.facebookUrl,
          instagramUrl: data.instagramUrl,
          tiktokUrl: data.tiktokUrl,
          youtubeUrl: data.youtubeUrl,
          urgentBannerActive: Boolean(data.urgentBannerActive),
          urgentBannerText: data.urgentBannerText,
          urgentBannerLink: data.urgentBannerLink,
        },
        create: {
          id: "default",
          schoolName: data.schoolName || "El-Shadai School",
          aboutSummary: data.aboutSummary || "Nurturing future leaders in Tema Newtown Manhean.",
          mission: data.mission || "Holistic education blending academic excellence and character.",
          vision: data.vision || "Leading private school in Ghana.",
          headteacherMessage: data.headteacherMessage || "Welcome to El-Shadai School.",
        },
      });
      revalidateAllPublicPages();
      return NextResponse.json({ success: true, item: updated });
    }

    return NextResponse.json(
      { error: "Unsupported CMS entity or action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin CMS operation error:", error);
    return NextResponse.json(
      { error: "Failed to save changes. Please verify your inputs." },
      { status: 500 }
    );
  }
}
