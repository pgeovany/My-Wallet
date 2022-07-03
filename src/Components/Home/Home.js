import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Home() {
  return (
    <Container>
      <Header>
        <h1>Olá, Nome</h1>
        <ion-icon name="exit-outline"></ion-icon>
      </Header>
      <TransactionsContainer></TransactionsContainer>
      <ButtonsContainer>
        <Button>
          <ion-icon name="add-circle-outline"></ion-icon>
          <div>
            <p>Nova</p>
            <p>entrada</p>
          </div>
        </Button>
        <Button>
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

const TransactionsContainer = styled.div`
  width: 100%;
  height: 450px;
  margin-top: 24px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
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
