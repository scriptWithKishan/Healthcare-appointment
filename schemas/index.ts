import * as z from "zod";

export const FilterSchema = z.object({
  search: z.string().optional(),
  specialty: z
    .enum([
      "Cardiology",
      "Dermatology",
      "Neurology",
      "Pediatrics",
      "Orthopedics",
      "Surgery",
      "Urology",
      "Allergies",
      "Immunology",
      "Psychiatry",
      "Gastroenterology",
      "Anesthesiology",
      "Oncology",
      "Radiology",
      "Medicine",
      "ENT",
      "Nutrition",
      "Healthcare",
    ] as const)
    .optional(),
  hospital: z
    .enum([
      "Hospital1",
      "Hospital2",
      "Hospital3",
      "Hospital4",
      "Hospital5",
      "Hospital6",
      "Hospital7",
      "Hospital8",
      "Hospital9",
      "Hospital10",
      "Hospital11",
      "Hospital12",
      "Hospital13",
    ] as const)
    .optional(),
});

export const BookAppointmentSchema = z.object({
  doctorId: z.string(),
  patientName: z.string().min(6, {
    message: "Please enter patient name",
  }),
  patientEmail: z.string().email({
    message: "Please enter a valid email address",
  }),
  patientPhone: z
    .string()
    .length(10, {
      message: "Please enter a valid phone number",
    })
    .regex(/^\d+$/, {
      message: "Phone number should contain only digits",
    }),
  date: z.date().refine((date) => date > new Date(), {
    message: "Please select a future date",
  }),
  timeSlot: z.enum(["Morning", "Afternoon", "Evening"]),
});
