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




/*
left to implement (for initial functionality):
-testing and fine tuning
-improving mobile design and functionality (utilize tailwind breakpoints)

future
-adding in more 'tools' for the ai
  *sending me an email of a question that it was unable to answer
*/

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();


  return (
    <div className="flex flex-col m-8 w-11/12-md py-12 ">
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
                return <div key={`${message.id}-${i}`} className="py-4"><Card><CardContent>{part.text}</CardContent></Card></div>;
            }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 p-6 m-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl w-11/12"
          value={input}
          placeholder="Ask me anything regarding Ethan Wiegert's background and work."
          onChange={handleInputChange}
          maxLength={200}
        />
      </form>
    </div>
  );
}