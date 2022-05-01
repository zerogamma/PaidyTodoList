import React, { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { View, Text, Button } from "react-native";
// components
import Main from "../../containers/Main";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./style";
// Utils
import colors from "../../assets/colors/color";

export function Security() {
  const [biometrics, setBiometrcis] = useState<boolean>(false);
  const [renderContent, setRenderContent] = useState<boolean>(false);
  const [grantAccess, setGrantAccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBiometrcis(compatible);
    })();
  }, []);

  const renderSecureContent = () => {
    (async () => {
      const auth = await LocalAuthentication.authenticateAsync();
      auth.success ? setGrantAccess(true) : setGrantAccess(false);
    })();
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
        <Main />
      ) : (
        <View style={styles.authWrapper}>
          <Text>Set Authentication to proceed</Text>
          <Button title="Press to unlock" onPress={renderSecureContent} />
        </View>
      )}
    </View>
  );
}
