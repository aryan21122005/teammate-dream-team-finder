
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { type User, type Message, users } from "@/data/mockData";

interface ConversationListProps {
  activeUserId?: string;
  userId: string;
  className?: string;
}

interface Conversation {
  user: User;
  lastMessage: Message;
  hasUnread: boolean;
}

export function ConversationList({
  activeUserId,
  userId,
  className,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Mock function to get conversations
  useEffect(() => {
    // In a real app, this would fetch from API
    // For now, just generate from mock data
    import("@/data/mockData").then(({ messages, users }) => {
      const relevantMessages = messages.filter(
        (msg) => msg.senderId === userId || msg.recipientId === userId
      );

      const userConversations = new Map<string, Message>();

      // Get the last message for each conversation
      relevantMessages.forEach((message) => {
        const otherUserId =
          message.senderId === userId ? message.recipientId : message.senderId;
        const existingMessage = userConversations.get(otherUserId);
        
        if (
          !existingMessage ||
          new Date(message.timestamp) > new Date(existingMessage.timestamp)
        ) {
          userConversations.set(otherUserId, message);
        }
      });

      // Create conversations array
      const conversationsArray: Conversation[] = Array.from(
        userConversations.entries()
      ).map(([otherUserId, lastMessage]) => {
        const otherUser = users.find((user) => user.id === otherUserId);
        const hasUnread =
          !lastMessage.read && lastMessage.recipientId === userId;
        
        return {
          user: otherUser!,
          lastMessage,
          hasUnread,
        };
      });

      // Sort by timestamp (newest first)
      conversationsArray.sort((a, b) => {
        return new Date(b.lastMessage.timestamp).getTime() -
          new Date(a.lastMessage.timestamp).getTime();
      });

      setConversations(conversationsArray);
    });
  }, [userId]);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className={cn("w-full max-w-xs flex flex-col h-full", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {filteredConversations.length > 0 ? (
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <Link
                key={conversation.user.id}
                to={`/messages/${conversation.user.id}`}
                className={cn(
                  "flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors",
                  activeUserId === conversation.user.id && "bg-muted"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.user.avatarUrl} alt={conversation.user.name} />
                  <AvatarFallback>{getInitials(conversation.user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={cn("font-medium truncate", conversation.hasUnread && "font-bold")}>
                      {conversation.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  <p className={cn(
                    "text-sm truncate text-muted-foreground",
                    conversation.hasUnread && "text-foreground font-medium"
                  )}>
                    {conversation.lastMessage.senderId === userId ? (
                      <span className="text-muted-foreground">You: </span>
                    ) : null}
                    {conversation.lastMessage.content}
                  </p>
                </div>
                {conversation.hasUnread && (
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">No conversations</p>
          </div>
        )}
      </div>
    </div>
  );
}
