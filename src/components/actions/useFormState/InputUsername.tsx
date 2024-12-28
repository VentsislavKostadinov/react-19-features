import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { PostResponse } from "../../../model/PostResponse";

export const InputUsername = () => {
  const [response, setResponse] = useState<PostResponse | null>(null);
  const endpoint = import.meta.env.VITE_ENDPOINT;

  const submitForm = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const userid = formData.get("userid") as string;

    try {
      const result = await fetch(endpoint + "/posts", {
        method: "POST",
        body: JSON.stringify({ title, body, userid: parseInt(userid) }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data: PostResponse = await result.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Submit Post - Async Action</h2>
      <form
        action={async (formData) => {
          await submitForm(formData);
        }}
      >
        <div>
          <label>
            Title:
            <input type="text" name="title" required />
          </label>
        </div>
        <div>
          <label>
            Body:
            <textarea name="body" required />
          </label>
        </div>
        <input type="hidden" name="userid" value="1" />
        <SubmitButton />
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
