import { View } from "react-native";
import { Faq, Searchable } from "../components/ui";
import { FAQ_ITEMS, FAQ_SEARCH } from "@shared/data/faq.jsx";

export function FaqScreen() {
  return (
    <View>
      <Searchable placeholder={FAQ_SEARCH}>
        <Faq items={FAQ_ITEMS} />
      </Searchable>
    </View>
  );
}
