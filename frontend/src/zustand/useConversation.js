import { create } from "zustand";

// This is the global state for the app like authcontext.
const useConverSation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConverSation;
