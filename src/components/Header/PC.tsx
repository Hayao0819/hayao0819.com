import { My } from "../Icons";
import { SideBar } from "../Sidebar";
import { Item as MenuItem } from "../Menu";

export function PC() {
    return (
        <SideBar>
            <My />
            <MenuItem link="/">Top</MenuItem>
            <MenuItem link="">Skill</MenuItem>
            <MenuItem link="/social">Social</MenuItem>
            <MenuItem link="">Contact</MenuItem>
            <MenuItem link="https://old.hayao0819.com">Old Page</MenuItem>
        </SideBar>
    );
}
