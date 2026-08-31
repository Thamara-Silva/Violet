import { Tabs } from "expo-router"

export default function RootLayout(){
  return( 
    <Tabs>
      <Tabs.Screen name="index" options={{title: "Conversas"}}/>
      <Tabs.Screen name="status" options={{title: "Status"}}/>
      <Tabs.Screen name="comunidades" options={{title: "Comunidades"}}/>
      <Tabs.Screen name="ligacoes" options={{title: "Ligações"}}/>
    </Tabs>
  )
}
