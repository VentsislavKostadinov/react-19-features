import { Suspense } from "react";
import "./App.css";
import { RetrieveDataWithUseHook } from "./components/actions/use/RetrieveDataWithUseHook";
import { ToggleTheme } from "./components/actions/use/ToggleTheme";
import { ChangeName } from "./components/actions/useActionState/ChangeName";
import { InputUsername } from "./components/actions/useFormState/InputUsername";
import { MessageThread } from "./components/actions/useOptimistic/InputUsernameOptimistic";
import { UpdateName } from "./components/actions/useTransition/UpdateName";

function App() {
  return (
    <>
    <code>useTransition() hook</code>
     <UpdateName />
     <br/>
     <code>useActionState() hook</code>
     <ChangeName />
     <br/>
     <code>useFormStatus() hook</code>
     <InputUsername />
     <br/>
     <code>useOptimistic() hook</code>
     <MessageThread />
     <br />
     <code>use() hook</code>
     <ToggleTheme />
     <br />
     <Suspense fallback={<div>Loading...</div>}>
      <RetrieveDataWithUseHook />
    </Suspense>
    </>
  )
}

export default App;
