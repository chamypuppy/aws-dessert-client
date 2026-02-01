import { AppProvider } from "./providers";
import { AuthProvider } from "./providers/context/AuthContext";

function App() {
  return(
    <AuthProvider>
      <AppProvider/>
    </AuthProvider>
  );
}

export default App;