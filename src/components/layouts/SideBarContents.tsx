import { faBook, faFaceSmile, faHouse, faOtter } from "@fortawesome/free-solid-svg-icons";

import { Item as MenuItem } from "./Menu";

export function SidebarContents() {
    return (
        <>
            <MenuItem link="/" icon={faHouse}>
                Home
            </MenuItem>
            <MenuItem link="/me">Me</MenuItem>
            <MenuItem link="/something" icon={faOtter}>
                Something
            </MenuItem>

            <MenuItem link="/gyagu" icon={faFaceSmile}>
                Gyagu
            </MenuItem>

            <MenuItem link="/diary/" icon={faBook}>
                Articles
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
