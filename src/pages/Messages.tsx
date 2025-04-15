
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { ConversationList } from "@/components/messaging/conversation-list";
import { MessageThread } from "@/components/messaging/message-thread";
import { users } from "@/data/mockData";

export default function Messages() {
  const { userId } = useParams<{ userId: string }>();
  const [currentUser, setCurrentUser] = useState(users[0]); // Mock the current user
  const [activeUser, setActiveUser] = useState<typeof users[0] | null>(null);

  useEffect(() => {
    if (userId) {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setActiveUser(user);
      }
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-4">
        <div className="border rounded-lg overflow-hidden flex h-[calc(100vh-10rem)]">
          <ConversationList
            activeUserId={activeUser?.id}
            userId={currentUser.id}
            className="border-r"
          />
          
          {activeUser ? (
            <MessageThread
              currentUser={currentUser}
              otherUser={activeUser}
              className="flex-1"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Select a conversation or start a new message
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
