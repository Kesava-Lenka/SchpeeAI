type Message = {
    sender: "user" | "ai";
    text: string;
};

type MessageListProps = {
    messages: Message[];
};

function MessageList({ messages }: MessageListProps) {
    if (messages.length === 0) {
        return (
            <div className="welcome-message">
                <h1>How can I help?</h1>
                <p>This is your personal AI assistant.</p>
            </div>
        );
    }

    return (
        <div className="message-list">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`message ${message.sender}`}
                >
                    <div className="message-label">
                        {message.sender === "user" ? "You" : "AI"}
                    </div>

                    <div className="message-text">
                        {message.text}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessageList;
