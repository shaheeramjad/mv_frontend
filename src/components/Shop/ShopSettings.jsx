import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style.js";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);

  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipcode] = useState(seller?.zipCode || "");

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/shop/update-shop-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then(() => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.response?.data?.message || "Upload failed");
          });
      }
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        { name, address, zipCode, phoneNumber, description },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Shop info updated successfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Update failed");
      });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full md:w-[80%] flex-col justify-center my-5">
        {/* Avatar */}
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={avatar || `${backendUrl}uploads/${seller?.avatar?.url}`}
              alt="Shop Avatar"
              className="w-[200px] h-[200px] rounded-full cursor-pointer object-cover border shadow-md"
            />
            <div className="w-[35px] h-[35px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px] shadow">
              <label htmlFor="image" className="cursor-pointer">
                <AiOutlineCamera size={18} />
              </label>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
            </div>
          </div>
        </div>

        {/* Shop Info Form */}
        <form
          className="flex flex-col items-center mt-8"
          onSubmit={updateHandler}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-[70%]">
            <div>
              <label className="block pb-2">Shop Name</label>
              <input
                type="text"
                placeholder="Enter your shop name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} w-full`}
                required
              />
            </div>

            <div>
              <label className="block pb-2">Shop Description</label>
              <input
                type="text"
                placeholder="Enter your shop description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${styles.input} w-full`}
              />
            </div>

            <div>
              <label className="block pb-2">Shop Address</label>
              <input
                type="text"
                placeholder="Enter your shop address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${styles.input} w-full`}
                required
              />
            </div>

            <div>
              <label className="block pb-2">Shop Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`${styles.input} w-full`}
                required
              />
            </div>

            <div>
              <label className="block pb-2">Shop Zip Code</label>
              <input
                type="text"
                placeholder="Enter your zip code"
                value={zipCode}
                onChange={(e) => setZipcode(e.target.value)}
                className={`${styles.input} w-full`}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-md shadow hover:bg-green-700 transition mt-8"
          >
            Update Shop
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
