import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  // Retrieve the currentSeller from the Redux store
  const currentSeller = useSelector((state) => state.seller.currentSeller);

  // Check if currentSeller is not available or loading
  if (!currentSeller) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  return (
    <>
      <div className="bg-slate-100">
        <div className="font-bold text-xl mb-4 text-center">Profile</div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 w-[50%]">
            <div className="grid grid-cols-2 p-3">
              <div className="font-bold">Seller Name:</div>
              <div>{currentSeller.Seller_Name}</div>
            </div>
            <div className="grid grid-cols-2 p-5">
              <span className="font-bold">Seller Email:</span>{" "}
              <span>{currentSeller.Seller_Email}</span>
            </div>
            <div className="grid grid-cols-2 p-5">
              <span className="font-bold">Seller Phone:</span>{" "}
              <span>{currentSeller.Seller_Phone}</span>
            </div>
            <div className="grid grid-cols-2 p-5">
              <span className="font-bold">Address:</span>{" "}
              <span>{currentSeller.Seller_Address}</span>
            </div>
            <div className="grid grid-cols-2 p-5">
              <span className="font-bold">PAN:</span>{" "}
              <span>{currentSeller.Seller_PanNumber}</span>
            </div>

            <Link to="/logout">
              <button
                type="submit"
                className="w-[30%] cursor-pointer transition-all bg-blue-500 text-white px-6 py-3 rounded-lg w-full
                        border-blue-600
                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              >
                Log Out
              </button>
            </Link>
            <Link to="/yourListing">
              <button
                type="submit"
                className="w-[30%] cursor-pointer transition-all bg-blue-500 text-white px-6 py-3 rounded-lg w-full
                        border-blue-600
                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              >
                My Listings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
