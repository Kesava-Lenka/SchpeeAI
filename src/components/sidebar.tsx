type Conversation = {
    id: number;
    title: string;
    messages: unknown[];
};

type SidebarProps = {
    conversations: Conversation[];
    activeConversationId: number | null;
    onNewChat: () => void;
    onSelectConversation: (id: number) => void;
};

function Sidebar({
    conversations,
    activeConversationId,
    onNewChat,
    onSelectConversation,
}: SidebarProps) {
    return (
        <aside className="sidebar">
            <h1>My AI</h1>

            <button
                className="new-chat-button"
                onClick={onNewChat}
            >
                + New Chat
            </button>

            <div className="chat-list">

                {conversations.map((conversation) => (
                    <button
                        key={conversation.id}
                        className={
                            conversation.id === activeConversationId
                                ? "conversation active"
                                : "conversation"
                        }
                        onClick={() => {
                            onSelectConversation(conversation.id);
                        }}
                    >
                        {conversation.title}
                    </button>
                ))}

            </div>
        </aside>
    );
}

export default Sidebar;