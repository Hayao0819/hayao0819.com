import { Item as MenuItem } from "./Menu";
import { faContactCard, faFaceSmile, faHouse, faKitchenSet, faMessage, faOtter } from "@fortawesome/free-solid-svg-icons";

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
            <MenuItem link="/something" icon={faOtter}>
                Something
            </MenuItem>
            <MenuItem link="/gyagu" icon={faFaceSmile}>
                Gyagu
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
            <MenuItem link="/history">Old Page</MenuItem>
        </>
    );
}
