export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 px-2">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">404</h1>
      <p className="mb-4">Page not found.</p>
      <a href="/" className="text-blue-500 underline">Go Home</a>
    </div>
  );
}
