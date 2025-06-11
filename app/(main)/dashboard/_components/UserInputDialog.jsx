'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { CoachingExpert } from '@/services/Options';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

function UserInputDialog({ children, coachingOption }) {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

const router=useRouter();
  const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom);

  const OnClickNext = async () => {
    setLoading(true);
    try {
      const result = await createDiscussionRoom({
        topic: topic,
        coachingOption: coachingOption?.name,
        expertName: selectedExpert,
      });
      router.push('/discussion-room/' + result);

      console.log('Room created:', result);
    } catch (err) {
      console.error('Failed to create room:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{coachingOption.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-3 space-y-6">
          <h2 className="text-black text-base">
            Enter a topic to master your skills in {coachingOption.name}
          </h2>

          <Textarea
            placeholder="Enter your topic here..."
            onChange={(e) => setTopic(e.target.value)}
          />

          <h2 className="text-black mt-5 text-base">Select your coaching expert</h2>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            {CoachingExpert.map((expert, index) => (
              <div
                key={index}
                onClick={() => setSelectedExpert(expert.name)}
                className={`p-1 rounded-2xl cursor-pointer transition-all ${
                  selectedExpert === expert.name ? 'border-2 border-blue-500' : ''
                }`}
              >
                <Image
                  className="rounded-2xl h-[80px] w-[80px] object-cover mx-auto hover:scale-105 transition-all"
                  src={expert.avatar}
                  alt={expert.name}
                  width={80}
                  height={80}
                />
                <h3 className="text-sm mt-2 text-center">{expert.name}</h3>
              </div>
            ))}
          </div>

          <div className="flex gap-5 justify-end mt-5">
            <DialogClose asChild>
              <Button variant={'ghost'}>Cancel</Button>
            </DialogClose>

            <Button
              onClick={OnClickNext}
              disabled={!topic || !selectedExpert || loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin w-4 h-4" />
                  Creating...
                </div>
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UserInputDialog;
