import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../card/Card";
import { Data, Category } from "../../model/model";
import Carousel from "../carousel/Carousel";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "../../pagination/Pagination";
import Categories from "../category/Categories";
import { useParams } from "react-router-dom";

function ProductList() {
  const [data, setData] = useState<Data[] | []>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [pageData, setPageData] = useState<Data[] | []>([]);
  const { id } = useParams();

  useEffect(() => {
    getProducts(id);
    getCategories();
    console.log("id", id);
  }, [id]);

  const getProducts = async (id) => {
    let url;
    if (+id > 0) {
      url = "https://api.escuelajs.co/api/v1/products/?categoryId=" + id;
    } else {
      url = "https://api.escuelajs.co/api/v1/products/";
    }
    try {
      const result = await axios.get(url);
      setData(
        result &&
          result.data.map((newList: Data) => {
            return { ...newList, cart: 1 };
          })
      );
      console.log("result", result.data);
    } catch (e) {
      console.log("page not found");
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/categories?limit=5"
      );

      setCategory(response.data);
      console.log("category", response.data);
    } catch (error) {
      console.log(error);
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
        if (list.id === elem.id && list.cart > 1) {
          return { ...elem, cart: elem.cart - 1 };
        } else return elem;
      });
      setData([...newList]);
    }
  }

  return (
    <>
      <Carousel categoryData={category} />
      <Categories categoryList={category} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "50px",
        }}
      >
        <Pagination data={data} setPageData={setPageData} />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "1vh",
        }}
      >
        {pageData &&
          pageData.map((dt: Data) => {
            return (
              <div key={dt.id}>
                <ProductCard product={dt} count={updateCount} />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ProductList;
