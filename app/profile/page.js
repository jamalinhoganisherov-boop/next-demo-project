import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProfileAvatarPicker from "@/app/components/ProfileAvatarPicker";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/register");
    }

    return (
        <main className="min-h-screen bg-[#030622] text-white flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-6">Hi {session.user.name || session.user.email}</h1>
            <p className="text-gray-300 mb-8">Choose your profile avatar</p>
            <ProfileAvatarPicker user={session.user} />
        </main>
    );
}
