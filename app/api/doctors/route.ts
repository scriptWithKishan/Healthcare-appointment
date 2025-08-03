import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Hospital, Specialty } from "@prisma/client";
import { FilterSchema } from "@/schemas";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawParams = Object.fromEntries(searchParams.entries());

    const parseResult = FilterSchema.safeParse(rawParams);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request parameters",
          details: parseResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { specialty, hospital, search } = parseResult.data;

    const whereClause: {
      specialty?: Specialty;
      hospital?: Hospital;
      name?: {
        contains: string;
        mode: "insensitive";
      };
    } = {};

    if (specialty) {
      whereClause.specialty = specialty;
    }

    if (hospital) {
      whereClause.hospital = hospital;
    }

    if (search) {
      whereClause.name = { contains: search, mode: "insensitive" };
    }

    const doctors = await db.doctor.findMany({
      where: whereClause,
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
