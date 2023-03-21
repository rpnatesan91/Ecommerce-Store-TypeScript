import ResponsiveAppBar from "./component/navbar/NavBar";
import ProductList from "./component/productList/ProductList";
import { Route, Routes } from "react-router-dom";
import DemoList from "./component/productList/DemoList";
import "./App.css";
function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/productlist" element={<ProductList />}></Route>
        <Route path="/demolist" element={<DemoList />} />
      </Routes>
    </>
  );
}

export default App;
