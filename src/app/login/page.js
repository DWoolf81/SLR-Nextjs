'use client'

import Link from "next/link";
import { useFormState, useFormStatus } from 'react-dom'
import authenticate from "../lib/actions";

const formStyles = {
  bgColor: {
    backgroundColor: "var(--main-link-color)",
  },
  h1: {
    marginBottom: "20px"
  },
  formBox: {
    width: "95%",
    display: "flex",
    height: "450px",
    maxWidth: "500px",
    backgroundColor: "#7aad5c",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "30px",
  },
  form: {
    width: "80%",
    textAlign: "left",
    color: "white",
    marginBottom: "20px"
  },
  input: {
    border: "solid 1px white",
    padding: "20px 20px",
    fontSize: "18px",
    borderRadius: "10px",
    width: "100%",
    margin: "10px 0px",
  },
  button: {
    width: "100%",
    padding: "20px",
    marginTop: "10px",
    color: "var(--button-bg-color)",
    backgroundColor: "var(--main-link-color-hover)"

  },
  fgDiv: {
marginTop: "20px"
  }

};


const formAction = async (prev, formData) => {
    formData.append("id", "123456")
    console.log("This is ", formData.get('email'))
    prev = "Not as much as farts"
    return prev
}

const Login = () => {

    const [error, action] = useFormState(authenticate, null)


  return (
    <div className="container flex-center" style={formStyles.bgColor}>
      <div style={formStyles.formBox}>
        
        <form action={formData => {
          console.log("hit em good", formData)
          action(formData)
        }} style={formStyles.form}>
            <h1 style={formStyles.h1}>Login</h1>
          <p>
            <input style={formStyles.input}
              type="text"
              name="email"
              placeholder="Enter email or phone number"
            />
          </p>
          <p>
            <input style={formStyles.input} type="password" name="pass" placeholder="Password" />
          </p>
          <p>
            <LoginButton />
          </p>
          { error }
          <div style={formStyles.fgDiv}>
            <Link href="/forgot">Forgot password</Link>
          </div>
        </form>
      </div>
    </div>
  );
};


const LoginButton = () => {
  const { pending } = useFormStatus()

  const handleClick = (evt) => {
    if (pending) evt.preventDefault()
  }

  return (
    <button onClick={handleClick} aria-disabled={pending} style={formStyles.button}>Login</button>
  )


}

export default Login;
