import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import InvoicePage from "./pages/Invoice/InvoicePage";
import CreateInvoice from "./components/Invoice/CreateInvoice";
import OrderPage from "./pages/Order/OrderPage";
import Navbar from "./components/App/Navbar/Navbar";
import Footer from "./components/App/Footer/Footer";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/dashboard" Component={DashboardPage} />
        <Route path="/invoices" Component={InvoicePage} />
        <Route path="/invoices/create" Component={CreateInvoice} />
        <Route path="/orders" Component={OrderPage} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
