import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function logIn(e) {
    e.preventDefault();
    setDisableButton(true);

    const body = {
      email,
      password,
    };

    try {
      const request = await axios.post("http://localhost:5000/sign-in", body);
      setUserInfo(request.data);
      navigate("/home");
    } catch (error) {
      setDisableButton(false);
      alert(error.response.data);
    }
  }

  return (
    <Container>
      <Title>MyWallet</Title>
      <Form onSubmit={logIn}>
        <Input
          placeholder="E-mail"
          required
          disabled={disableButton}
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          required
          disabled={disableButton}
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={disableButton}>
          {disableButton ? <ThreeDots color="white" /> : "Entrar"}
        </Button>
      </Form>
      <Link to="/sign-up">
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #8c11be;
  width: 100%;
  min-height: 100vh;

  a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-top: 30px;

    &&:hover {
      cursor: pointer;
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: white;
  font-weight: bold;
  margin-bottom: 24px;
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
