type MessageInputProps = {
    message: string;
    setMessage: (message: string) => void;
    onSend: () => void;
};

function MessageInput({
    message,
    setMessage,
    onSend,
}: MessageInputProps) {

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (event.key === "Enter") {
            onSend();
        }
    }

    return (
        <div className="input-area">

            <input
                type="text"
                placeholder="Message your AI..."
                value={message}
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
                onKeyDown={handleKeyDown}
            />

            <button
                className="send-button"
                onClick={onSend}
            >
                Send
            </button>

        </div>
    );
}

export default MessageInput;
