import { useRef, useState } from "react";
import axiosClient from "../../AxiosClient.js";
import { useAuthContext } from "../../contexts/AuthProvider.jsx";

import AlertMessage from "../../components/base/AlertMessage.jsx";
import Modal from "../../components/base/Modal.jsx";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [deactivateLoginButton, setDeactivateLoginButton] = useState(false);
  const { setUser, setToken } = useAuthContext();
  const [message, setMessage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState(null);
  const [errorsOnSignUp, setErrorsOnSignUp] = useState(null);

  const [newAccount, setNewAccount] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    roleId: 2,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // The button is deactivated when the request is being sent.
    setDeactivateLoginButton(true);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setMessage(null);

    axiosClient
      .post("/login", payload)
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data.user);
        console.log("Login:", res.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
        const response = error.response;
        if ((response && response.status === 401) || response.status === 404) {
          setMessage(response.data.message);
        }
      });

    console.log("Credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    emailRef.current.value = "";
    passwordRef.current.value = "";

    // Once the request was processed, the button is activated after have cleared the fields.
    setDeactivateLoginButton(false);
  };

  //Save Delete Modal with record information
  const handleSignUpClick = () => {
    setIsModalOpen(true);
  };

  //Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorsOnSignUp(null);
    setSignUpMessage(null);
  };

  const onSignUp = (e) => {
    e.preventDefault();

    setSignUpMessage("");
    setErrorsOnSignUp("");

    //console.log("New Account: ", newAccount);

    //How to stop the action if the following validation occur.
    if (newAccount.password !== newAccount.confirmPassword) {
      setErrorsOnSignUp({ error: "The passwords do not match." });
      return;
    }

    axiosClient
      .post("/register", newAccount)
      .then((res) => {
        console.log("Register Res: ", res);
        if (res.status === 201) {
          setErrorsOnSignUp(null);
          setSignUpMessage("Record registered successfully.");
          setNewAccount({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            roleId: 2,
          });

          setIsModalOpen(false);
        }        
      })
      .catch((error) => {
        const res = error.response;
        if (res && res.status === 422) {
          setErrorsOnSignUp(res.data.errors.password);
          setSignUpMessage(null);
        }
        if (res.status === 409) {
          setErrorsOnSignUp(res.data);
        }
      });
  };

  return (
    <div
      id="login"
      className="bg-slate-700 py-8 px-4 lg:px-10 w-full max-w-[400px] lg:max-w-[450px] h-fit text-center rounded-lg"
    >
      <h2 className="text-3xl mb-5 font-bold text-gray-200">Login</h2>
      {message && (
        <AlertMessage
          classes={"bg-red-500 font-bold text-white text-sm text-center mb-5"}
          message={message}
        />
      )}
      <form className="w-full" onSubmit={(e) => onSubmit(e)}>
        <div className="w-full mb-5 flex items-center justify-center">
          <input
            type="email"
            name="email"
            id="email"
            className="bg-white border rounded-lg p-2 w-full"
            placeholder="Email"
            ref={emailRef}
          />
        </div>

        <div className="w-full mb-5 flex items-center justify-center">
          <input
            type="password"
            name="password"
            id="password"
            className="bg-white border rounded-lg p-2 w-full focus:border-blue-500"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>

        <button
          type="submit"
          id="loginBtn"
          disabled={deactivateLoginButton}
          className="bg-blue-500 text-center py-2 w-full text-white hover:bg-blue-700 disabled:bg-blue-300 rounded-lg mb-10"
        >
          Sign In
        </button>

        <button
          type="button"
          className="text-blue-500 bg-slate-700 hover:border-b border-blue-500"
          onClick={() => handleSignUpClick()}
        >
          Create an Account
        </button>
      </form>

      {/*this is the modal I need to built*/}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create new Account"
        onConfirm={onSignUp}
      >
        {signUpMessage && (
          <AlertMessage
            classes={"bg-green-500 text-white mb-5"}
            message={signUpMessage}
          />
        )}

        {errorsOnSignUp && (
          <AlertMessage
            classes={"bg-red-500 text-white mb-5"}
            message={Object.keys(errorsOnSignUp).map((key) => (
              <p key={key}>{errorsOnSignUp[key]}</p>
            ))}
          />
        )}

        <form onSubmit={onSubmit}>
          <div className="flex flex-wrap items-center mb-4 max-w-[1024px]">
            <div className="basis-full sm:basis-1/2 lg:basis-1/3 px-2 mb-4">
              <label htmlFor="firstName" className="font-medium w-full mb-3">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={newAccount.firstName}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, firstName: e.target.value })
                }
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="basis-full sm:basis-1/2 lg:basis-1/3 px-2 mb-4">
              <label htmlFor="lastName" className="font-medium w-full mb-3">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={newAccount.lastName}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, lastName: e.target.value })
                }
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="basis-full sm:basis-1/2 lg:basis-1/3 px-2 mb-4">
              <label htmlFor="email" className="font-medium w-full mb-3">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={newAccount.email}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, email: e.target.value })
                }
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="basis-full sm:basis-1/2 lg:basis-1/3 px-2 mb-4">
              <label htmlFor="phone" className="font-medium w-full mb-3">
                Phone Number:
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={newAccount.phone}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, phone: e.target.value })
                }
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="basis-full sm:basis-1/2 lg:basis-1/3 px-2 mb-4">
              <label htmlFor="password" className="font-medium w-full mb-3">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={newAccount.password}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, password: e.target.value })
                }
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="basis-full sm:basis-1/2 lg:basis-1/3 px-2 mb-4">
              <label
                htmlFor="confirmPassword"
                className="font-medium w-full mb-3"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={newAccount.confirmPassword}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    confirmPassword: e.target.value,
                  })
                }
                className="bg-white border rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
