import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAppointmentsByDoctorId } from "@/data/appointment";

interface AppointmentsProps {
  doctorId: string;
}

export const Appointments = async ({ doctorId }: AppointmentsProps) => {
  const appointments = await getAppointmentsByDoctorId(doctorId);

  if (!appointments || appointments.length <= 0) {
    return <p>No Appointments.</p>;
  }

  const updatedData = appointments.map((appointment) => ({
    id: appointment.id,
    patientName: appointment.patientName,
    date: `${appointment.date.getDate()}-${
      appointment.date.getMonth() + 1
    }-${appointment.date.getFullYear()}`,
    timeSlot: appointment.timeSlot,
    status: appointment.date < new Date() ? "Past" : "Upcoming",
  }));

  return (
    <Table>
      <TableCaption>Appointments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs lg:text-sm">Patient Name</TableHead>
          <TableHead className="text-xs lg:text-sm">Date</TableHead>
          <TableHead className="text-xs lg:text-sm">Time Slot</TableHead>
          <TableHead className="text-xs lg:text-sm">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {updatedData.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="text-xs lg:text-sm">
              {appointment.patientName}
            </TableCell>
            <TableCell className="text-xs lg:text-sm">
              {appointment.date}
            </TableCell>
            <TableCell className="text-xs lg:text-sm">
              {appointment.timeSlot}
            </TableCell>
            <TableCell className="text-xs lg:text-sm">
              {appointment.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
