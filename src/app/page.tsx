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

export default function Home() {
  return (
    <div className="flex-col justify-between items-center h-screen">
      <div className="row m-10">
        <Card>
          <CardHeader>
            <CardTitle>Ethan Wiegert</CardTitle>
            <CardDescription>Ask me anything</CardDescription>
          </CardHeader>
          <CardContent>
            <p>A chat bot as if you were talking to me.  Focused on my background and personal projects.</p>
          </CardContent>
          <CardFooter>
            <p>Thank you for visiting my website!</p>
          </CardFooter>
        </Card>
      </div>
      <div className="row m-10">
        <Textarea placeholder="Ask me anything here..." className="w-full" />
      </div>
    </div>
  );
}
