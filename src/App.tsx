import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

type Message = {
    sender: "user" | "ai";
    text: string;
};

type Conversation = {
    id: number;
    title: string;
    messages: Message[];
};

function App() {
    const [message, setMessage] = useState("");

    const [conversations, setConversations] =
        useState<Conversation[]>(() => {
            const savedConversations =
                localStorage.getItem("conversations");

            if (savedConversations) {
                return JSON.parse(savedConversations);
            }

            return [];
        });

    const [activeConversationId, setActiveConversationId] = useState<
        number | null
        >(null);

    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        localStorage.setItem(
            "conversations",
            JSON.stringify(conversations)
        );
    }, [conversations]);

    const activeConversation = conversations.find(
        (conversation) =>
            conversation.id === activeConversationId
    );
    function generateAIResponse(): string {
        return "This is a temporary AI response.";
    }
    function sendMessage() {
        if (message.trim() === "") {
            return;
        }

        let conversationId = activeConversationId;

        if (conversationId === null) {
            const newConversation: Conversation = {
                id: Date.now(),
                title: message,
                messages: [],
            };

            setConversations((previousConversations) => [
                ...previousConversations,
                newConversation,
            ]);

            conversationId = newConversation.id;

            setActiveConversationId(conversationId);
        }

        const userMessage: Message = {
            sender: "user",
            text: message,
        };

        setConversations((previousConversations) =>
            previousConversations.map((conversation) => {
                if (conversation.id === conversationId) {
                    return {
                        ...conversation,

                        title:
                            conversation.messages.length === 0
                                ? message
                                : conversation.title,

                        messages: [
                            ...conversation.messages,
                            userMessage,
                        ],
                    };
                }

                return conversation;
            })
        );

        setMessage("");
        setIsTyping(true);
        setTimeout(() => {
            const aiMessage: Message = {
                sender: "ai",
                text: generateAIResponse(),
            };

            setConversations((previousConversations) =>
                previousConversations.map((conversation) => {
                    if (conversation.id === conversationId) {
                        return {
                            ...conversation,
                            messages: [
                                ...conversation.messages,
                                aiMessage,
                            ],
                        };
                    }

                    return conversation;
                })
            );

            setIsTyping(false);
        }, 500);
    }

     
    function createNewChat() {
        const newConversation: Conversation = {
            id: Date.now(),
            title: "New Conversation",
            messages: [],
        };

        setConversations((previousConversations) => [
            ...previousConversations,
            newConversation,
        ]);

        setActiveConversationId(newConversation.id);

        setMessage("");
    }

    return (
        <div className="app">

            <Sidebar
                conversations={conversations}
                activeConversationId={activeConversationId}
                onNewChat={createNewChat}
                onSelectConversation={setActiveConversationId}
            />

            <main className="chat-area">

                <ChatHeader title="New Conversation" />

                <section className="messages">
                    <MessageList
                        messages={activeConversation?.messages ?? []}
                        isTyping={isTyping}
                    />
                </section>

                <MessageInput
                    message={message}
                    setMessage={setMessage}
                    onSend={sendMessage}
                />

            </main>

        </div>
    );
}

export default App;