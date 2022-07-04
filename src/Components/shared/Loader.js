import { Circles } from "react-loader-spinner";
import styled from "styled-components";

export default function Loader() {
  return (
    <Container>
      <Circles
        ariaLabel="loading-indicator"
        color="white"
        height={110}
        width={110}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
