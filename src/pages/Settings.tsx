import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      <h2 className="text-white text-2xl mb-6">Settings</h2>
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-white text-lg mb-3">Account</h3>
            <div className="bg-black/40 rounded-lg border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white">{user?.email}</div>
                </div>
                <span className="text-xs bg-green-500 text-black px-2 py-1 rounded">Verified</span>
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-white text-lg mb-3">Discovery Preferences</h3>
            <div className="text-gray-400">Coming soon</div>
          </section>
        </div>
      </div>
    </div>
  );
}

