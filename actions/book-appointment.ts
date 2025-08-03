"use server";

import * as z from "zod";
import { BookAppointmentSchema } from "@/schemas";
import { db } from "@/lib/db";
import { endOfDay, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const bookAppointment = async (
  values: z.infer<typeof BookAppointmentSchema>
) => {
  const parsed = BookAppointmentSchema.parse(values);

  if (!parsed) {
    return { error: "Invalid appointment data" };
  }

  const localDate = toZonedTime(parsed.date, "Asia/Kolkata");
  const existingAppointment = await db.appointment.findFirst({
    where: {
      date: {
        gte: startOfDay(localDate),
        lte: endOfDay(localDate),
      },
      timeSlot: parsed.timeSlot,
      doctorId: parsed.doctorId,
    },
  });

  if (existingAppointment) {
    return { error: "Slot is already booked" };
  }

  await db.appointment.create({
    data: {
      patientName: parsed.patientName,
      patientEmail: parsed.patientEmail,
      patientPhone: parsed.patientPhone,
      date: localDate,
      timeSlot: parsed.timeSlot,
      doctorId: parsed.doctorId,
    },
  });

  return { success: "Appointment booked successfully" };
};
