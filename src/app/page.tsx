// Importing the `currentUser` function from the Clerk library for Next.js server-side usage.
// This function allows us to retrieve the currently authenticated user's information.
import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/CreatePost";
import WhoToFollow from "@/components/WhoToFollow";

export default async function Home() {
  // Fetching the current user's information using the `currentUser` function.
  const user = await currentUser();
  return (
    // A container for the entire home page except the left sidebar.
    // It adjusts between a single-column layout on smaller screens and 
    // a multi-column layout on larger screens.
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* The main content section, spanning 6 columns on larger screens. */}
        <div className="lg:col-span-6">
           {/* If the user is authenticated then only render the `CreatePost` component.
            Otherwise, render nothing (null). */}
        {user ? <CreatePost /> : null}
        </div>
          {/* A right sidebar section, visible only on large screens (hidden on smaller ones).
          It spans 4 columns and is "sticky", staying in view as the user scrolls. */}
        <div className="hidden lg:block lg:col-span-4 sticky top-20">
          <WhoToFollow/>
        </div>
    </div>
  );
}
