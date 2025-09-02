import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/style.js";
import Loader from "../Layouts/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [value, setValue] = useState("");
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
        // window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
      });
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      });
      toast.success("Coupon code deleted successfully!");
      setCoupons((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error("Failed to delete coupon");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      );
      toast.success("Coupon code created successfully!");
      setCoupons((prev) => [...prev, res.data.coupon]);
      setOpen(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create coupon");
      console.log(error);
    }
  };

  const resetForm = () => {
    setName("");
    setValue("");
    setMinAmount("");
    setMaxAmount("");
    setSelectedProducts("");
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Coupon Code", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Value", minWidth: 100, flex: 0.6 },
    {
      field: "Delete",
      flex: 0.5,
      minWidth: 80,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button color="error" onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows =
    coupons?.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.value + " %",
    })) || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white rounded-md shadow-sm p-4">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-4 !rounded-[5px] mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white font-medium">+ Create Coupon</span>
            </div>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

          {open && (
            <div className="fixed inset-0 bg-opacity-40 z-[2000] flex items-center justify-center">
              <div className="w-[90%] md:w-[40%] max-h-[90vh] overflow-y-auto bg-white rounded-md shadow-lg p-6 relative">
                {/* Close button */}
                <button
                  className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-black"
                  onClick={() => setOpen(false)}
                >
                  <RxCross1 size={24} />
                </button>

                <h5 className="text-2xl font-semibold text-center mb-6">
                  Create Coupon Code
                </h5>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter coupon code name..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter discount %..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Min Amount
                      </label>
                      <input
                        type="number"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Min order amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Max Amount
                      </label>
                      <input
                        type="number"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Max order amount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Select Product
                    </label>
                    <select
                      multiple
                      value={selectedProducts}
                      onChange={(e) =>
                        setSelectedProducts(
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {products?.map((i) => (
                        <option value={i._id} key={i._id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, borderRadius: "6px", textTransform: "none" }}
                  >
                    Create Coupon
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
