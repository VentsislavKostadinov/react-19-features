import "./App.css";
import { ChangeName } from "./components/actions/useActionState/ChangeName";
import { InputUsername } from "./components/actions/useFormState/InputUsername";
import { UpdateName } from "./components/actions/useTransition/UpdateName";

function App() {
  return (
    <>
    <code>useTransition() hook</code>
     <UpdateName />
     <code>useActionState() hook</code>
     <ChangeName />
     <code>useFormStatus() hook</code>
     <InputUsername />
    </>
  )
}

export default App;
