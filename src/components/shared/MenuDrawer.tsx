import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { IconButton } from "react-native-paper"

export default function MenuDrawer(navigation:any) {
    return <IconButton icon="menu"
        onPress={() => navigation.openDrawer()} />
}