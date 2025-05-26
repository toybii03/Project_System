import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
  discount: number;
};

export default function Transactions() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [receiptUrl, setReceiptUrl] = useState<string>("");

  useEffect(() => {
    axios.get("/products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = (product: Product) => {
    const exists = cart.find((item) => item.product.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1, discount: 0 }]);
    }
  };

  const updateQuantity = (id: number, value: number) => {
    setCart(
      cart.map((item) =>
        item.product.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const updateDiscount = (id: number, value: number) => {
    setCart(
      cart.map((item) =>
        item.product.id === id ? { ...item, discount: value } : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity * (1 - item.discount / 100),
    0
  );

  const checkout = async () => {
    const payload = {
      items: cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        discount: item.discount,
      })),
    };

    try {
      const res = await axios.post("/transactions", payload);

      alert("Transaction complete!");
      setCart([]);
      setReceiptUrl(res.data.receipt_url);

      // Option 1: Open in a new tab
      window.open(res.data.receipt_url, "_blank");

      // Option 2 (optional): Auto-download the receipt
      // const link = document.createElement("a");
      // link.href = res.data.receipt_url;
      // link.download = `receipt_${Date.now()}.pdf`;
      // link.click();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Transaction failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Transaction</h2>

        <div className="row mt-3">
          <div className="col-md-6">
            <h5>Available Products</h5>
            {products.map((p) => (
              <div
                key={p.id}
                className="d-flex justify-content-between border p-2"
              >
                <span>
                  {p.name} - ₱{p.price.toFixed(2)}
                </span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => addToCart(p)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>

          <div className="col-md-6">
            <h5>Cart</h5>
            {cart.map((item) => (
              <div key={item.product.id} className="border p-2 mb-2">
                <strong>{item.product.name}</strong>
                <br />₱{item.product.price.toFixed(2)} x
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  className="mx-2"
                  style={{ width: "60px" }}
                  onChange={(e) =>
                    updateQuantity(item.product.id, parseInt(e.target.value))
                  }
                />
                Discount:
                <input
                  type="number"
                  value={item.discount}
                  min={0}
                  max={100}
                  className="mx-2"
                  style={{ width: "60px" }}
                  onChange={(e) =>
                    updateDiscount(item.product.id, parseInt(e.target.value))
                  }
                />
              </div>
            ))}

            <h5>Total: ₱{total.toFixed(2)}</h5>
            <button
              className="btn btn-success mt-2"
              onClick={checkout}
              disabled={cart.length === 0}
            >
              Complete Transaction
            </button>

            {receiptUrl && (
              <div className="mt-3">
                <a
                  href={receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary"
                >
                  View Receipt PDF
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
