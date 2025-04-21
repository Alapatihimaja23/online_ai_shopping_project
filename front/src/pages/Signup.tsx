import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Signup successful!');
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
      setSuccess('Signed up with Google!');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-2 sm:p-4">
      <Card className="w-full max-w-xs sm:max-w-sm shadow-md rounded-lg overflow-hidden">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-lg sm:text-xl text-center text-gray-800">Create your AI Shop account</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-5 pb-5">
          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
          </form>
          <Button onClick={handleGoogleSignIn} variant="outline" className="w-full flex items-center justify-center gap-2 mt-2">
            <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.21 9.24 3.2l6.93-6.93C36.35 1.97 30.51 0 24 0 14.84 0 6.74 5.24 2.69 13.09l8.06 6.26C12.46 13.24 17.77 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.21-.41-4.73H24v9.01h12.44c-.54 2.88-2.15 5.33-4.57 6.99l7.04 5.48C43.74 37.34 46.1 31.45 46.1 24.55z"/><path fill="#FBBC05" d="M10.75 28.13c-1.04-3.12-1.04-6.49 0-9.61l-8.06-6.26C.89 16.01 0 19.4 0 23c0 3.6.89 7 2.69 10.02l8.06-6.26z"/><path fill="#EA4335" d="M24 46c6.51 0 12.35-2.17 16.47-5.93l-7.04-5.48c-1.98 1.33-4.51 2.13-7.43 2.13-6.23 0-11.54-3.74-13.25-8.85l-8.06 6.26C6.74 42.76 14.84 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
            Sign up with Google
          </Button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
          <p className="text-center text-xs text-gray-500 mt-3">
            Already have an account? <span className="text-blue-600 cursor-pointer font-medium" onClick={() => navigate("/auth")}>Sign in</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
