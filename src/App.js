import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import EditPage from '../src/pages/EditPage';
import DetailsPage from '../src/pages/DetailsPage';
import DeletePage from '../src/pages/DeletePage';
import CreatePage from '../src/pages/CreatePage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit-page/:taskId" element={<EditPage />} />
          <Route path="/details-page/:taskId" element={<DetailsPage />} />
          <Route path="/delete-page/:taskId" element={<DeletePage />} />
          <Route path="/create-page" element={<CreatePage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
