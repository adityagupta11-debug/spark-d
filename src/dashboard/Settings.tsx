import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Switch } from '../components/ui/switch'
import { Slider } from '../components/ui/slider'

export function Settings() {
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 25])
  const [showVerified, setShowVerified] = useState(true)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h3 className="text-white text-xl mb-4">Account</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <div>
            <div className="text-gray-400 text-sm">Email</div>
            <div>user@asu.edu</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Phone Number</div>
            <div className="inline-flex items-center gap-2">
              <span>+1 (480) 555-0123</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-green-500 text-black">Verified</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="outline">Manage Photos</Button>
          <Button variant="outline">Edit Profile Info</Button>
        </div>
      </section>

      <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h3 className="text-white text-xl mb-4">Discovery Preferences</h3>
        <div className="space-y-5">
          <div>
            <div className="text-gray-300 mb-2">Age Range: <span className="text-white">{ageRange[0]} - {ageRange[1]}</span></div>
            <Slider value={ageRange} min={18} max={30} step={1} onValueChange={(v) => setAgeRange(v as [number, number])} />
          </div>
          <label className="flex items-center justify-between">
            <span className="text-gray-300">Show only verified profiles</span>
            <Switch checked={showVerified} onCheckedChange={(v) => setShowVerified(!!v)} />
          </label>
        </div>
      </section>

      <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h3 className="text-white text-xl mb-4">Support</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="outline">Help Center</Button>
          <Button variant="outline">Report a Problem</Button>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </section>
    </div>
  )
}

