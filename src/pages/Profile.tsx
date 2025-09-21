import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, userProfile } = useAuth();

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      <h2 className="text-white text-2xl mb-6">Your Profile</h2>
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="h-56 bg-gray-800"></div>
        <div className="p-6 grid grid-cols-2 gap-4 text-gray-300">
          <div>
            <div className="text-gray-500 text-sm mb-1">Name</div>
            <div className="text-white">{userProfile?.firstName} {userProfile?.lastName}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">Age</div>
            <div className="text-white">{userProfile?.age ?? '—'}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">Major</div>
            <div className="text-white">{userProfile?.major ?? '—'}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">Year</div>
            <div className="text-white capitalize">{userProfile?.year ?? '—'}</div>
          </div>
          <div className="col-span-2">
            <div className="text-gray-500 text-sm mb-1">Bio</div>
            <div className="text-gray-300">{userProfile?.bio ?? 'Tell other Sun Devils about yourself!'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

