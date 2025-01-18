import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Spin, Typography } from "antd";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessageApi } from "../../context/MessageProvider";
import { COLORS } from "../../utils/Colors";
import { saveToLocalStorage } from "../../utils/helper";
import { CardWrapper, Container, FormContainer } from "./AuthStyles";

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
  const [loading, setLoading] = useState(false);

  const onFinish = (values: ValuesType) => {
    const { name, email, password, confirmPassword } = values;
    if (isLogin) {
      loginHandler(email, password);
    } else {
      signupHandler(name!, email, password, confirmPassword!);
    }
  };

  const loginHandler = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await axios.post("/users/login", {
        email,
        password,
      });
      const expirationTime = Date.now() + 1000 * 60 * 60 * 24;
      if (userData) {
        saveToLocalStorage(
          "tokenData",
          JSON.stringify({
            token: userData.data.token,
            expiry: expirationTime,
          })
        );
        saveToLocalStorage("userData", JSON.stringify(userData.data.user));
        navigate("/");
        openNotification("success", "Login successful");
      }
    } catch (error) {
      console.log(error);
      openNotification("error", "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    setLoading(true);
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
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          openNotification("error", error.response.data.message);
        } else {
          openNotification("error", "Signup failed, please try again");
        }
      } else {
        console.log("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
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
            onFinish={onFinish}
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
                className="login-form-button"
                block
                disabled={loading}
              >
                {loading ? (
                  <Spin
                    indicator={<LoadingOutlined spin />}
                    style={{
                      color: "#fff",
                    }}
                  />
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Signup"
                )}
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
            disabled={loading}
          >
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </Button>
          {isLogin && (
            <Button
              className="signup-link"
              type="link"
              onClick={() => {
                form.setFieldsValue({
                  email: "johndoe@gmail.com",
                  password: "john@719",
                });
              }}
              disabled={loading}
            >
              Fill Test Credentials
            </Button>
          )}
        </FormContainer>
      </CardWrapper>
      <div className="cold-info">
        <Alert
          message="Please note: The app is initializing and may take a few extra seconds to load on first login due to server cold start."
          type="warning"
          closable
          showIcon
        />
      </div>
    </Container>
  );
};

export default AuthScreen;
