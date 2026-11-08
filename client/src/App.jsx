import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import { DebtorProfiles } from "./pages/DebtorProfiles.jsx";
import DebtorProfile from "./pages/DebtorProfile.jsx";
import AddDebt from "./pages/AddDebt.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/debtor-profiles" element={<DebtorProfiles />} />
        <Route path="/debtor" element={<DebtorProfile />} />
        <Route path="/add-debt" element={<AddDebt/>} />
      </Routes>
    </>
  );
}

export default App;
