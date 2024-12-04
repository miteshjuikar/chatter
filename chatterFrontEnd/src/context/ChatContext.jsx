import { createContext, useEffect, useState } from "react";
import { getRequest, baseURL, postRequest } from "../utility/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);
                try {
                    const response = await getRequest(`${baseURL}/chats/${user._id}`);
                    setIsUserChatsLoading(false);
                    if (response.error) {
                        return setUserChatsError(response.error);
                    }
                    setUserChats(response);
                } catch (error) {
                    setIsUserChatsLoading(false);
                    setUserChatsError(error.message || "An error occurred while fetching chats.");
                }
            }
        };

        if (user?._id) {
            getUserChats();
        }
    }, [user?._id]);

    return (
        <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatsError }}>
            {children}
        </ChatContext.Provider>
    );
};
