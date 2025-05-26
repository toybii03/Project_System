import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(res.data);
  };

  const createProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "/products",
        { name, price, stock },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchProducts();
      setName("");
      setPrice();
      setStock();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Product Management</h2>

        <div className="card p-3 mt-4">
          <h5>Add New Product</h5>
          <input
            className="form-control mt-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control mt-2"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
          <input
            className="form-control mt-2"
            placeholder="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(+e.target.value)}
          />
          <button className="btn btn-success mt-3" onClick={createProduct}>
            Add Product
          </button>
        </div>

        <table className="table table-bordered table-striped mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>₱{prod.price.toFixed(2)}</td>
                <td>{prod.stock}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(prod.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
