"use server";
import { revalidatePath } from "next/cache";


const createCustomer = async (formData, setMessage) => {
  const creating_customer_name = formData.get("customer_name");
  const creating_customer_id = formData.get("customer_id")?.trim();
  const creating_age = formData.get("age");
  const creating_gender = formData.get("gender");


if (!creating_customer_id) {
    return {
      success: false,
      message: "❌ customer_id は必須です",
    };
  }

  const body_msg = JSON.stringify({
    customer_name: creating_customer_name,
    customer_id: creating_customer_id,
    age: creating_age,
    gender: creating_gender,
  });

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body_msg,
  });
  if (!res.ok) {
    return {
      success: false,
      message: "❌ 登録に失敗しました",
    };
  }

  return {
    success: true,
    message: "✅ 登録を完了しました",
  };


  revalidatePath(`/customers`);
};

export default createCustomer;
