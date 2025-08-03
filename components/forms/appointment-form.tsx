"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookAppointmentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { bookAppointment } from "@/actions/book-appointment";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-failure";

const AppointmentForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const params = useParams();
  const doctorId = params?.id as string;

  const form = useForm<z.infer<typeof BookAppointmentSchema>>({
    resolver: zodResolver(BookAppointmentSchema),
    defaultValues: {
      doctorId,
      date: new Date(),
      timeSlot: "Morning",
      patientName: "",
      patientEmail: "",
      patientPhone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof BookAppointmentSchema>) => {
    setSuccess("");
    setError("");

    bookAppointment(values)
      .then((data) => {
        if (data?.success) {
          setSuccess(data.success);
        } else if (data?.error) {
          setError(data?.error);
        }
        form.reset();
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="patientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter patient name"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter patient email"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patientPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter patient phone number"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booking Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                        >
                          <CalendarIcon />
                          {field.value ? (
                            field.value.toLocaleDateString()
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 dark:bg-neutral-900">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Slot</FormLabel>
                  <div key={field.value}>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Time Slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-neutral-800 border-none p-2">
                        <SelectItem value="Morning">Morning</SelectItem>
                        <SelectItem value="Afternoon">Afternoon</SelectItem>
                        <SelectItem value="Evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
        <Button type="submit" variant="default">
          Book Appointment
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentForm;
