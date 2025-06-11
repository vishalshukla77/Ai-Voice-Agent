'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import { CoachingExpert } from '@/services/Options';
import { api } from '@/convex/_generated/api';
import { UserButton } from '@stackframe/stack';
import { Button } from '@/components/ui/button';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { AIModel } from '@/services/GlobalServices';

function DiscussionRoom() {
  const { roomid } = useParams();
  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomid,
  });

  const [expert, setExpert] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState([]);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (DiscussionRoomData) {
      const Expert = CoachingExpert.find(
        (item) => item.name === DiscussionRoomData.expertName
      );
      setExpert(Expert);
    }
  }, [DiscussionRoomData]);

  useEffect(() => {
    if (transcript.trim()) {
      setConversation((prev) => [
        ...prev,
        { role: 'user', content: transcript },
      ]);
    }
  }, [transcript]);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
    setResponse('');
  };

  const stopListening = async () => {
    SpeechRecognition.stopListening();
    setIsListening(false);

    if (transcript.trim() && DiscussionRoomData?.coachingOption) {
      try {
        const aiResponse = await AIModel(
          DiscussionRoomData.topic,
          DiscussionRoomData.coachingOption,
          transcript
        );

        // 🔍 Logging user input and AI response to the console
        console.log("Transcript from mic:", transcript);
        console.log("AI response:", aiResponse);

        setResponse(aiResponse);
        setConversation((prev) => [
          ...prev,
          { role: 'assistant', content: aiResponse },
        ]);
      } catch (error) {
        console.error('AIModel error:', error);
      }
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div className="-mt-12">
      <h2 className="text-lg font-bold">
        {DiscussionRoomData?.coachingOption}
      </h2>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Video/Audio Section */}
        <div className="lg:col-span-2">
          <div className="h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative">
            {expert?.avatar && (
              <Image
                className="h-[80px] w-[80px] rounded-full object-center"
                src={expert.avatar}
                alt="avatar"
                width={200}
                height={200}
              />
            )}
            <h2 className="text-gray-500">{expert?.name}</h2>
            <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10">
              <UserButton />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center">
            {!isListening ? (
              <Button onClick={startListening}>Start Listening</Button>
            ) : (
              <Button onClick={stopListening} variant="destructive">
                Stop Listening
              </Button>
            )}
          </div>
        </div>

        {/* Chat/Transcript Section */}
        <div>
          <div className="h-[60vh] bg-secondary border rounded-4xl p-4 overflow-auto">
            <h2 className="font-semibold mb-2">Conversation</h2>
            {conversation.map((msg, idx) => (
              <p key={idx} className="text-gray-800 mb-2">
                <strong>{msg.role === 'user' ? 'You' : 'Coach'}:</strong>{' '}
                {msg.content}
              </p>
            ))}
          </div>

          <h2 className="mt-4 text-gray-400 text-sm">
            At the end of your conversation we will automatically generate
            feedback/notes from your conversation.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default DiscussionRoom;
