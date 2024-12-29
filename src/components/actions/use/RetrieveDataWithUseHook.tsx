import { use } from "react";
import { endpoint } from "../../../utils/endpoint";
import { RetrieveSinglePost } from "../../../model/RetrieveSinglePost";

/* 
Breakdown of the Key Concepts:
1. use() Hook:

 * The use() hook is specifically designed for Server Components in React. It allows you to suspend rendering and wait for a promise to resolve, but only works in a Server Component context.
 *  Since use() is used with an async function (fetchData()), it indicates that the component is expected to run on the server side where async data fetching is allowed.
 *  If use() is used in a Client Component, React will throw an error, as it is not supported in that context.

2. Server Component:

*  If there is no 'use client' directive at the top of your file, this component will be treated as a Server Component.
* Server Components allow you to fetch data on the server side before the component is rendered, and then send the pre-rendered HTML to the client.

3. Summarize

* With use(fetchData()), your component runs on the server because you're using use() to handle the async data fetching.
* 
*/

const fetchData = (() => {
  let promise: Promise<RetrieveSinglePost> | null = null;

  return () => {
    if (!promise) {
      promise = (async () => {
        const response = await fetch(endpoint + "/1");
        if (!response.ok) {
          throw new Error("Failed to fetch data!");
        }
        return response.json() as Promise<RetrieveSinglePost>;
      })();
    }
    return promise;
  };
})();

export const RetrieveDataWithUseHook = () => {
  const post = use(fetchData());

  return (
    <div>
      <h4>{post.title}</h4>
    </div>
  );
};
