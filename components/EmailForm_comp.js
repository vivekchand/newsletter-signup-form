"use client";

import { useState } from "react";

export default function EmailForm({ onEmailSent, emailProp }) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValid = (email) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isValidEmail.test(email);
  };

  const inputHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
    emailProp(value);

    if (value === "") {
      setErrorMessage("Valid email required!");
    } else if (!isValid(value)) {
      setErrorMessage("Invalid Email!");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = () => {
    if (email === "") {
      setErrorMessage("Valid email required!");
    } else if (!isValid(email)) {
      setErrorMessage("Invalid Email!");
    } else {
      setErrorMessage("");
    }
    handleSendEmail();
    onEmailSent();
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch("/api/mailService", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="space-y-4 flex flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col space-y-2"
      >
        <span className="flex flex-row justify-between">
          <label htmlFor="email" className="font-semibold">
            Email address
          </label>
          {errorMessage && (
            <p className="text-red-500 inline-block font-semibold">
              {errorMessage}
            </p>
          )}
        </span>
        <input
          className={`placeholder:font-light placeholder:text-xs text-left py-3 px-4 rounded-lg border border-slate-200 focus:outline-slate-950 focus:text-slate-950 ${
            errorMessage &&
            "focus:outline-red-500 focus:text-red-500 focus:bg-red-100 outline-red-500 text-red-500 bg-red-100"
          }`}
          placeholder="email@company.com"
          value={email}
          type="email"
          id="email"
          name="email"
          onChange={inputHandler}
        />
      </form>

      <button
        className={`${
          !errorMessage && !email
            ? "py-3 px-4 text-white transition duration-150 shadow-xl bg-slate-800 rounded-lg hover:bg-opacity-80 "
            : errorMessage
            ? "py-3 px-4 text-white transition duration-150 shadow-xl bg-slate-800 rounded-lg bg-opacity-80 cursor-not-allowed"
            : "py-3 px-4 text-white shadow-xl bg-gradient-to-r from-rose-400 via-red-400 to-orange-400 rounded-lg"
        }  
          `}
        type="submit"
        disabled={errorMessage}
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Subscribe now
      </button>
    </div>
  );
}
