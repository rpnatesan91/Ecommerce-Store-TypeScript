import { useState } from "react";
import "./Carousel.css";
import { Category } from "../../model/model";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import IconButton from "@mui/material/IconButton";

interface IncomingData {
  categoryData: Category[];
  // newlist: any;
}

function Carousel({ categoryData }: IncomingData) {
  const [index, setIndex] = useState(0);
  const changeCategory = (i: number) => {
    setIndex(i);
  };
  return (
    <div className="main-container">
      <div className="slideshow-container">
        <div className=" fade">
          <div className="numbertext">
            {index + 1} /{categoryData?.length}
          </div>
          <img
            src={categoryData[index]?.image}
            alt="carouselImage"
            style={{ width: "100%", height: "450px", objectFit: "fill" }}
          />
          <div className="text">{categoryData[index]?.name}</div>
        </div>
        <IconButton
          disabled={index === 0}
          onClick={() => changeCategory(index - 1)}
          size="large"
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: " 50%",
            width: "auto",
            padding: " 16px",
            marginTop: "-22px",
            color: "black",
            fontWeight: "bold",
            fontSize: " 40px",
            transition: " 0.6s ease",
            borderRadius: " 0 10px 10px 0",
            userSelect: "none",
          }}
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </IconButton>

        <IconButton
          disabled={index >= categoryData.length - 1}
          onClick={() => changeCategory(index + 1)}
          size="large"
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: " 50%",
            width: "auto",
            padding: " 16px",
            marginTop: "-22px",
            color: "black",
            fontWeight: "bold",
            fontSize: " 40px",
            transition: " 0.6s ease",
            borderRadius: "3px 0 0 3px",
            userSelect: "none",
            right: "0",
          }}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </IconButton>
      </div>
      <br />

      <div style={{ textAlign: "center" }}>
        {categoryData?.map((data, i) => {
          return (
            <>
              <div
                key={data.id}
                className="dot"
                onClick={() => changeCategory(i)}
                style={{ backgroundColor: index === i ? "black" : "grey" }}
              ></div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
