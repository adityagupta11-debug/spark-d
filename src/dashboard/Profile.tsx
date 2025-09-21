import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { useAuth } from '../contexts/AuthContext'
import { updateUserProfile } from '../lib/auth'

interface ProfileProps {
  profile: any
}

export function Profile({ profile }: ProfileProps) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    firstName: profile?.firstName ?? '',
    lastName: profile?.lastName ?? '',
    major: profile?.major ?? '',
    year: profile?.year ?? '',
    age: profile?.age ?? '',
    bio: profile?.bio ?? '',
  })

  const handleSave = async () => {
    if (!user) return
    await updateUserProfile(user.uid, form)
    setOpen(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
        <div className="h-56 bg-gray-800">
          <img src="https://images.unsplash.com/photo-1679678690827-2f4b0280882e?q=80&w=1600&auto=format&fit=crop" alt="cover" className="w-full h-full object-cover" />
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <div className="text-gray-400">Name</div>
            <div className="text-white text-xl">{profile?.firstName || 'Your'} {profile?.lastName || 'Name'}</div>
            <div className="text-gray-400 mt-4">Major</div>
            <div className="text-white">{profile?.major || 'Your Major'}</div>
          </div>
          <div>
            <div className="text-gray-400">Age</div>
            <div className="text-white text-xl">{profile?.age || '20'}</div>
            <div className="text-gray-400 mt-4">Year</div>
            <div className="text-white">{profile?.year || 'Sophomore'}</div>
          </div>
          <div className="col-span-2">
            <div className="text-gray-400">Bio</div>
            <p className="text-gray-300 mt-1">{profile?.bio || "Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?"}</p>
          </div>

          <div className="col-span-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-black">Edit</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input value={form.firstName} placeholder="First name" onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                    <Input value={form.lastName} placeholder="Last name" onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input value={form.major} placeholder="Major" onChange={(e) => setForm({ ...form, major: e.target.value })} />
                    <Input value={form.year} placeholder="Year" onChange={(e) => setForm({ ...form, year: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input value={form.age} placeholder="Age" onChange={(e) => setForm({ ...form, age: e.target.value })} />
                  </div>
                  <Textarea value={form.bio} placeholder="Your bio" className="min-h-[120px]" onChange={(e) => setForm({ ...form, bio: e.target.value })} />
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-black" onClick={handleSave}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

