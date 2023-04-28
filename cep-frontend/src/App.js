import './App.css';
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import CompilePage from "./pages/CompilePage";

function App() {
  return (
    <>
      {/* <div className="App"> */}
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#42ef84',
              },
            },
          }}
        ></Toaster>
      </div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/editor/:roomId"
          element={<EditorPage />}
        ></Route>
        <Route path="/editor/run" element={<CompilePage />} />

        {/* <Route path="/pdf-viewer" element={<PdfViewer/>} /> */}
      </Routes>
    </>
  );
}

export default App;
