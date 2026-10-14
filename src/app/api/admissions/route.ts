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

    // Seamlessly sync with KadjeloEdu ERP admissions pipeline
    const portalUrl = process.env.KADJELO_PORTAL_URL || "http://localhost:8000";
    const portalSecret = process.env.KADJELO_ADMISSIONS_SECRET || "kadjelo-admissions-secret-2026";
    let erpAdmissionNumber: string | null = null;

    try {
      const erpRes = await fetch(`${portalUrl.replace(/\/$/, "")}/api/v1/admissions/external`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${portalSecret}`,
          "X-Admissions-Secret": portalSecret,
        },
        body: JSON.stringify({
          studentFirstName: application.studentFirstName,
          studentMiddleName: application.studentMiddleName,
          studentLastName: application.studentLastName,
          dateOfBirth: application.dateOfBirth,
          gender: application.gender,
          levelApplying: application.levelApplying,
          gradeClass: application.gradeClass,
          previousSchool: application.previousSchool,
          guardianName: application.guardianName,
          guardianRelation: application.guardianRelation,
          guardianPhone: application.guardianPhone,
          guardianEmail: application.guardianEmail,
          residentialAddress: application.residentialAddress,
          city: application.city,
          medicalNotes: application.medicalNotes,
          referenceNumber: application.referenceNumber,
          source: "El-Shadai Public Website",
        }),
        signal: AbortSignal.timeout(5000),
      });

      if (erpRes.ok) {
        const erpData = await erpRes.json();
        erpAdmissionNumber = erpData?.admission?.admission_number || null;
      } else {
        const errText = await erpRes.text();
        console.warn("KadjeloEdu ERP Admissions sync returned non-OK status:", erpRes.status, errText);
      }
    } catch (syncErr) {
      // Non-blocking resilience: if ERP is unreachable or network times out, website admission still succeeds
      console.warn("KadjeloEdu ERP Admissions sync (non-blocking fallback):", syncErr);
    }

    return NextResponse.json({
      success: true,
      referenceNumber: application.referenceNumber,
      erpAdmissionNumber,
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
