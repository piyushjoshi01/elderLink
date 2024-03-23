import React, { useEffect, useRef, useState } from 'react';

const Chat = () => {
    const accessToken = localStorage.getItem("accessToken");
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState<any>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const senderId = 93;
    const receiverId = 86;

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 1500); // Poll every 1.5 seconds

        return () => clearInterval(interval);
    }, []); // Dependency array left empty to run once on mount

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const fetchMessages = async () => {
        if (!accessToken) {
            console.error('Access token not found');
            return;
        }
        
        try {
            const senderResponse = await fetch(`http://localhost:8080/api/messages/${senderId}/${receiverId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!senderResponse.ok) {
                throw new Error('Failed to fetch sender messages');
            }

            const senderData = await senderResponse.json();

            const receiverResponse = await fetch(`http://localhost:8080/api/messages/${receiverId}/${senderId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!receiverResponse.ok) {
                throw new Error('Failed to fetch receiver messages');
            }

            const receiverData = await receiverResponse.json();

            const allMessages = [...senderData, ...receiverData].sort((a, b) => 
                a.localDateTime.localeCompare(b.localDateTime)
            );

            setMessages(allMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/messages/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    senderId: 93,
                    receiverId: 86,
                    messageContent
                })
            });
            console.log({response});
            

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // After sending the message, clear the input field
            setMessageContent('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
const isLogedInUser=()=>{
const userId:any=localStorage.getItem('id')
console.log("loged in user",userId);

if(userId==93){
console.log("loged");
return true;
}
console.log("reciever");

return false;
}
    console.log({messages});
    

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto flex flex-col-reverse">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">No messages</div>
                ) : (
                 <div> {  messages.map((message: { id: React.Key | null | undefined; senderId: number; messageContent: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                       
                                <p style={{textAlign:isLogedInUser() ?"left":"right",border:"1px solid black"}}>
                                {message.messageContent}
                                </p>
                          
                    )).reverse()}</div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div>
                <p style={{textAlign:"left"}}>left</p>
                <p style={{textAlign:"right"}}>right</p>
                <p></p>
            </div>
            <div className="flex items-center border-t border-gray-200 sticky bottom-0">
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    className="flex-1 px-4 py-2 focus:outline-none"
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat;
