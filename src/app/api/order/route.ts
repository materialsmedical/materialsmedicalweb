import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
      const orderData = await request.json();
  
      // Insert data into the 'countries' table
      const { error } = await supabase
        .from('orders')
        .insert({
          name: orderData.name,
          phone: orderData.phone,
          socialAccount: orderData.socialAccount,
          cartItems: orderData.cartItems,
          totalPrice: orderData.totalPrice,
        });

      if (error) {
        throw new Error(error.message);
      }
  
      return NextResponse.json({ message: 'Order submitted successfully!' }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  }
