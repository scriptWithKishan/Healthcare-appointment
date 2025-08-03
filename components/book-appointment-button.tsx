import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AppointmentForm from "@/components/forms/appointment-form";
import React from "react";

interface BookAppointmentButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const BookAppointmentButton = ({
  children,
  asChild,
}: BookAppointmentButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="dark:bg-neutral-900 border-none">
        <DialogTitle>Book Appointment</DialogTitle>
        <AppointmentForm />
      </DialogContent>
    </Dialog>
  );
};
