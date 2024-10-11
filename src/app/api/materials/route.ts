import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { data, error } = await supabase.from("materials").select();

  return NextResponse.json(data)
}
