import { db } from "@/lib/db";
import { Appointment } from "@prisma/client";

export const getAppointmentsByDoctorId = async (
  doctorId: string
): Promise<Array<Appointment> | null> => {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        doctorId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return appointments;
  } catch {
    return null;
  }
};

export const getAppointmentsByUserId = async () => {
  try {
    const appointments = await db.appointment.findMany({
      orderBy: {
        date: "desc",
      },
      include: {
        doctor: true,
      },
    });

    return appointments;
  } catch {
    return null;
  }
};
