"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { User } from "@/app/types/user";

import {
  FileUser,
  UserRoundPen,
  CircleX,
  Ellipsis,
  ChevronRight,
  ChevronLeft,
  Save,
} from 'lucide-react'

function NewUserForm() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/user');
      if (!res.ok) throw new Error('Failed to fetch user');

      const data: User = await res.json();
      setUser(data);

    } catch (err) {
      console.error(err);
      setError("Error user didn't load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateUser();
  }, []);

  return (
    <form className="flex flex-col border top-0 w-full">
      <section id="form-menu" className="flex items-center justify-between border-b h-10">
        <div className="flex items-center justify-between">
          <FileUser />
          <h2>New User</h2>
        </div>
        <div className="flex items-end justify-between">
          <UserRoundPen />
          <Ellipsis />
          <CircleX />
        </div>
      </section>
      <section id="form-data" className="flex items-center justify-between h-full">
        <div className="border-r max-h-full">
          <ChevronLeft />
        </div>
        <div className="max-h-full">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!user && !loading && <p>User data</p>}
          {user && (
            //<img src=`$user["picture"].["thumbnail"]`/>
             <ul className="bg-gray-100 text-sm p-4 rounded-md w-full overflow-x-auto whitespace-pre-wrap">
    {Object.entries(user).map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong>{" "}
        {typeof value === "object" && value !== null
          ? JSON.stringify(value, null, 2)
          : value.toString()}
      </li>
    ))}
  </ul>
          )}
        </div>
        <div className="border-l max-h-full">
          <ChevronRight />
        </div>
      </section>
      <section id="form-buttons" className="flex items-center justify-around border-t max-w-full">
        <Button onClick={handleGenerateUser} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Generate
        </Button>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          <Save />
          <span>Save</span>
        </Button>
      </section>
    </form>
  );
}

export default NewUserForm;