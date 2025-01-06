import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";

export default async function Home() {
  return (
    <h1>Welcome To Home Page</h1>
  );
}
