import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style.js";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] md:w-[60%]`}>
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
          Elevate Your Space <br className="hidden md:block" /> with Modern
          Décor
        </h1>

        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Discover our curated collection of premium home decor pieces that{" "}
          <br />
          blend contemporary design with timeless elegance.
          <br />
          From statement furniture to artistic accents, create spaces that
          inspire.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
