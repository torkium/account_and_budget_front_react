import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./context/AppContext";
import RoutingApp from "./RoutingApp";

function App() {
  return (
    <Router>
      <AppProvider>
        <RoutingApp />
      </AppProvider>
    </Router>
  );
}

export default App;
