import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ESS-${year}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentFirstName,
      studentMiddleName,
      studentLastName,
      dateOfBirth,
      gender,
      levelApplying,
      gradeClass,
      previousSchool,
      guardianName,
      guardianRelation,
      guardianPhone,
      guardianEmail,
      residentialAddress,
      city,
      medicalNotes,
    } = body;

    if (
      !studentFirstName ||
      !studentLastName ||
      !dateOfBirth ||
      !gender ||
      !levelApplying ||
      !gradeClass ||
      !guardianName ||
      !guardianPhone ||
      !residentialAddress
    ) {
      return NextResponse.json(
        { error: "Please fill in all required student and guardian fields." },
        { status: 400 }
      );
    }

    const referenceNumber = generateReferenceNumber();

    const application = await prisma.admissionApplication.create({
      data: {
        referenceNumber,
        studentFirstName: String(studentFirstName).trim(),
        studentMiddleName: studentMiddleName
          ? String(studentMiddleName).trim()
          : null,
        studentLastName: String(studentLastName).trim(),
        dateOfBirth: String(dateOfBirth).trim(),
        gender: String(gender).trim(),
        levelApplying: String(levelApplying).trim(),
        gradeClass: String(gradeClass).trim(),
        previousSchool: previousSchool ? String(previousSchool).trim() : null,
        guardianName: String(guardianName).trim(),
        guardianRelation: String(guardianRelation || "Parent").trim(),
        guardianPhone: String(guardianPhone).trim(),
        guardianEmail: guardianEmail ? String(guardianEmail).trim() : "",
        residentialAddress: String(residentialAddress).trim(),
        city: city ? String(city).trim() : "Tema",
        medicalNotes: medicalNotes ? String(medicalNotes).trim() : null,
        status: "Pending",
      },
    });

    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      referenceNumber: application.referenceNumber,
      application,
    });
  } catch (error) {
    console.error("Admission submission error:", error);
    return NextResponse.json(
      { error: "Could not submit application right now. Please try again." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing application ID" },
        { status: 400 }
      );
    }

    const updated = await prisma.admissionApplication.update({
      where: { id },
      data: {
        ...(status !== undefined ? { status } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
      },
    });

    revalidatePath("/admin");
    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error("Admission update error:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Missing application ID" },
        { status: 400 }
      );
    }

    await prisma.admissionApplication.delete({ where: { id } });
    revalidatePath("/admin");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admission delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}
