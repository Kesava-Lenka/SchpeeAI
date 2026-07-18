type ChatHeaderProps = {
    title: string;
};

function ChatHeader({ title }: ChatHeaderProps) {
    return (
        <header className="chat-header">
            <h2>{title}</h2>
        </header>
    );
}

export default ChatHeader;
