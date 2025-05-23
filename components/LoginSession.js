import React from "react";
import { signOut, useSession, signIn } from "next-auth/react";

export default function LoginSession() {
  const { data: session } = useSession();
// console.log(session)
  return (
    <div>
      {session ? (
        <div
        onClick={() => signOut({ callbackUrl: "https://catherinesjunkshop-production.up.railway.app" })}
        className="cursor-pointer lg:inline-flex lg:w-auto px-3 py-2 rounded hover:bg-blue-800"
      >
        Logout
      </div>
      
      
 
      ) : (
        <div className="w-full flex flex-col items-start lg:flex-row lg:items-center">
          <div onClick={() => signIn()}
              className={`cursor-pointer lg:inline-flex lg:w-auto px-3 py-2 rounded hover:bg-blue-800`}>
              Login
          </div>
        </div>

      )}
    </div>
  );
}



