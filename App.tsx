import React from "react";
import Security from "./src/screens/Security";

export default function App() {
  // Start of the application, 
  // the access point of the app is the security component because there is a case you cannot access
  // if the device dont have authentication feature.
  return <Security />;
}
