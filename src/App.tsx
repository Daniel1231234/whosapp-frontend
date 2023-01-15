import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter"
import AuthContextProvider from "./store/AuthContext";
import { GlobalContextProvider } from "./store/GlobalContextProvider ";


function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <GlobalContextProvider>
          <AppRouter />
      </GlobalContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App
