import { useActionState } from "react";

interface PostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const submitPost = async (
    formData: FormData,
    prevResponse: PostResponse | null
  ): Promise<PostResponse | null> => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: formData.get("title"),
          body: formData.get("body"),
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
      return prevResponse; // Fallback to previous response if error occurs
    }
  };


export const ChangeName = () => {
  const [response, submitPostAction, isPending] =
    useActionState<PostResponse | null>(
      //@ts-ignore
      submitPost,
      null
    );


  return (
    <div>
      <h2>Submit Post - useActionState()</h2>
      <form action={submitPostAction}>
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
