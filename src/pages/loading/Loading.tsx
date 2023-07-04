import React from "react";
import { GiPadlock } from "react-icons/gi";
import { StyledLoading } from "./Loading.styled";

function Loading() {
  return (
    <StyledLoading>
      <div className="load-box col center">
        <div className="bar"></div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4>Good Things Take Time, Please Wait!</h4>
        <div className="row">
          <p>
          Design and Built by Abbas ❤️
          </p>
        </div>
      </div>
    </StyledLoading>
  );
}

export default Loading;
