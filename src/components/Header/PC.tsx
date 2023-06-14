import { My } from "../Icons";
import { SideBar } from "../Sidebar";
import { Item as MenuItem } from "../Menu";

export function PC() {
    return (
        <SideBar>
            <My />
            <MenuItem link="/" label="Top" />
            <MenuItem link="https://google.com" label="Google" />
            <MenuItem link="/social" label="ソーシャル" />
        </SideBar>
    );
}
