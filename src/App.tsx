import { Provider } from "react-redux";
import store from "./stories/store";
import InboxScreen from "./stories/InboxScreen";

function App() {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}

export default App;
