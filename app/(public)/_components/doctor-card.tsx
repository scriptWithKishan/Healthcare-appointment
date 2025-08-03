import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Hospital, Specialty } from "@prisma/client";
import Link from "next/link";

interface DoctorCardProps {
  details: {
    id: string;
    name: string;
    profileImg: string;
    specialty: Specialty;
    hospital: Hospital;
    email: string;
    phone: string;
    gender: string;
    description: string;
    experience: number;
  };
}

export const DoctorCard = ({ details }: DoctorCardProps) => {
  const { id, name, profileImg, specialty, hospital } = details;

  return (
    <li>
      <Link href={`/${id}`}>
        <Card className="border-none w-[300px] h-[400px] md:w-[200px] md:h-[350px] lg:w-[300px] lg:h-[400px] dark:bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-xl md:text-base lg:text-xl">
              {name}
            </CardTitle>
            <img src={profileImg} alt={name} />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {name} is specialized in {specialty} and works at {hospital}
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
};
