import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  // TODO: Implement real signup logic
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-2 sm:p-4">
      <Card className="w-full max-w-xs sm:max-w-sm shadow-md rounded-lg overflow-hidden">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-lg sm:text-xl text-center text-gray-800">Create your AI Shop account</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-5 pb-5">
          <input className="border rounded px-3 py-1.5 text-sm h-9" type="email" placeholder="Email" />
          <input className="border rounded px-3 py-1.5 text-sm h-9" type="password" placeholder="Password" />
          <input className="border rounded px-3 py-1.5 text-sm h-9" type="password" placeholder="Confirm Password" />
          <Button size="sm" className="w-full h-9 text-sm bg-blue-600 hover:bg-blue-700">Sign Up</Button>
          <p className="text-center text-xs text-gray-500 mt-1">
            Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/auth")}>Sign in</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
