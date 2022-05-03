import React, { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { View, Text, TouchableOpacity } from "react-native";
// components
import Main from "../Main";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./style";
// Utils
import colors from "../../../assets/colors/color";
import ContextProvider from "../../context/ContextProvider";

export function Security() {
  // inner State managements
  const [biometrics, setBiometrcis] = useState<boolean>(false);
  const [renderContent, setRenderContent] = useState<boolean>(false);
  const [grantAccess, setGrantAccess] = useState<boolean>(false);
  // different state of what kind of authentication the devices have.
  const [facialRecognitionAvailable, setFacialRecognitionAvailable] =
    React.useState(false);
  const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);
  const [irisAvailable, setIrisAvailable] = React.useState(false);

  // Async function to get what kind of validation are available
  const checkSupportedAuthentication = async () => {
    // module from expo-authentication to check different type.
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types && types.length) {
      const facial = types.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      );
      const finger = types.includes(
        LocalAuthentication.AuthenticationType.FINGERPRINT
      );
      const eyes = types.includes(LocalAuthentication.AuthenticationType.IRIS);

      // setting what types are available
      setFacialRecognitionAvailable(facial);
      setFingerprintAvailable(finger);
      setIrisAvailable(eyes);
      
      // setting to let access if the are a least one authentication module
      setBiometrcis(facial || finger || eyes);
    }
  };

  // main react hook for live cylce componentDidMount
  useEffect(() => {
    checkSupportedAuthentication();
  }, []); // without variable to be one time only run.

  // building message depending what authentication is available
  const getDescription = () => {
    if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
      return "Authenticate with Face ID, touch ID or iris ID";
    }
    if (facialRecognitionAvailable && fingerprintAvailable) {
      return "Authenticate with Face ID or touch ID";
    }
    if (facialRecognitionAvailable && irisAvailable) {
      return "Authenticate with Face ID or iris ID";
    }
    if (fingerprintAvailable && irisAvailable) {
      return "Authenticate with touch ID or iris ID";
    }
    if (facialRecognitionAvailable) {
      return "Authenticate with Face ID";
    }
    if (fingerprintAvailable) {
      return "Authenticate with touch ID ";
    }
    if (irisAvailable) {
      return "Authenticate with iris ID";
    }
  };


  // main function to validate user authentication
  const renderSecureContent = async () => {
    // use of authenticateAsync to validate user and grant accesss or not.
    const auth = await LocalAuthentication.authenticateAsync();
    auth.success ? setGrantAccess(true) : setGrantAccess(false);
    // flag to let view the app.
    setRenderContent(true);
  };

  return (
    <View style={styles.container}>
      {/* This let you have a gradient background */}
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.background}
      />
      {/* ternaries to grant access or change view. Made like this to not make extra views and separete validations.*/}
      {!biometrics ? (
        <Text>Face or Fingerprint scanner is not availbale on this device</Text>
      ) : renderContent && grantAccess ? (
        // Using Context to provide global state data. And Main to do App.
        <ContextProvider>
          <Main />
        </ContextProvider>
      ) : (
        <View style={styles.authWrapper}>
          <Text style={styles.description}>{getDescription()}</Text>
          <TouchableOpacity style={styles.buttonWrapper} onPress={renderSecureContent} testID="addTask">
            <Text style={styles.button}>Press to unlock</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
