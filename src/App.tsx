import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Pages
import Approvals from './pages/admin/Approvals';
import CreateOperator from './pages/admin/CreateOperator';
import Dashboard from './pages/admin/Dashboard';
import FlightFilter from './pages/admin/FlightFilter';
import FlightList from './pages/admin/FlightList';
import Users from './pages/admin/Users';

// Customer Pages
import BookingConfirmation from './pages/customer/booking-confirmation';
import CustomerSidebar from './pages/customer/customer-sidebar';
import MyBookings from './pages/customer/my-bookings';
import SearchFlight from './pages/customer/search-flight';
import SelectedFlight from './pages/customer/selected-flight';

// Operator Pages
import AddFlight from './pages/operator/add-flight';
import BookingCard from './pages/operator/booking-card';
import Bookings from './pages/operator/bookings';
import OperatorDashboard from './pages/operator/dashboard';
import FlightCard from './pages/operator/flight-card';
import FlightManagement from './pages/operator/FlightManagement';
import Flights from './pages/operator/flights';
import OperatorSidebar from './pages/operator/operator-sidebar';
import ReportCard from './pages/operator/report-card';
import Reports from './pages/operator/reports';
import UpdateFlight from './pages/operator/update-flight';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>

        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/approvals" element={<Approvals />} />
        <Route path="/admin/create-operator" element={<CreateOperator />} />
        <Route path="/admin/flight-filter" element={<FlightFilter />} />
        <Route path="/admin/flight-list" element={<FlightList />} />
        <Route path="/admin/users" element={<Users />} />

        {/* Customer Routes */}
        <Route path="/customer/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/customer/sidebar" element={<CustomerSidebar />} />
        <Route path="/customer/my-bookings" element={<MyBookings />} />
        <Route path="/customer/search-flight" element={<SearchFlight />} />
        <Route path="/customer/selected-flight" element={<SelectedFlight />} />

        {/* Operator Routes */}
        <Route path="/operator/add-flight" element={<AddFlight />} />
        {/* <Route path="/operator/booking-card" element={<BookingCard />} /> */}
        <Route path="/operator/bookings" element={<Bookings />} />
        <Route path="/operator/dashboard" element={<OperatorDashboard />} />
        {/* <Route path="/operator/flight-card" element={<FlightCard />} /> */}
        <Route path="/operator/flight-management" element={<FlightManagement />} />
        <Route path="/operator/flights" element={<Flights />} />
        <Route path="/operator/sidebar" element={<OperatorSidebar />} />
        {/* <Route path="/operator/report-card" element={<ReportCard />} /> */}
        <Route path="/operator/reports" element={<Reports />} />
        <Route path="/operator/update-flight" element={<UpdateFlight />} />

      </Routes>
    </Router>
  );
}

export default App;
