import { useState, useRef, useEffect } from "react";
import { useRoute } from "wouter";
import { useListChatMessages, useSendChatMessage, useGetCaregiver, getListChatMessagesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Send, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Chat() {
  const [match, params] = useRoute("/chat/:room");
  const room = params?.room || "";
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [text, setText] = useState("");

  const { data: messages, isLoading } = useListChatMessages(room, {
    query: {
      enabled: !!room,
      refetchInterval: 2000,
      queryKey: getListChatMessagesQueryKey(room)
    }
  });

  const { data: caregiver } = useGetCaregiver(room);

  const sendMsg = useSendChatMessage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    sendMsg.mutate({
      room,
      data: { author: "Famiglia", text: text.trim() }
    }, {
      onSuccess: () => {
        setText("");
        queryClient.invalidateQueries({ queryKey: getListChatMessagesQueryKey(room) });
      }
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] pt-16 bg-muted/10">
      <div className="bg-card border-b p-4 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {caregiver ? (
            <Avatar style={{ backgroundColor: caregiver.avatarColor }}>
              <AvatarFallback className="text-white font-medium bg-transparent">
                {getInitials(caregiver.name)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
            </Avatar>
          )}
          <div>
            <h2 className="font-bold">{caregiver?.name || "Caregiver"}</h2>
            <p className="text-xs text-primary flex items-center gap-1">
              <Shield className="h-3 w-3" /> Chat Sicura
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground bg-muted inline-block px-3 py-1 rounded-full">
            Tutte le comunicazioni sono crittografate end-to-end.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-4">Caricamento messaggi...</div>
        ) : (
          messages?.map((msg) => {
            const isMe = msg.author === "Famiglia";
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                  isMe 
                    ? "bg-primary text-primary-foreground rounded-br-sm" 
                    : "bg-card border rounded-bl-sm"
                }`}>
                  {!isMe && <div className="text-xs font-bold mb-1 opacity-70">{msg.author}</div>}
                  <p className="text-sm">{msg.text}</p>
                  <div className={`text-[10px] mt-1 text-right ${isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-card border-t shrink-0">
        <form onSubmit={handleSend} className="flex gap-2 max-w-4xl mx-auto">
          <Input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Scrivi un messaggio..." 
            className="flex-1 rounded-full h-12"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-12 w-12 rounded-full shrink-0"
            disabled={sendMsg.isPending || !text.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
