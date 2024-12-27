import { useActionState, useState } from "react";
import { PostResponse } from "../../../model/PostResponse";

export const ChangeName = () => {
  const [formData, setFormData] = useState({ title: "", body: "" });
  const endpoint = import.meta.env.VITE_ENDPOINT;

  const submitPost = async (
    title: string,
    body: string,
    prevResponse: PostResponse | null
  ): Promise<PostResponse | null> => {
    try {
      const res = await fetch(endpoint + "/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: PostResponse = await res.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return prevResponse;
    }
  };

  const [response, submitPostAction, isPending] =
    useActionState<PostResponse | null>(async (prevResponse) => {
      return await submitPost(formData.title, formData.body, prevResponse);
    }, null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Submit Post - useActionState()</h2>
      <form action={submitPostAction}>
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Body:
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      {isPending && <p>Loading...</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
