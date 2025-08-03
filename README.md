# Healthcare Appointment Booking Platform

This project is a full stack web application designed to simplify the process of booking doctor appointments.
Built with **Next.js** with **TypeScript** using the **App Router**, it offers patients great user experience for patients with great UI design while ensuring accurate, real-time slot validation and doctor management. The TypeScript ensures the
type safety of the project and provide accurate results.

## Tools and Libraries Used

- **Next.js 15 (App Router)** - Full-stack React framework for server-side and client-side rendering
- **TypeScript** - Static typing for type safety and scalability
- **Tailwind CSS** - Utility-first styling for a clean, responsive UI
- **ShadCN UI** - Pre-styled, accessible UI components
- **Prisma ORM** - Type-safe ORM for database access and schema management
- **PostgreSQL** - Relational database for structured doctor and appointment data
- **Zod** - Schema-based validation on both frontend and backend
- **React Hook Form** - Form state management with seamless zod integration

## Features

- Doctor listing with filters by **specialty** and **hospital**
- Date and time slot selection with real time availability check
- Prevention of double booking or past bookings
- Form validation with zod and React Hook Form
- Responsive design for mobile, tab and desktop (small, medium and large devices)
- Both Server-side rendering and Client-side rendering of the components.

## Improvements with More Time

1. Show availability of Doctors, and design UI for easy checking (Maybe add calender with colors to represent the bookings)
2. Add Authentication and Authorization using NextAuth (A open source authentication system for Next.js).
3. Add OAuth login, 2 Factor Authentication, Role based login system and mailing system using nextAuth.
4. Modifying the appointments page in such a way that it only shows the appointments of the user when logged in.
5. Applying pagination and lazy loading for reducing the stress by loading a large data.
6. Add mailing system with all the information of appointment to both user and doctor.
7. Adding feature for doctors to apply for leave to avoid booking in that dates.

## Challenges Faced and Solutions

### 1. Prisma Database Management

The problem I faced during this project was initializing and managing the prisma ORM, This was something new for me to explore and find out how prisma ORM works in the Next.js project and it helped me to gain more insights of how we can use ORM to easily create and query the database.

### 2. Schema Validation

For Validating the forms I have used zod which was completely new tech for me. I learned basics of how to apply zod validation for form. The TypeScript is very strict of type safety. Therefore validating each and very data was bit tricky in this project.

### 3. Server Actions and API Routes

Creating API routes in Next.js was a bit difficult and I made mistakes lot of time, with the help of many resources I was able to understand the basics and overcome mistakes to create this project.
