import "./App.css";
import RouterConfig from "./route/RouterConfig";
import Container from "@mui/material/Container";

function App() {
  return (
    <div>
      <Container maxWidth="md">
        <RouterConfig />
      </Container>
    </div>
  );
}

export default App;
