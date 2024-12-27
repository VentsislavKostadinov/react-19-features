import "./App.css";
import { ChangeName } from "./components/actions/useActionState/ChangeName";
import { UpdateName } from "./components/actions/useTransition/UpdateName";

function App() {
  return (
    <>
    <code>useTransition() hook</code>
     <UpdateName />
     <code>useActionState() hook</code>
     <ChangeName />
    </>
  )
}

export default App;
