import { db } from "@/lib/db";
import { Doctor } from "@prisma/client";

export const getDoctorById = async (id: string): Promise<Doctor | null> => {
  try {
    const doctor = await db.doctor.findUnique({
      where: {
        id,
      },
    });

    return doctor;
  } catch {
    return null;
  }
};
