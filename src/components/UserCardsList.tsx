function UserCardsList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border rounded-lg p-4 shadow-sm text-center bg-white"
        >
          <h3 className="font-semibold">User {i}</h3>
          <p className="text-sm text-gray-500">user{i}@example.com</p>
        </div>
      ))}
    </div>
  );
}

export default UserCardsList;