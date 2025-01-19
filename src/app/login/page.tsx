"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}
export default function Login() {
  const [mode, setMode] = useState(MODE.LOGIN);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const pathName = usePathname();
  const router = useRouter();
  const wixClient = useWixClient();

  const isLoggedIn = wixClient.auth.loggedIn();

  if (isLoggedIn) {
    router.push("/");
  }

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : "Email Verification";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    let res;
    try {
      switch (mode) {
        case MODE.LOGIN:
          // Add your login logic here
          res = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          // Add your login logic here
          res = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: userName },
          });
          break;
        case MODE.RESET_PASSWORD:
          // Add your login logic here
          res = await wixClient.auth.sendPasswordResetEmail(email, pathName);
          setMessage("Password reset email sent");
          break;
        case MODE.EMAIL_VERIFICATION:
          // Add your login logic here
          res = await wixClient.auth.processVerification({
            verificationCode: email,
          });
          break;

        default:
          break;
      }

      switch (res?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are being redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            res.data.sessionToken
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            res.errorCode === "invalidEmail" ||
            res.errorCode === "invalidPassword"
          ) {
            setMessage("Invalide email or password.");
          } else if (res.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (res.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong!");
          }
          break;

        default:
          break;
      }
    } catch (e) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-14 px-36 justify-center items-center flex">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold">{formTitle}</h1>
        {mode === MODE.REGISTER && (
          <div className="flex flex-col gap-4">
            <label className="text-gray-500">User Name</label>
            <input
              type="text"
              className="ring-1 rounded-md ring-gray-300 h-12 px-3"
              placeholder=""
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <label className="text-gray-500">Email</label>
          <input
            type="text"
            className="ring-1 rounded-md ring-gray-300 h-12 px-3"
            placeholder="john@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {mode !== MODE.EMAIL_VERIFICATION && (
          <div className="flex flex-col gap-4">
            <label className="text-gray-500">Password</label>
            <input
              type="text"
              className="ring-1 rounded-md ring-gray-300 h-12 px-3"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN && (
          <div
            className="underline"
            onClick={(e) => {
              setMode(MODE.RESET_PASSWORD);
            }}
          >
            Forget password?
          </div>
        )}
        <button
          className="bg-pink-600 text-white h-12 rounded-md disabled:bg-pink-500 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Is loading..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            Do not have an account?
          </div>
        )}

        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have an account?
          </div>
        )}

        {mode === MODE.EMAIL_VERIFICATION && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
}
