import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const backgroundImageUrl =
    "https://3993861.fs1.hubspotusercontent-na1.net/hubfs/3993861/220616_Catalog-Management-Types.png";

  return (
    <>
      <div>
        {/* top section */}
        <div
          className="flex flex-col gap-6 pt-[5rem]  px-10 h-[95vh] "
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            background: "cover",
            backgroundAttachment: "fixed",
            backgroundRepeat: "repeat",
          }}
        >
          <h1
            className=" text-center font-bold text-3xl lg:text-6xl"
            data-aos="fade-down"
          >
            Reach More Customers, Boost Your Sales!
            <br />
            <span className="text-xl lg:text-2xl">
              List Your Products Easily and Effectively
            </span>
          </h1>
        </div>
        <div className="fixed bottom-4 right-4 z-10">
          <Link to="/list">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow">
              List Your Products
            </button>
          </Link>
        </div>

        <div className="demo">
          <div className=" flex justify-center font-bold text-4xl p-2 pt-6">
            How It Works ??
          </div>
          <div className="flex justify-center p-10">
            <iframe
              width="1300"
              height="500"
              src="https://www.youtube.com/embed/DZCPVaTc_OU?si=gXIQn4lvKpR_Iibw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
