import RouterMain from "./components/routes/RouterMain";
import { store } from "./features/store";
import "./styles/style.css";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <RouterMain />
    </Provider>
  );
}

export default App;
