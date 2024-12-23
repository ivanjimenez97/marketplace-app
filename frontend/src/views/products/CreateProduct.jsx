import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/base/PageTitle.jsx";
import axiosClient from "../../AxiosClient.js";
import AlertMessage from "../../components/base/AlertMessage.jsx";

export default function CreateProduct() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("CURRENT_USER"));
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);

  const getData = async () => {
    try {
      setUserId(parseInt(user.id))
      console.log("UserData: ", user);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    // Required Fields
    const requiredFields = {
      name: name,
      sku: sku,
      quantity: quantity,
      price: price,
    };

    // Check if any required fields are missing or null
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key]
    );

    if (missingFields.length > 0) {
      // Set the errors with a message for each missing field.
      const errors = missingFields.reduce((acc, field) => {
        acc[field] = `The ${field.replace("_", " ")} field is required.`;
        return acc;
      }, {});

      setErrors(errors);
      setMessage(null);
      return; // Stop Submission if validation fails.
    }

    const data = {
      name: name,
      sku: sku,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      userId: userId,
    };

    console.log("Product Data: ", data);

    axiosClient
      .post("/products", data)
      .then((res) => {
        if (res.status === 201) {
          setName("");
          setSku("");
          setQuantity("");
          setPrice("");
          setUserId(parseInt(user.id));
          setErrors(null);
          setMessage("Record created successfully.");
          navigate("/products");
        }
      })
      .catch((error) => {
        const res = error.response;
        if (res && res.status === 500) {
          setErrors(res.data.message);
          setMessage(null);
        }
      });
  };

  return (
    <div className="mt-5">
      <PageTitle classes={"mb-5"} title={"Create Product"} />

      <div className="bg-white px-4 py-10 rounded-lg">
        {message && (
          <AlertMessage
            classes={"bg-green-500 text-white mb-5"}
            message={message}
          />
        )}

        {errors && (
          <AlertMessage
            classes={"bg-red-500 text-white mb-5"}
            message={Object.keys(errors).map((key) => (
              <p key={key}>{errors[key]}</p>
            ))}
          />
        )}

        <form onSubmit={onSubmit}>
          <div className="flex flex-wrap items-center mb-4">
            <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
              <label htmlFor="name" className="font-medium w-full mb-3">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
              />
            </div>
            <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
              <label htmlFor="sku" className="font-medium w-full mb-3">
                SKU:
              </label>
              <input
                type="text"
                name="sku"
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
              />
            </div>
            <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
              <label htmlFor="quantity" className="font-medium w-full mb-3">
                Quantity:
              </label>
              <input
                type="number"
                min={1}
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
              />
            </div>
            <div className="basis-full sm:basis-1/2 xl:basis-1/3 px-2 mb-4">
              <label htmlFor="price" className="font-medium w-full mb-3">
                Price:
              </label>
              <input
                type="number"
                min={1}
                step={0.01}
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-white border rounded-lg p-2 w-full"
              />
            </div>
          </div>

          <div className="flex flex-row justify-between xl:justify-evenly items-center px-2 xl:px-10 mt-10">
            <Link
              to={"/products"}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-500 focus:bg-gray-700 hover:text-white focus:text-white rounded-lg"
            >
              Go Back
            </Link>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 focus:bg-green-900 focus:text-white px-5 py-3 rounded-lg text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
