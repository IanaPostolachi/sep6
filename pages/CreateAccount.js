import React, {useState} from "react";
import styled from "styled-components";
import AccountInput from "../components/Header/AccountInput";
import {theme} from "../styles/defaultTheme";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {useRouter} from "next/router";
import {auth, db} from "../firebase";
import {setShowLoginPopup} from "../components/Header/loginPopUpVariable";
import {ref, set} from "firebase/database";

const CreateAccount = () => {
  const personIcon = require("../components/Icons/personIcon.png");
  const emailIcon = require("../components/Icons/emailIcon.png");
  const keyIcon = require("../components/Icons/keyIcon.png");
  const router = useRouter();

  // Create Account handling

  const [fields, setFields] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const createAccountFunction = async () => {
    if (fields.password === fields.confirmPassword) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          fields.email,
          fields.password
        );
        await signInWithEmailAndPassword(auth, fields.email, fields.password);

        const userData = {
          Lists: {
            Favorite: {
              name: "Favorite",
            },
            Watched: {
              name: "Watched",
            },
          },
          PersonalInformation: {
            nickname: fields.nickname,
            email: fields.email,
          },
        };
        const user = auth.currentUser;
        await set(ref(db, `users/${user.uid}`), userData);
        console.log(user, userData, "tutok kukaj");

        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
  };

  // Login popup handling

  const handleClick = () => {
    router.push("/");
    setShowLoginPopup(true);
  };

  return (
    <>
      <Container className="createAccountBackground">
        <h1> Le Logo</h1>
        <H2>Create Account</H2>
        <P>Sign up for free and start \exploring a world of possibilities!</P>
        <InputContainer>
          <AccountInput
            imageSrc={emailIcon}
            imageAlt={"Email icon"}
            placeholder={"Email"}
            type={"text"}
            name={"email"}
            handleChange={handleChange}
          ></AccountInput>
          <AccountInput
            imageSrc={personIcon}
            imageAlt={"Person icon"}
            placeholder={"Nickname"}
            type={"text"}
            name={"nickname"}
            handleChange={handleChange}
          ></AccountInput>
          <AccountInput
            imageSrc={keyIcon}
            imageAlt={"Key icon"}
            placeholder={"Password"}
            type={"password"}
            name={"password"}
            handleChange={handleChange}
          ></AccountInput>
          <AccountInput
            imageSrc={keyIcon}
            imageAlt={"Key icon"}
            placeholder={"Repeat password"}
            type={"password"}
            name={"confirmPassword"}
            handleChange={handleChange}
          ></AccountInput>
          <CreateAccountButton onClick={createAccountFunction}>
            Create Account
          </CreateAccountButton>
          <LoginButton onClick={handleClick}>Log in to my account</LoginButton>
        </InputContainer>
      </Container>
    </>
  );
};
export default CreateAccount;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacings.px20};
`;

const H2 = styled.h2`
  color: ${theme.colors.greenDark};
  font-size: ${theme.fontSizes.px36};
  font-weight: ${theme.fontWeight.w700};
  margin: 0;
`;

const P = styled.p`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes.px15};
  font-weight: ${theme.fontWeight.w500};
  margin-bottom: ${theme.spacings.px20};
  margin-top: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacings.px10};
`;

const CreateAccountButton = styled.div`
  width: 100%;
  color: ${theme.colors.white};
  background-color: ${theme.colors.greenDark};
  font-size: ${theme.fontSizes.px20};
  font-weight: ${theme.fontWeight.w500};
  padding: ${theme.spacings.px10};
  text-align: center;
  border-radius: ${theme.spacings.px10};
  margin-bottom: ${theme.spacings.px20};
  box-shadow: ${theme.shadows.default};

  &:hover {
    box-shadow: ${theme.shadows.hoverShadow};
  }
`;

const LoginButton = styled.div`
  width: 100%;
  color: ${theme.colors.grey};
  background-color: ${theme.colors.white};
  font-size: ${theme.spacings.px20};
  font-weight: 500;
  padding: ${theme.spacings.px10};
  text-align: center;
  border-radius: ${theme.spacings.px10};
  box-shadow: ${theme.shadows.default};
  &:hover {
    box-shadow: ${theme.shadows.hoverShadow};
  }
`;
