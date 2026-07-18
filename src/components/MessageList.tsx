type Message = {
    sender: "user" | "ai";
    text: string;
};

type MessageListProps = {
    messages: Message[];
    isTyping: boolean;
};

function MessageList({
    messages,
    isTyping,
}: MessageListProps) {
    return (
        <div className="message-list">

            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`message ${message.sender}-message`}
                >
                    {message.text}
                </div>
            ))}

            {isTyping && (
                <div className="message ai-message typing">
                    AI is thinking...
                </div>
            )}

        </div>
    );
}

export default MessageList;