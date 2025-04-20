import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  // TODO: Implement real auth logic
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-2 sm:p-4">
      <Card className="w-full max-w-xs sm:max-w-sm shadow-md rounded-lg overflow-hidden">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-lg sm:text-xl text-center text-gray-800">Sign in to AI Shop</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-5 pb-5">
          <Button variant="outline" size="sm" className="flex items-center gap-2 justify-center text-sm h-9">
            <GoogleIcon fontSize="small" /> Sign in with Google
          </Button>
          <div className="flex items-center gap-2 my-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <input className="border rounded px-3 py-1.5 text-sm h-9" type="email" placeholder="Email" />
          <input className="border rounded px-3 py-1.5 text-sm h-9" type="password" placeholder="Password" />
          <Button size="sm" className="w-full h-9 text-sm bg-blue-600 hover:bg-blue-700">Sign In</Button>
          <p className="text-center text-xs text-gray-500 mt-1">
            Don&apos;t have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
