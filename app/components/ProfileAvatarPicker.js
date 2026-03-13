"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

const avatars = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=6",
    "https://i.pravatar.cc/150?img=7",
    "https://i.pravatar.cc/150?img=8",
];

export default function ProfileAvatarPicker({ user }) {
    const [chosen, setChosen] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem(`avatar-${user.email}`);
        if (stored) setChosen(stored);
    }, [user.email]);

    const selectAvatar = (avatar) => {
        localStorage.setItem(`avatar-${user.email}`, avatar);
        setChosen(avatar);
    };

    return (
        <div className="w-full max-w-3xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {avatars.map((avatar) => (
                    <button
                        key={avatar}
                        onClick={() => selectAvatar(avatar)}
                        className={`rounded-full border-4 transition-all ${chosen === avatar ? "border-blue-400" : "border-transparent"}`}
                    >
                        <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
                    </button>
                ))}
            </div>

            {chosen && (
                <div className="mb-6 text-center">
                    <p className="text-xl mb-3">Selected Avatar</p>
                    <img src={chosen} alt="selected avatar" className="w-28 h-28 rounded-full mx-auto object-cover" />
                </div>
            )}

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => signOut({ callbackUrl: "/register" })}
                    className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
}
