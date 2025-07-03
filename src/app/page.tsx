'use client';

import { useChat } from '@ai-sdk/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useEffect, useRef } from 'react';
import {Spinner} from "@heroui/spinner";

/*
future
-adding in more 'tools' for the ai
  *sending me an email of a question that it was unable to answer
*/

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(messages.length>0)
      {
      const element=chatContainerRef.current
        if(element != null)
        {
          element.scrollTop = element.scrollHeight;  
        }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen text-sm md:text-lg">
      <div className="flex absolute top-0 right-0 m-4">
        <ModeToggle />
      </div>
      <div ref={chatContainerRef} className='overflow-y-scroll h-9/10 py-8 m-12'>
      {messages.length<1 ?         
      <Card>
          <CardHeader>
            <CardTitle>EthanBot <br/><Spinner color="success"/></CardTitle>
            <CardDescription>As if you were talking to me</CardDescription>
          </CardHeader>
          <CardContent>
            <p>An AI model trained on my qualifications and background, that is eager to answer your questions! </p>
            <br/>
            <p>Technologies - Next.js, shadcn, Vercel AI SDK, Open AI</p>
          </CardContent>
          <CardFooter>
            <p>Thanks for visiting!</p>
          </CardFooter>
        </Card> : null}
      {messages.map(message => (
        <div key={message.id} >
          {message.role === 'user' ? <b>You</b> : <b>EthanBot</b>}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`} id={`${message.id}`} className="pb-4 m-4"><Card><CardContent>{part.text}</CardContent></Card></div>;
            }
          })}
          {(messages.length%2)>0 ? <Spinner/> : null }
        </div>
      ))}
      </div>
      <div className="flex absolute-bottom bottom-0 m-8 justify-center align-center">
      <form onSubmit={handleSubmit} className='w-full'>
        <input
          className="p-6 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl w-full text-xs md:text-lg"
          value={input}
          placeholder="Ask me about Ethan's background."
          onChange={handleInputChange}
          maxLength={200}
        />
      </form>
      </div>
    </div>
  );
}