import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Search from './components/Search';
import Home from './components/Home';
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
      <Header>

      </Header>
      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
