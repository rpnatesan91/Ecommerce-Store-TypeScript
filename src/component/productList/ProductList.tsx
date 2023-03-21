import { type } from "os";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../card/Card";
import { Data } from "../../model/model";
import Carousel from "../carousel/Carousel";

const menShirts = "Men`s Shirts";
enum Category {
  shirts = "small",
  shoes = "small",
  watch = "small",
}
enum sizes {
  small,
  medium,
  large,
}

function ProductList() {
  const [data, setData] = useState<Data[] | []>([]);
  // const[category, setCategory] = useState<Category>(Category.shoes);
  const [list, setList] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await axios.get(
        "https://api.escuelajs.co/api/v1/products/"
      );
      setData(
        result.data.map((newList: Data) => {
          return { ...newList, cart: 1 };
        })
      );
      console.log(result.data);
    } catch (e) {
      console.log("page not found");
    }
  };

  function updateCount(action: any, list: any) {
    if (action === "add") {
      let newList: Data[] = data.map((elem: Data) => {
        if (list.id === elem.id) {
          return { ...elem, cart: elem.cart + 1 };
        } else return elem;
      });
      setData([...newList]);
    }
    if (action === "remove") {
      let newList: Data[] = data.map((elem: Data) => {
        if (list.id === elem.id) {
          return { ...elem, cart: elem.cart - 1 };
        } else return elem;
      });
      setData([...newList]);
    }
  }

  return (
    <>
      <Carousel />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "1vh",
        }}
      >
        {data &&
          data.map((dt: Data) => {
            return <ProductCard product={dt} count={updateCount} />;
          })}
      </div>
    </>
  );
}

export default ProductList;
