import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter"
import { GlobalContextProvider } from "./store/GlobalContextProvider ";


function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
          <AppRouter />
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App
