import { View, Text } from "react-native";
import styles from "../../styles/estilos";
import { Button, TextInput } from "react-native-paper";
import { colores } from "../../styles/colores";

export default function Tab() {
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{
          flex: 1,
          width: "100%",
        }}
      />
      <View style={styles.container}>
        <Button
          style={styles.Button}
          mode={"contained"}
          buttonColor={colores.colors.primary}
        >
          Enviar
        </Button>
      </View>
    </View>
  );
}
