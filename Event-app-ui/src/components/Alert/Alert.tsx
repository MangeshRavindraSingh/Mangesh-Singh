import { useEffect, useState } from "react";
import AlertType from "../../Types/AlertTypes";

const Alert = ({message, type}:{message:String, type:AlertType}) => {

  const [show, setShow] =useState(true)
    const types = {
        [AlertType.success] :"alert-success",
        [AlertType.fail]: "alert-danger"
    }

    useEffect(()=>{
      setShow(true)
      const timer = setTimeout(()=>{
        setShow(false)
      },5000)
      return () =>{
        clearTimeout(timer);
      }
    },[message])
  return (
    <>
      {show && <div className={`alert ${types[type]}`} role="alert">
        {message.split(":")[1]??message}
      </div>}
    </>
  );
};
export default Alert;
