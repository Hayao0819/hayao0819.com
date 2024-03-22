import { FC } from "react";

import CommonSpacer from "@/components/layouts/CommonSpacer";

const SelectPlayground: FC = () => {
    return (
        <CommonSpacer>
            <select size={2} className="size-24">
                {[...Array(100)].map((_, i) => (
                    <option key={i}>{i}</option>
                ))}
            </select>
        </CommonSpacer>
    );
};
export default SelectPlayground;
