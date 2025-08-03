import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDoctorById } from "@/data/doctor";
import { Appointments } from "@/app/(public)/_components/appointments";
import { BookAppointmentButton } from "@/components/book-appointment-button";

interface DoctorPageProps {
  params: {
    id: string;
  };
}

const DoctorDetailsPage = async ({ params }: DoctorPageProps) => {
  const { id } = await params;

  const doctor = await getDoctorById(id);

  if (!doctor) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <h1 className="text-5xl">Doctor Not Found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-1 h-full p-10">
      <div className="w-full mb-5 lg:mb-0 md:w-3/5 lg:w-2/3 space-y-8">
        <div className="flex flex-col lg:flex-row">
          <img
            className="w-[450px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
            src={doctor.profileImg || "imageplaceholder.png"}
            alt={doctor.name}
          />
          <div className="flex flex-col gap-2 lg:gap-4 w-full px-2 lg:px-10 mt-5 lg:mt-0">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">
              {doctor.name}
            </h1>
            <Separator orientation="horizontal" />
            <div className="flex items-center gap-2 lg:gap-4">
              <p>{doctor.phone}</p>
              <Separator orientation="vertical" />
              <p>{doctor.email}</p>
            </div>
            <p className="text-base">Gender: {doctor.gender}</p>
            <p className="text-base">Specialty: {doctor.specialty}</p>
            <p className="text-base">Hospital: {doctor.hospital}</p>
            <p className="text-base">Experience: {doctor.experience}</p>
            <p className="text-sm text-justify">{doctor.description}</p>
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="px-2 md:px-5 flex flex-col gap-4">
          <div>
            <h2 className="text-base font-semibold">Book Your Appointment</h2>
            <p className="text-sm text-justify">
              Connect with {doctor.name} at {doctor.hospital}, backed by a{" "}
              {doctor.experience}+ years of medical experience and specialized
              in {doctor.specialty}. For consultations, preventive care, or
              expert advice, react out via {doctor.email}. Prioritize your
              health, schedule your appointment today and take a confident step
              toward better care.
            </p>
          </div>
          <BookAppointmentButton asChild>
            <Button className="w-fit" variant="default">
              Book Appointment
            </Button>
          </BookAppointmentButton>
        </div>
      </div>
      <Separator className="hidden md:block" orientation="vertical" />
      <Separator className="block md:hidden" orientation="horizontal" />
      <div className="w-full md:w-2/5 lg:w-1/3 px-0 md:px-2 lg:px-10 space-y-10 mt-5 md:mt-0">
        <h1 className="text-4xl font-semibold">Appointments</h1>
        <Appointments doctorId={id} />
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
