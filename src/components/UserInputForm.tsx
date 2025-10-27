function UserInputForm() {
  return (
    <form className="flex flex-col items-center gap-2">
      <input
        type="text"
        placeholder="Enter"
        className="border px-3 py-2 rounded-md"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Save
      </button>
    </form>
  );
}

export default UserInputForm;