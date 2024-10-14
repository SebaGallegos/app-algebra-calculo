// Estilos varios para la aplicación

import { StyleSheet } from "react-native";
import { colores } from "./colores";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 30,
    //justifyContent: "center",
    backgroundColor: colores.colors.background,
  },
  container2: {
    flex: 1,
    padding: 15,
    //marginTop: 30,
    //justifyContent: "center",
    backgroundColor: colores.colors.background,
  },
  tableHeader: {
    backgroundColor: colores.colors.primary,
  },
  textInputSQL: {
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 15,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    flexGrow: 1,
    width: "60%",
    //paddingLeft: 10,
    //paddingRight: 10,
    //marginLeft: 10,
    fontSize: 15,
  },
  Button: {
    borderRadius: 10,
    marginLeft: 10,
    //marginRight: 10,
  },
});
