import { FC } from "react";

const SelectPlayground: FC = () => {
    return (
        <div className="m-auto flex w-fit items-start justify-center border-4 border-base-content">
            <div className="grid grid-cols-[auto_1fr] gap-0">
                <h1 className="border-r-4 border-base-content p-4 text-3xl font-bold [writing-mode:vertical-lr]">Select</h1>
                <div className="flex items-center justify-center p-6">
                    <select size={10} className="border border-base-content p-2">
                        {[...Array(100)].map((_, i) => (
                            <option key={i}>{i}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
export default SelectPlayground;
