'use client'

import Link from "next/link";
import { useFormState, useFormStatus } from 'react-dom'
import authenticate, { fake_action } from "@/lib/actions";
import { useEffect, useState } from "react";



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
    if (!formData) return false
    formData.append("id", "123456")
    console.log("This is ", formData.get('email'), prev)
    const res = await authenticate(formData)

    return res
}



const Login = () => {

 

  // console.log("Env test", process.env.TEST, process.env.NODE_ENV, process.env.MONGODB_URI)

    const [error, action] = useFormState(formAction, null)

    const [errorMess, setErrorMess] = useState(null)
    const [pass, setPass] = useState(0)


    useEffect(()=>{
      console.log("Run use effect", error, errorMess)
      if (!errorMess){
       action(false)
        setErrorMess(true)
      }

    }, [error, errorMess])

    const handleChange = () => {
      console.log("Something needs to change")
      setErrorMess(false)
      
    }
   


  return (
    <div className="container flex-center" style={formStyles.bgColor}>
      <div style={formStyles.formBox}>

        <form action={formData => {
          action(formData)
        }} style={formStyles.form}>
            <h1 style={formStyles.h1}>Login</h1>
            { error && (<p className="error-mess-bubble">{ error }</p>) }
          <p>
            <input onChange={handleChange} style={formStyles.input}
              type="text"
              name="email"
              placeholder="Enter email or phone number"
            />
          </p>
          <p>
            <input onChange={handleChange} style={formStyles.input} type="password" name="pass" placeholder="Password" />
          </p>
          <p>
            <LoginButton />
          </p>
          
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
