import { useState } from "react";
import ProductList from "./features/productList/ProductList";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProductList />
    </>
  );
}

export default App;
