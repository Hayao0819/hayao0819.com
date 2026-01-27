import { FC } from "react";

const SelectPlayground: FC = () => {
    return (
        <div className="border-border m-auto flex w-full max-w-md items-start justify-center border-4">
            <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-[auto_1fr]">
                <h1 className="border-border hidden border-r-4 p-4 text-3xl font-bold [writing-mode:vertical-lr] md:block">Select</h1>
                <h1 className="border-border border-b-4 p-4 text-3xl font-bold md:hidden">Select</h1>
                <div className="flex items-center justify-center p-6">
                    <select size={10} className="border-border border p-2">
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
