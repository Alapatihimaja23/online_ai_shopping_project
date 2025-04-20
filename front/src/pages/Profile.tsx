
export default function Profile() {
  // Placeholder user
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 sm:py-12 px-2 sm:px-0">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-md">
        <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full shadow mb-2" />
        <div className="text-xl sm:text-2xl font-bold text-blue-900">{user.name}</div>
        <div className="text-gray-500">{user.email}</div>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Profile</button>
      </div>
    </div>
  );
}
