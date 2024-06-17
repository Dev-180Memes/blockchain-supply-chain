import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DashboardPage from "./pages/DashboardPage";
import InvoicePage from "./pages/InvoicePage";
import CreateInvoice from "./components/Invoice/CreateInvoice";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/dashboard" Component={DashboardPage} />
        <Route path="/invoices" Component={InvoicePage} />
        <Route path="/invoices/create" Component={CreateInvoice} />
      </Routes>
    </Router>
  )
}

export default App
