import React, { forwardRef } from "react";

// Define props if needed, or use `FC` (FunctionComponent) without props
const ComponentToPrint = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} id="content">
    <h1>Hello, World!</h1>
    <p>This content will be downloaded as a PDF.</p>
  </div>
));

ComponentToPrint.displayName = "ComponentToPrint"; // Necessary when using `forwardRef`

export default ComponentToPrint;
