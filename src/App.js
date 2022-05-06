import { useState } from "react";
import PdfViewerComponent from "./components/PdfViewerComponent";
import "./App.css";

function App() {
  const [document, setDocument] = useState("http://localhost:8099//SecuredStorage/Content/35cd0d03-857c-4cb1-bbb5-d6cf63a11326/fc243e04-9d4b-4ff7-81d1-58e2de932f7d/72b417ba-6c8a-4caf-a2b6-a4ae719513a2/332639ef-c7d3-477e-8f99-62781bbbf873.pdf");

  const handleOpen = () => setDocument("another-example.pdf");

  return (
    <div className="App">
      <button className="App-button" onClick={handleOpen}>
        Open another document
      </button>
      <div className="App-viewer">
        <PdfViewerComponent document={document} />
      </div>
    </div>
  );
}

export default App;
