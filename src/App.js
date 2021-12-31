import "./App.css";
import { Container } from "@mui/material";
import TopBar from "./components/TopBar";
import ContentMasonry from "./components/ContentMasonry";

function App() {
  return (
    <div className="App">
      <Container>
        <TopBar />
        <ContentMasonry />
      </Container>
    </div>
  );
}

export default App;
