import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{headerShown: false}}/>; //tira o "index" da parte de cima da página 
}