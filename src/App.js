import styled from "styled-components";
import "./App.css";
import Input from "./components/Input";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { exportComponentAsJPEG } from "react-component-export-image";

function App({ productList, addItem }) {
  const componentRef = useRef();
  const [countTotal, setCoutTotal] = useState(false);
  const [total, setTotal] = useState(0);
  const [itemList, setItemList] = useState({
    id: Math.floor(Math.random() * 12317327),
    item: "",
    value: ""
  });

  useEffect(() => {
    let values = productList.map((product) => product.value);

    let totalCount = values.reduce((pv, cv) => pv + cv, 0);

    setTotal(totalCount);
  }, [countTotal]);

  const handleClick = () => {
    addItem(itemList);
    setItemList({
      id: Math.floor(Math.random() * 12317327),
      item: "",
      value: ""
    });
    setCoutTotal(!countTotal);
  };
  return (
    <Container>
      <AppTitle>daily purchase list</AppTitle>
      <InputFrom>
        <Input
          onChange={(event) =>
            setItemList({ ...itemList, item: event.target.value })
          }
          value={itemList.item}
          name="item"
          type="text"
          placeholder="Item Name"
        />
        <Input
          onChange={(event) =>
            setItemList({ ...itemList, value: Number(event.target.value) })
          }
          value={itemList.value}
          name="value"
          type="text"
          placeholder="Value (Taka)"
        />
        <Input type="button" value="Add" onClick={handleClick} />
      </InputFrom>
      <ComponentToPrint
        productList={productList}
        total={total}
        ref={componentRef}
      />
      <Button onClick={() => exportComponentAsJPEG(componentRef)}>
        Download as Image
      </Button>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    productList: state.productList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (itemList) => dispatch({ type: "ADD", payload: itemList })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const ComponentToPrint = React.forwardRef((props, ref) => (
  <OutputContainer ref={ref}>
    <Product>
      <ItemHead>Item</ItemHead>
      <ItemHead>value</ItemHead>
    </Product>
    {props.productList.length > 0 ? (
      props.productList.map((product) => (
        <Product key={product.id}>
          <Span>{product.item}</Span>
          <Span>{product.value} Taka</Span>
        </Product>
      ))
    ) : (
      <Product>
        <h4 style={{ color: "red", textAlign: "center" }}>No Item found..</h4>
      </Product>
    )}
    <Product>
      <ItemHead>Total</ItemHead>
      <ItemHead>{props.total} Taka</ItemHead>
    </Product>
  </OutputContainer>
));

const Button = styled.button`
  border: none;
  background: #c9cba3;
  padding: 6px 20px;
  font-size: 18px;
  font-weight: 600px;
  margin-left: 30px;
  transition: all 250ms;
  border-radius: 4px;

  &:hover {
    background: #472d30;
    color: #fff;
  }
`;
const AppTitle = styled.h1`
  font-size: 42px;
  text-align: center;
  text-transform: uppercase;
`;
const Span = styled.span`
  font-size: 22px;
  text-transform: capitalize;
`;
const ItemHead = styled.span`
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
  border-bottom: 0.5px solid #c9cba3;
`;
const OutputContainer = styled.div`
  margin: 30px;
  border: 0.5px solid #c9cba3;
  border-radius: 4px;
  padding: 5px;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 30px auto;
`;
const InputFrom = styled.div`
  display: flex;
  padding: 5px;
  border: 0.5px solid #c9cba3;
  border-radius: 4px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin: 0 10px;
  }
`;
