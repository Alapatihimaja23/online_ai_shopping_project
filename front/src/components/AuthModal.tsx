import React, { useState } from "react";
import { Modal } from "./ui/Modal";
import Signup from "../pages/Signup";
import Auth from "../pages/Auth";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-[340px] p-0 sm:p-2 mx-auto">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l ${tab === 'signin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 rounded-r ${tab === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('signup')}
          >
            Sign Up
          </button>
        </div>
        {tab === 'signin' ? <Auth /> : <Signup />}
      </div>
    </Modal>
  );
};
