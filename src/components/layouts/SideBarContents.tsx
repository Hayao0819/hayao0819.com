import { faFaceSmile, faHouse, faKitchenSet, faOtter } from "@fortawesome/free-solid-svg-icons";

//import { faBook } from "@fortawesome/free-solid-svg-icons";
//import { faContactCard, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Item as MenuItem } from "./Menu";
import { ItemGroup as MenuItemGroup } from "./Menu";

export function SidebarContents() {
    return (
        <>
            <MenuItem link="/" icon={faHouse}>
                Home
            </MenuItem>
            <MenuItemGroup title="Me">
                <MenuItem link="/skill" icon={faKitchenSet}>
                    Skill
                </MenuItem>
                <MenuItem link="/something" icon={faOtter}>
                    Something
                </MenuItem>
            </MenuItemGroup>

            <MenuItem link="/gyagu" icon={faFaceSmile}>
                Gyagu
            </MenuItem>

            {/*<MenuItemGroup title="Diary">
                <MenuItem link="/diary/posts" icon={faBook}>
                    Articles
                </MenuItem>
                <MenuItem link="/diary/categories">Categories</MenuItem>
            </MenuItemGroup>
    */}
            {/*<MenuItem link="/contact" icon={faContactCard}>
                Contact
    </MenuItem>*/}
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
