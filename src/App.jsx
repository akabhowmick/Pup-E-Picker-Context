import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { useDogContext } from "../src/dogs.context";
import "./fonts/RubikBubbles-Regular.ttf";

function App() {
  const { activeTab } = useDogContext();
  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      {
        <Section label={activeTab}>
          {activeTab !== "Create A Dog:" ? <Dogs /> : <CreateDogForm />}
        </Section>
      }
    </div>
  );
}

export default App;
