import Slider from "./components/Slider";
import ProductList from "./components/ProductList";
import Categories from "./components/Categories";
// import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";
const HomePage = async () => {
  // const wixClient = useWixClient();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await wixClient.products.queryProducts().find();
  //     console.log(res);
  //   };

  //   getProducts();
  // }, [wixClient]);

  // const wixClient = await wixClientServer();

  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);

  return (
    <div className="">
      {/* <Slider /> */}
      <div className="mt-24 px4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl mb-2">Featured Products</h1>
        <Suspense fallback="Loading">
          <ProductList
            categoryId={process.env.BEST_SELLER_CATEGORY_ID || ""}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24 px4  mb-12">
        <h1 className="text-2xl mb-2">Categories</h1>
        <Categories />
      </div>
      <div className="mt-24 px4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl mb-2">New Products</h1>
        {/* <ProductList /> */}
      </div>
    </div>
  );
};

export default HomePage;
