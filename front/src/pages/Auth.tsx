import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase';

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful!');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setSuccess('Signed in with Google!');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-2 sm:p-4">
      <Card className="w-full max-w-xs sm:max-w-sm shadow-md rounded-lg overflow-hidden">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-lg sm:text-xl text-center text-gray-800">Sign in to AI Shop</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-5 pb-5">
          <Button variant="outline" size="sm" className="flex items-center gap-2 justify-center text-sm h-9" onClick={handleGoogleSignIn}>
            <GoogleIcon fontSize="small" /> Sign in with Google
          </Button>
          {error && <div style={{color: 'red'}}>{error}</div>}
          {success && <div style={{color: 'green'}}>{success}</div>}
          <div className="flex items-center gap-2 my-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input className="border rounded px-3 py-1.5 text-sm h-9" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="border rounded px-3 py-1.5 text-sm h-9" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" size="sm" className="w-full h-9 text-sm bg-blue-600 hover:bg-blue-700">Sign In</Button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-3">
            Don&apos;t have an account? <span className="text-blue-600 cursor-pointer font-medium" onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
