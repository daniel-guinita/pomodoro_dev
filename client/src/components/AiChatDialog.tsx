"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineMessage } from "react-icons/md";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function AiChatDialog() {
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
  ]);

  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-primary lg:w-[50px] lg:h-[50px] lg:rounded-full lg:flex lg:justify-center lg:items-center opacity-30 hover:opacity-100 transition-opacity duration-300">
          <MdOutlineMessage className="lg:w-[25px] lg:h-[25px] text-primary-foreground" />
        </div>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Chatbot</DialogTitle>
          <Separator />
          <DialogDescription>
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" alt="Image" />
                    <AvatarFallback>CB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">Chatbot</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                        message.role === "user"
                          ? "ml-auto bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (inputLength === 0) return;
                    setMessages([
                      ...messages,
                      {
                        role: "user",
                        content: input,
                      },
                    ]);
                    setInput("");
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    id="message"
                    placeholder="Type your message..."
                    className="flex-1"
                    autoComplete="off"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={inputLength === 0}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
