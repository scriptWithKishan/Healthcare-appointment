import React from "react";

const AboutPage = () => {
  return (
    <div className="space-y-8 px-5 md:px-20 lg:px-40 py-20">
      <h1 className="text-4xl font-semibold">About</h1>
      <p className="text-justify">
        This project is a responsive, modern healthcare appointment booking
        platform built to simplify how patients connect with doctors. It uses
        Next.js for both client-side and server-side rendering, Prisma Object
        Relation Mapping (ORM) for database management, Tailwind CSS for
        styling. This project use TypeScript for type safety and Next.js for
        writing both client-side and server-side code. In this project, Next.js
        app routing is used for routing, zod for schema validation.
      </p>
      <p className="text-xl font-semibold">It enables users to:</p>
      <ul className="space-y-2 list-disc">
        <li>Seamlessly browse doctors by specialty or hospital</li>
        <li>View real-time appointments of each doctors</li>
        <li>Book appointments with instant confirmation</li>
        <li>View past and upcoming appointments</li>
      </ul>
    </div>
  );
};

export default AboutPage;
