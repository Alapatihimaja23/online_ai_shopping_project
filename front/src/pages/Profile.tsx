
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../auth/useCurrentUser';

export default function Profile() {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    // Not signed in, redirect to signup
    navigate('/signup');
    return null;
  }

  const name = user.displayName || 'No Name';
  const email = user.email || 'No Email';
  const avatar = user.photoURL || 'https://randomuser.me/api/portraits/women/68.jpg';

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 sm:py-12 px-2 sm:px-0">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-md">
        <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full shadow mb-2" />
        <div className="text-xl sm:text-2xl font-bold text-blue-900">{name}</div>
        <div className="text-gray-500">{email}</div>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => navigate('/products')}>Start Shopping...</button>
      </div>
    </div>
  );
}
