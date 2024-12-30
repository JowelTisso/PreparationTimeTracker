import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { CardWrapper, Container, FormContainer } from "./AuthStyles";
import axios from "axios";
import { saveToLocalStorage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useMessageApi } from "../../context/MessageProvider";
import { COLORS } from "../../utils/Colors";

const { Title } = Typography;

type ValuesType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const messageApi = useMessageApi();

  const onFinish = (values: ValuesType) => {
    const { name, email, password, confirmPassword } = values;
    if (isLogin) {
      loginHandler(email, password);
    } else {
      signupHandler(name!, email, password, confirmPassword!);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const loginHandler = async (email: string, password: string) => {
    try {
      const userData = await axios.post("/users/login", {
        email,
        password,
      });
      if (userData) {
        saveToLocalStorage("token", JSON.stringify(userData.data.token));
        saveToLocalStorage("userData", JSON.stringify(userData.data.user));
        navigate("/");
        openNotification("success", "Login successful");
      }
    } catch (error) {
      console.log(error);
      openNotification("error", "Invalid email or password");
    }
  };

  const signupHandler = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      if (password !== confirmPassword) {
        openNotification("error", "Password and confirm password do not match");
        return;
      }
      const res = await axios.post("/users/signup", {
        name,
        email,
        password,
      });
      if (res.status === 201) {
        openNotification(
          "success",
          "Signup successful, please login to continue"
        );
        setIsLogin(true);
        form.resetFields();
      }
    } catch (error) {
      console.log(error);
      openNotification("error", "Signup failed, please try again");
    }
  };

  const openNotification = (type: "success" | "error", content: string) => {
    messageApi.open({
      type,
      content,
    });
  };

  return (
    <Container>
      <CardWrapper>
        <FormContainer>
          <Title
            style={{
              color: COLORS.Secondary,
            }}
            level={2}
          >
            {isLogin ? "Login" : "Signup"}
          </Title>
          <Form
            form={form}
            name="authForm"
            layout="vertical"
            initialValues={{
              remember: true,
              // email: "jowel@abc.com",
              // password: "123",
              email: "johndoe@gmail.com",
              password: "john@719",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {!isLogin && (
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input type="text" placeholder="Enter your name" />
              </Form.Item>
            )}
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {!isLogin && (
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                ]}
              >
                <Input.Password placeholder="Confirm your password" />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  color: COLORS.Secondary,
                  backgroundColor: COLORS.Idle,
                }}
              >
                {isLogin ? "Login" : "Signup"}
              </Button>
            </Form.Item>
          </Form>
          <Button
            className="signup-link"
            type="link"
            onClick={() => {
              setIsLogin(!isLogin);
              form.resetFields();
            }}
          >
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </Button>
        </FormContainer>
      </CardWrapper>
    </Container>
  );
};

export default AuthScreen;
