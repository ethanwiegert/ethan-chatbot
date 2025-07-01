'use client';

import { useChat } from '@ai-sdk/react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useEffect, useRef } from 'react';


/*
left to implement (for initial functionality):
-testing and fine tuning
-improving mobile design and functionality (utilize tailwind breakpoints)
-fixing scrollbar to bottom

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
    <div className="flex flex-col mx-8 w-11/12-md py-12 h-screen text-sm md:text-lg">
      <div className="flex absolute top-0 right-0 m-8">
        <ModeToggle />
      </div>
      <div ref={chatContainerRef} className='overflow-y-scroll h-9/10'>
      {messages.length<1 ?         
      <Card>
          <CardHeader>
            <CardTitle>"EthanBot"</CardTitle>
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
        <div key={message.id} className="">
          {message.role === 'user' ? <b>You</b> : <b>EthanBot</b>}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`} id={`${message.id}`} className="py-4 m-8"><Card><CardContent>{part.text}</CardContent></Card></div>;
            }
          })}
        </div>
      ))}
      </div>
      <div className="flex absolute-bottom bottom-0 m-8 justify-center">
      <form onSubmit={handleSubmit} className='w-full'>
        <input
          className="p-6 m-4 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl w-full text-sm md:text-lg"
          value={input}
          placeholder="Ask me anything regarding Ethan Wiegert's background and work."
          onChange={handleInputChange}
          maxLength={200}
        />
      </form>
      </div>
    </div>
  );
}