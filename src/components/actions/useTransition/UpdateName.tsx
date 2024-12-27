import { FormEvent, useState, useTransition } from "react";
import { PostResponse } from "../../../model/PostResponse";

export const UpdateName = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [response, setResponse] = useState<PostResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            title,
            body,
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: PostResponse = await res.json();
        setResponse(data);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  };

  return (
    <div>
      <h2>Submit Post - useTransition()</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Body:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
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
