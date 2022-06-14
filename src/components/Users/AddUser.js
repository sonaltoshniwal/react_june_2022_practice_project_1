import { useState } from "react/cjs/react.development";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUserName,setEnteredUserName]=useState("");
  const [enteredUserAge,setEnteredUserAge]=useState("");
  const [error,setError]=useState();
  const userNameChangeHandler=(event)=>
  {
    setEnteredUserName(event.target.value);
  }
  const userAgeChangeHandler=(event)=>
  {
    setEnteredUserAge(event.target.value);
  }
  const addUserHandler = (event) => {
    event.preventDefault();
    if(enteredUserName.trim().length===0 ||
     enteredUserAge.trim().length===0)
    {
      setError(
        {
          title:"Invalid Input",
          message:"Name and Age shouldn't be empty"
        }
      )
      return;
    }
    if(+enteredUserAge<1)
    {
      setError(
        {
          title:"Invalid Age",
          message:"Age shouldn't be negative"
        }
      )
     return;
    }
    props.onAddUser(enteredUserName,enteredUserAge);
    setEnteredUserName("");
    setEnteredUserAge("");
  };
  const clickHandler=()=>
  {
   setError("");
  }

  return (
  <div>
    {error && (<ErrorModal title={error.title}
    message={error.message}
    onClick={clickHandler}
    ></ErrorModal>)}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" 
        onChange={userNameChangeHandler} value={enteredUserName}/>
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number"
        onChange={userAgeChangeHandler} value={enteredUserAge}/>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </div>
  );
};

export default AddUser;