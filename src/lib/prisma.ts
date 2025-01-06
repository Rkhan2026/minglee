//Avoid multiple Prisma Client instances:
    // When developing a Next.js application, one common issue is accidentally creating 
    // multiple instances of the Prisma Client. This often occurs due to Next.js’s 
    // hot-reloading feature in development.

//Why this happens:
    // Next.js’s hot-reloading feature reloads modules frequently to reflect code changes 
    // instantly. However, this can lead to multiple instances of Prisma Client being 
    // created, which consumes resources and might cause unexpected behavior.

//Recommended solution:
    //To avoid this, create a single Prisma Client instance by using a global variable:

import { PrismaClient } from "@prisma/client";

// Function to create a new instance of PrismaClient:
    //The Singleton Factory Design Pattern is used in this code to ensure 
    // that only one instance of the PrismaClient exists throughout the application 
    // lifecycle, particularly during development.
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare a global object that includes the Prisma client instance
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>; // Type for the Prisma client
} & typeof global;

// Initialize Prisma client instance
// If the global instance exists, use it; otherwise, create a new instance
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma; //important export

// In non-production environments i.e development, store the Prisma client instance globally
// This prevents multiple instances of PrismaClient being created during development (e.g., due to hot-reloading)
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;