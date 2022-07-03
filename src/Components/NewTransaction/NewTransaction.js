import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";
import axios from "axios";

export default function NewTransaction() {
  const location = useLocation();
  const { transactionType } = location.state;
  const [disableButton, setDisableButton] = useState(false);
  const [value, setValue] = useState("");
  const [description, setDescriotion] = useState("");
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function sendTransaction(e) {
    e.preventDefault();
    setDisableButton(true);

    if (parseFloat(value) < 0) {
      setDisableButton(false);
      alert("Por favor, insira um valor válido!");
      return;
    }

    const date = dayjs().format("DD/MM");

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const body = {
      value,
      description,
      date,
      type: transactionType,
    };

    try {
      await axios.post("http://localhost:5000/transactions", body, config);
      navigate(-1);
    } catch (error) {
      setDisableButton(false);
      alert(error.response.data);
    }
  }

  function genTransactionForm() {
    if (transactionType === "credit") {
      return (
        <Container>
          <Header>Nova entrada</Header>
          <Form onSubmit={sendTransaction}>
            <Input
              placeholder="Valor"
              required
              disabled={disableButton}
              value={value}
              type="number"
              onChange={(e) => setValue(e.target.value)}
            />
            <Input
              placeholder="Descrição"
              required
              disabled={disableButton}
              value={description}
              type="text"
              onChange={(e) => setDescriotion(e.target.value)}
            />
            <Button type="submit" disabled={disableButton}>
              {disableButton ? <ThreeDots color="white" /> : "Salvar entrada"}
            </Button>
          </Form>
        </Container>
      );
    }
    return (
      <Container>
        <Header>Nova saída</Header>
        <Form onSubmit={sendTransaction}>
          <Input
            placeholder="Valor"
            required
            disabled={disableButton}
            value={value}
            type="number"
            onChange={(e) => setValue(e.target.value)}
          />
          <Input
            placeholder="Descrição"
            required
            disabled={disableButton}
            value={description}
            type="text"
            onChange={(e) => setDescriotion(e.target.value)}
          />
          <Button type="submit" disabled={disableButton}>
            {disableButton ? <ThreeDots color="white" /> : "Salvar saída"}
          </Button>
        </Form>
      </Container>
    );
  }
  return <>{genTransactionForm()}</>;
}

const Header = styled.div`
  height: auto;
  font-size: 26px;
  color: white;
  font-weight: bold;
  text-align: left;
  width: 86%;
  margin-bottom: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #8c11be;
  width: 100%;
  min-height: 100vh;
  padding-top: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 86%;
`;

const Input = styled.input`
  background-color: white;
  border-radius: 5px;
  height: 56px;
  width: 100%;
  margin-bottom: 12px;
  padding-left: 12px;
  font-size: 18px;
  border: none;
  ::placeholder {
    font-size: 20px;
    color: black;
  }
`;

const Button = styled.button`
  height: 40px;
  width: 100%;
  border: none;
  color: white;
  background-color: #a328d6;
  text-decoration: none;
  font-size: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
