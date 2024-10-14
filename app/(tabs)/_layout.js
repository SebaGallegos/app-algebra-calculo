/* 
    _layout.js

    Archivo utilizado para definir la estructura de las tabs (pantallas) de la aplicación.
    Se importa el componente Tabs de expo-router y se definen las pantallas que se mostrarán.
*/

import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="algebra"
        options={{
          title: "Álgebra",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="calculo"
            options={{
                title: "Cálculo",
                tabBarIcon: ({ color }) => (
                    <FontAwesome size={28} name="home" color={color} />
                ),
            }}
        />
      <Tabs.Screen
        name="sql"
        options={{
          title: "Sql",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
