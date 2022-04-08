import React from "react";
export default function Die(props) {
  //changes background style with ternery operand
  const styles = {
    backgroundColor: props.isHeld ? "green" : "white",
  };
  //display number of the dice and whether to hold that number in array or
  //not
  return (
    <div className="die-face" onClick={props.holdDice} style={styles}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
