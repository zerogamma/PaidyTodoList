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
  const [biometrics, setBiometrcis] = useState<boolean>(false);
  const [renderContent, setRenderContent] = useState<boolean>(false);
  const [grantAccess, setGrantAccess] = useState<boolean>(false);
  const [facialRecognitionAvailable, setFacialRecognitionAvailable] =
    React.useState(false);
  const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);
  const [irisAvailable, setIrisAvailable] = React.useState(false);

  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types && types.length) {
      const facial = types.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      );
      const finger = types.includes(
        LocalAuthentication.AuthenticationType.FINGERPRINT
      );
      const eyes = types.includes(LocalAuthentication.AuthenticationType.IRIS);

      setFacialRecognitionAvailable(facial);
      setFingerprintAvailable(finger);
      setIrisAvailable(eyes);
      setBiometrcis(facial || finger || eyes);
    }
  };

  useEffect(() => {
    checkSupportedAuthentication();
  }, []);

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

  const renderSecureContent = async () => {
    const auth = await LocalAuthentication.authenticateAsync();
    auth.success ? setGrantAccess(true) : setGrantAccess(false);
    setRenderContent(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.primaryGradient}
        style={styles.background}
      />
      {!biometrics ? (
        <Text>Face or Fingerprint scanner is not availbale on this device</Text>
      ) : renderContent && grantAccess ? (
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
