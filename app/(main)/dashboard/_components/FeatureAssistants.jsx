"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUser } from '@stackframe/stack';
import { CoachingOptions} from '@/services/Options';
import { BlurFade } from '@/components/magicui/blur-fade';
import UserInputDialog from './UserInputDialog';


function FeatureAssistants() {
  const user = useUser();

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-medium text-gray-500'>My Workspace</h2>
          <h2 className='text-3xl font-bold'>
            Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!
          </h2>
        </div>
        <Button>Profile</Button>
      </div>

      <div className='grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10 mt-10'>
        {CoachingOptions.map((option, index) => (
                 <BlurFade key={option.icon} delay={0.25 + index * 0.05} inView>
                   <div key={index} className='p-3 bg-secondary rounded-3xl flex flex-col justify-center item'>
                  <UserInputDialog coachingOption={option}>

                   <div key={index} className='flec flex-col justify-center items-center'>
                 
      
            <Image className='h-[70px] w-[70px] cursor-pointer transition-all  hover:scale-105' src={option.icon} alt={option.name} width={150} height={150} />
            <h2 className='mt-2'>{option.name}</h2>
          </div>
          </UserInputDialog>
          </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default FeatureAssistants;
