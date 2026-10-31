import { View } from "react-native";
import { Faq } from "../components/ui";
import { FAQ_ITEMS } from "../data/faq";

export function FaqScreen() {
  return (
    <View>
      <Faq items={FAQ_ITEMS} />
    </View>
  );
}
