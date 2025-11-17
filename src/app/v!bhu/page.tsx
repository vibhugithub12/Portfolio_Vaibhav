import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PASSWORD = process.env.USER_PASS;

//  server action as arrow function
const verifyPassword = async (formData: FormData) => {
  "use server";

  const input = formData.get("password");

  if (!PASSWORD) throw new Error("USER_PASS env var not set");

  if (input === PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("vibhu_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });

    redirect("/v!bhu");
  } else {
    redirect("/");
  }
};

//  page component as arrow function
const VibhuPage = async () => {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("vibhu_auth")?.value === "1";

  if (!isAuthed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1>Identity check</h1>

        <form action={verifyPassword} className="flex gap-2">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="border px-2 py-1"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-3 py-1 rounded-md"
          >
            It&apos;s me
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome, The Creator 🔥</h1>
      <p>Now you&apos;re seeing the secure section.</p>
    </div>
  );
};

export default VibhuPage;
