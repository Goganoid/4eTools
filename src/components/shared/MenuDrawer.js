import { IconButton } from "react-native-paper"

export default function MenuDrawer(navigation) {
    return <IconButton icon="menu"
        onPress={() => navigation.openDrawer()} />
}