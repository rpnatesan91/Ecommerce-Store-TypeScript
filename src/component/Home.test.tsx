import { render, screen } from "@testing-library/react";
import App from "../App";
import ProductList from "./productList/ProductList";

describe("testing Home component", () => {
  test("Checking product or demo text rendered in the home page", () => {
    render(<ProductList />); // jest renders the App component - creating a virtual DOM
    const productLink = screen.getByText("Products");
    expect(productLink).toBeInTheDocument();
  });
});
