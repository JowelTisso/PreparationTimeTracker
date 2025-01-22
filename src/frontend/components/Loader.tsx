import { Spin } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(232, 230, 230, 0.5);
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <Wrapper className="spinner-wrapper">
      <Spin size="large" />
    </Wrapper>
  );
};

export default Loader;
