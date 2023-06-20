import { Item as MenuItem } from "./Menu";
import { faContactCard, faHouse, faKitchenSet, faMessage } from "@fortawesome/free-solid-svg-icons";

export function SidebarContents() {
    return (
        <>
            <MenuItem link="/" icon={faHouse}>
                Home
            </MenuItem>
            <MenuItem link="/skill" icon={faKitchenSet}>
                Skill
            </MenuItem>
            <MenuItem link="/social" icon={faMessage}>
                Social
            </MenuItem>
            <MenuItem link="/contact" icon={faContactCard}>
                Contact
            </MenuItem>
        </>
    );
}

export function SidebarBottomContents() {
    return (
        <>
            <MenuItem link="https://old.hayao0819.com">Old Page</MenuItem>
        </>
    );
}
