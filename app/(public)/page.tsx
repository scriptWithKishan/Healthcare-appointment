"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FilterSchema } from "@/schemas";

import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Hospital, Specialty } from "@prisma/client";
import { DoctorCard } from "@/app/(public)/_components/doctor-card";
import { Skeleton } from "@/components/ui/skeleton";

const specialtyOptions = [
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
];

const hospitalOptions = [
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
];

interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  hospital: Hospital;
  profileImg: string;
  email: string;
  phone: string;
  gender: string;
  description: string;
  experience: number;
}

const HomePage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      search: "",
      specialty: undefined,
      hospital: undefined,
    },
  });

  const onSubmit = () => {
    getDoctors(form.getValues());
  };

  const getDoctors = async (values: z.infer<typeof FilterSchema>) => {
    try {
      const params = new URLSearchParams();

      if (values.specialty) params.set("specialty", values.specialty);
      if (values.search) params.set("search", values.search);
      if (values.hospital) params.set("hospital", values.hospital);

      const response = await fetch(`/api/doctors?${params.toString()}`);
      const data = await response.json();
      setDoctors(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    getDoctors(form.getValues());
  }, []);

  return (
    <div className="p-5 h-full w-full flex flex-col md:flex-row md:p-10">
      <div className="w-full md:w-[250px] lg:w-[300px] p-5">
        <h1 className="text-2xl font-semibold">Filters</h1>
        <Form {...form}>
          <form
            className="space-y-4 mt-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Search" type="search" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty</FormLabel>
                    <div key={field.value}>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Specialty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-neutral-900 border-none p-2">
                          {specialtyOptions.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hospital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital</FormLabel>
                    <div key={field.value}>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Hospital" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-neutral-900 border-none p-2">
                          {hospitalOptions.map((hospital) => (
                            <SelectItem key={hospital} value={hospital}>
                              {hospital}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button type="submit" variant="default">
                Filter
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  form.reset();
                  getDoctors(form.getValues());
                }}
              >
                Clear Filters
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Separator className="hidden md:block lg:block" orientation="vertical" />
      <div className="p-5 h-full w-full">
        <h1 className="text-2xl font-semibold">Doctors</h1>
        {loading ? (
          <ul className="flex flex-wrap gap-2 md:gap-4 lg:gap-6 p-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[300px] w-[300px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px] md:w-[250px] lg:w-[300px]" />
                  <Skeleton className="h-4 w-[200px] md:w-[250px] lg:w-[300px]" />
                </div>
              </div>
            ))}
          </ul>
        ) : doctors.length > 0 ? (
          <ul className="flex flex-wrap gap-2 md:gap-4 lg:gap-6 p-5">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} details={doctor} />
            ))}
          </ul>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl">
              No Doctors Found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
