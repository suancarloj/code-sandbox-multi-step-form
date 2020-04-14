import * as React from "react";

export function AnimatedContainer(props) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
