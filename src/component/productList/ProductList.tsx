import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../card/Card";
import { Data, Category } from "../../model/model";
import Carousel from "../carousel/Carousel";
import "../productList/productlist.css";
import TablePagination from "@mui/material/TablePagination";

function ProductList() {
  const [data, setData] = useState<Data[] | []>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  //const [list, setList] = useState([]);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  // const [rowsPerPage, setRowsPerPage] = useState(dataPerPage);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const result = await axios.get(
        "https://api.escuelajs.co/api/v1/products/"
      );
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
        if (list.id === elem.id && list.cart >= 2) {
          return { ...elem, cart: elem.cart - 1 };
        } else return elem;
      });
      setData([...newList]);
    }
  }

  const handleselectPage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: any
  ) => {
    console.log("page", newPage);
    // const maxLength = data.length / 10 + 1;
    // if (newPage >= 1 && newPage < maxLength && newPage !== page)
    if (newPage === 0) {
      setPage(1);
    } else setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("event", event);
    setDataPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Carousel categoryData={category} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "1vh",
        }}
      >
        {data &&
          data
            .slice(page * dataPerPage - dataPerPage, page * dataPerPage)
            .map((dt: Data) => {
              return (
                <div key={dt.id}>
                  <ProductCard product={dt} count={updateCount} />
                </div>
              );
            })}
      </div>
      <div style={{ width: "100%", alignContent: "right" }}>
        <TablePagination
          sx={{
            color: "black",
            fontWeight: "bold",
            width: "100%",
            margin: "auto",
          }}
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleselectPage}
          rowsPerPage={dataPerPage}
          onRowsPerPageChange={() => handleChangeRowsPerPage}
        />
      </div>
      {/* {data.length / dataPerPage}
      {data.length > 0 && (
        <div className="pagination">
          <span
            style={{ opacity: page > 1 ? "" : 0 }}
            onClick={() => handleselectPage(page - 1)}
          >
            ⏮️
          </span>
          {[...Array(Math.ceil(data.length / dataPerPage))].map((_, i) => {
            // pagination array
            return (
              <span
                style={{ backgroundColor: page === i + 1 ? "grey" : "white" }}
                onClick={() => handleselectPage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            style={{
              opacity: page < Math.ceil(data.length / dataPerPage) ? "" : 0,
            }}
            onClick={() => handleselectPage(page + 1)}
          >
            ⏭️
          </span>
        </div>
      )} */}
    </>
  );
}

export default ProductList;
