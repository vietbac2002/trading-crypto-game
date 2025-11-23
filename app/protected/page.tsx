import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Lobby from "@/components/main-room";
import { GameProvider } from "@/contexts/GameContext";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  
  return (
      <div className="flex-1 w-full flex flex-col gap-12">
       <Lobby />
      </div>
  )
}
