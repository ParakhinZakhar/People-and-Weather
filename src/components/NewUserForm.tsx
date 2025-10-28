"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { User } from "@/app/types/user";
import { CirclePlus, Save, CircleX } from "lucide-react";
import { UserAvatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

function NewUserForm() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/user?cacheBuster=" + Date.now());
      if (!res.ok) throw new Error("Failed to fetch user");

      const data: User = await res.json();
      setUsers((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
      setError("Error user didn't load");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Grid 3 в ряд */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {users.map((user, idx) => (
          <div
            key={idx}
            className="border rounded-md shadow-md p-4 flex flex-col items-center bg-white"
          >
            <UserAvatar src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} size="lg" />

            <div className="mt-2 w-full space-y-1">
              <Input label="Title" value={user.name.title} />
              <Input label="First Name" value={user.name.first} />
              <Input label="Last Name" value={user.name.last} />
              <Input label="Gender" value={user.gender} />
              <Input label="Email" value={user.email} />
              <Input label="Latitude" value={user.location.coordinates.latitude} />
              <Input label="Longitude" value={user.location.coordinates.longitude} />
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Save /> Save
              </Button>
              <Button variant="destructive" size="sm">
                <CircleX /> Delete
              </Button>
            </div>
          </div>
        ))}

        {/* Карточка для додавання нового користувача */}
        <div
          onClick={handleGenerateUser}
          className="border-2 border-dashed border-gray-400 rounded-md shadow-md p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
        >
          <CirclePlus className="w-16 h-16 text-gray-400" />
          <span className="mt-2 text-gray-500 font-medium">Add New User</span>
        </div>
      </div>
    </div>
  );
}

export default NewUserForm;
