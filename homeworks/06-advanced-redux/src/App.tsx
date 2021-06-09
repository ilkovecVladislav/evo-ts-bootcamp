import PizzaListContainer from "./containers/PizzaListContainer";
import BucketContainer from "./containers/BucketContainer";

const App = () => (
  <div className="grid grid-cols-3 gap-4 h-full">
    <PizzaListContainer />
    <BucketContainer />
  </div>
);

export default App;
