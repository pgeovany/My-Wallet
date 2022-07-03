import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styled from "styled-components";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  async function signUp(e) {
    e.preventDefault();
    setDisableButton(true);

    if (password !== confirmPassword) {
      setDisableButton(false);
      alert("As senhas devem ser iguais!");
      return;
    }

    const body = {
      name,
      email: email.toLowerCase(),
      password,
    };

    try {
      await axios.post("https://my-wallet-api0.herokuapp.com/sign-up", body);
      navigate("/");
    } catch (error) {
      setDisableButton(false);
      alert(error.response.data);
    }
  }

  return (
    <Container>
      <Title>MyWallet</Title>
      <Form onSubmit={signUp}>
        <Input
          placeholder="Nome"
          required
          disabled={disableButton}
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          placeholder="Confirme a senha"
          required
          disabled={disableButton}
          value={confirmPassword}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" disabled={disableButton}>
          {disableButton ? <ThreeDots color="white" /> : "Cadastrar"}
        </Button>
      </Form>
      <Link to="/">
        <p>Já tem conta? Entre agora!</p>
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
