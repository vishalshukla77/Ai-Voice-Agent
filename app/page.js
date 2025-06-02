import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>
        Subscribe to guru ji
      </h2>
      <Button variant={'destructive'}>
        subscribe
      </Button>
      <UserButton/>
    </div>
    
  );
}
