import { useState, useRef, useOptimistic } from "react";
import { MessageThreadProps } from "../../../model/MessageThread";

const deliverMessage = async (message: string): Promise<string> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  return message;
};

export const MessageThread = () => {
  const [messages, setMessages] = useState<MessageThreadProps>([
    { text: "", sending: false },
  ]);
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      { text: newMessage, sending: true },
    ]
  );

  const formAction = async (formData: FormData) => {
    const message = formData.get("message") as string;

    setOptimisticMessages(message);

    if (formRef.current) {
      formRef.current.reset();
    }

    const deliveredMessage = await deliverMessage(message);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: deliveredMessage, sending: false },
    ]);
  };

  return (
    <div>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
