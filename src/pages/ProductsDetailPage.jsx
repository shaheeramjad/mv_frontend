import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layouts/Footer";
import Header from "../components/Layouts/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { productData } from "../static/data";

const ProductsDetailPage = () => {
  // const { allProducts } = useSelector((state) => state.products);
  // const { allEvents } = useSelector((state) => state.events);
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const productName = name.replace(/-/g, " ");
  //const eventData = searchParams.get("isEvent");

  // useEffect(() => {
  //   if (eventData !== null) {
  //     const data = allEvents && allEvents.find((i) => i._id === id);
  //     setData(data);
  //   } else {
  //     const data = allProducts && allProducts.find((i) => i._id === id);
  //     setData(data);
  //   }
  // }, [allProducts, allEvents]);

  useEffect(() => {
    const data = productData.find((i) => i.name === productName);
    setData(data);
  }, [productName]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {/* {!eventData && <>{data && <SuggestedProduct data={data} />}</>} */}
      <Footer />
    </div>
  );
};

export default ProductsDetailPage;
