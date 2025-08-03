import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { FilterSchema } from "@/schemas";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const rawParams = Object.fromEntries(searchParams.entries());

  const parsed = FilterSchema.parse(rawParams);

  if (!parsed) {
    return new Response("Invalid request parameters", {
      status: 400,
    });
  }

  const { specialty, hospital, search } = parsed;

  const doctors = await db.doctor.findMany({
    where: {
      specialty: specialty ? specialty : undefined,
      hospital: hospital ? hospital : undefined,
      name: { contains: search, mode: "insensitive" },
    },
  });

  return new Response(JSON.stringify(doctors));
}
