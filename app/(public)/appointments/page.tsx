import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAppointmentsByUserId } from "@/data/appointment";
import React from "react";

const AppointmentsPage = async () => {
  const appointments = await getAppointmentsByUserId();

  const updatedAppointments = appointments?.map((data) => ({
    ...data,
    status: data.date < new Date() ? "Past" : "Upcoming",
  }));

  return (
    <div className="w-full h-full flex flex-col items-center px-5 lg:px-30 py-10 space-y-15">
      <h1 className="text-4xl font-semibold">Appointments</h1>
      <Table>
        <TableCaption>My Appointments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs lg:text-sm">Doctor Name</TableHead>
            <TableHead className="text-xs lg:text-sm">
              Doctor Specialty
            </TableHead>
            <TableHead className="text-xs lg:text-sm">Hospital</TableHead>
            <TableHead className="text-xs lg:text-sm">Doctor Email</TableHead>
            <TableHead className="text-xs lg:text-sm">Doctor Phone</TableHead>
            <TableHead className="text-xs lg:text-sm">Date (m/d/y)</TableHead>
            <TableHead className="text-xs lg:text-sm">Time Slot</TableHead>
            <TableHead className="text-xs lg:text-sm">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {updatedAppointments?.map((appointments) => (
            <TableRow key={appointments.id}>
              <TableCell className="text-xs lg:text-sm">
                {appointments.doctor.name}
              </TableCell>
              <TableCell className="text-xs lg:text-sm">
                {appointments.doctor.specialty}
              </TableCell>
              <TableCell className="text-xs lg:text-sm">
                {appointments.doctor.hospital}
              </TableCell>
              <TableCell className="text-xs lg:text-sm">
                {appointments.doctor.email}
              </TableCell>
              <TableCell className="text-xs lg:text-sm">
                {appointments.doctor.phone}
              </TableCell>
              <TableCell className="text-xs lg:text-sm">
                {new Date(appointments.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-xs lg:text-sm">
                {appointments.timeSlot}
              </TableCell>
              <TableCell className="text-xs lg:text-sm">
                {appointments.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentsPage;
