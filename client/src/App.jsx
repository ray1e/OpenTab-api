import { Route, Routes } from "react-router-dom";
import  HomePage  from "./pages/HomePage.jsx";
import { DebtorProfiles } from "./pages/DebtorProfiles.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/debtor-profiles" element={<DebtorProfiles/>}/>
      </Routes>
    </>
  );
}

export default App;
