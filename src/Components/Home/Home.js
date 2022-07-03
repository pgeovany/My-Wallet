import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState();

  useEffect(() => {
    if (!userInfo.token) {
      navigate("/");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    async function fetchData() {
      try {
        const promise = await axios.get(
          "https://my-wallet-api0.herokuapp.com/transactions",
          config
        );
        setUser(promise.data);
      } catch (error) {
        alert(error.response.data);
        navigate("/");
      }
    }
    fetchData();
  });

  function logOut() {
    if (!window.confirm("Você realmente deseja sair do aplicativo?")) {
      return;
    }
    navigate("/");
  }

  function genUserHome() {
    if (user) {
      return (
        <Container>
          <Header>
            <h1>Olá, {user.name}</h1>
            <ion-icon onClick={logOut} name="exit-outline"></ion-icon>
          </Header>
          {user.transactions?.length > 0 ? (
            <TransactionsContainer>
              <div>
                {user.transactions.map((transaction, index) => (
                  <Transaction
                    key={index}
                    date={transaction.date}
                    value={transaction.value}
                    type={transaction.type}
                    description={transaction.description}
                  />
                ))}
              </div>
              <Balance value={user.balance}>
                <p>SALDO</p>
                <h1>{user.balance.toFixed(2).toString().replace(".", ",")}</h1>
              </Balance>
            </TransactionsContainer>
          ) : (
            <EmptyContainer>
              <p>Não há registros de</p>
              <p>entrada ou saída</p>
            </EmptyContainer>
          )}
          <ButtonsContainer>
            <Button
              onClick={() =>
                navigate("/new-transaction", {
                  state: { transactionType: "credit" },
                })
              }
            >
              <ion-icon name="add-circle-outline"></ion-icon>
              <div>
                <p>Nova</p>
                <p>entrada</p>
              </div>
            </Button>
            <Button
              onClick={() =>
                navigate("/new-transaction", {
                  state: { transactionType: "debit" },
                })
              }
            >
              <ion-icon name="remove-circle-outline"></ion-icon>
              <div>
                <p>Nova</p>
                <p>saída</p>
              </div>
            </Button>
          </ButtonsContainer>
        </Container>
      );
    }
    return <></>;
  }

  return <>{genUserHome()}</>;
}

function Transaction({ date, value, type, description }) {
  const valueToDisplay = value.toFixed(2).toString().replace(".", ",");
  return (
    <TransactionBox type={type}>
      <div>
        <h3>{date}</h3>
        <h2>{description}</h2>
      </div>
      <h1>{valueToDisplay}</h1>
    </TransactionBox>
  );
}

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-weight: bold;
  }
  h1 {
    color: ${(props) =>
      props.value === 0 ? "black" : props.value > 0 ? "#03AC00" : "#C70000"};
  }
`;

const TransactionBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  div {
    display: inherit;
  }
  h1 {
    color: ${(props) => (props.type === "credit" ? "#03AC00" : "#C70000")};
  }
  h3 {
    padding-right: 10px;
    color: #c6c6c6;
  }
`;

const Container = styled.div`
  justify-content: center;
  background-color: #8c11be;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 24px;
`;

const Header = styled.div`
  height: auto;
  display: flex;
  justify-content: space-between;
  font-size: 26px;
  color: white;
  font-weight: bold;

  ion-icon {
    font-size: 34px;
  }
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;

  p {
    color: #868686;
    font-size: 20px;
  }
`;

const TransactionsContainer = styled.div`
  width: 100%;
  height: 450px;
  margin-top: 24px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 14px;
  justify-content: space-between;
`;

const Button = styled.button`
  height: 100px;
  width: 48%;
  border: none;
  color: white;
  background-color: #a328d6;
  font-size: 20px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;

  &&:hover {
    cursor: pointer;
  }
`;
