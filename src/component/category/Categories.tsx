import React from "react";
import { Category } from "../../model/model";
import "./Categories.css";
import { useNavigate } from "react-router-dom";

interface IncomingData {
  categoryList: Category[];
}

function Categories({ categoryList }: IncomingData) {
  const bgcolors = [
    "#f1dbe9",
    "#DDD3EB",
    "#d3eaeb",
    "#eff1d9",
    "#f1dadb",
    "#d9f1de",
  ];
  const navigate = useNavigate();
  const toCategory = (id) => {
    navigate("/productlist/" + id);
  };

  return (
    <div className="container">
      {categoryList &&
        categoryList?.map((cat, i) => {
          return (
            <>
              <div
                onClick={() => toCategory(cat.id)}
                key={i}
                className="element"
                style={{
                  backgroundColor: bgcolors[i],
                  borderBlockColor: "black",
                }}
              >
                <img className="element" src={cat.image} alt="categoryImage" />
                {cat.name}
              </div>
            </>
          );
        })}
    </div>
  );
}

export default Categories;
