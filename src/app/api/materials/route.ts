import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  const { data } = await supabase.from("materials").select();

  return NextResponse.json(data)
}
