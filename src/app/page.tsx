import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
        <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500">
                Sign In
              </button>
              </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
    </div>
  );
}
