import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

export const alertAtom = atom<{ isHidden: boolean; text: string; type: AlertType }>({
    isHidden: true,
    text: "",
    type: "None",
});

type AlertType = "Info" | "Success" | "Warn" | "Error" | "None";

export const useAlert = () => {
    const [alertInfo, setAlertInfo] = useAtom(alertAtom);
    const openAlert = (text: string, type?: AlertType) => {
        if (type) {
            setAlertInfo({ text: text, isHidden: false, type: type });
        } else {
            setAlertInfo({ text: text, isHidden: false, type: "Error" });
        }
    };
    const closeAlert = () => {
        setAlertInfo({ ...alertInfo, isHidden: true, type: "None" });
    };
    return { openAlert, closeAlert, alertInfo };
};

export default function Alert(): React.ReactNode {
    const { alertInfo, closeAlert } = useAlert();
    const [alertClass, setAlertClass] = useState("hidden");
    useEffect(() => {
        if (alertInfo.isHidden) {
            setAlertClass("hidden");
        } else {
            //console.log(alertInfo.type);
            switch (alertInfo.type) {
                case "Error":
                    setAlertClass("bg-red-200");
                    break;
                case "Info":
                    setAlertClass("bg-sky-200");
                    break;
                case "Warn":
                    setAlertClass("bg-yellow-200");
                    break;
                case "Success":
                    setAlertClass("bg-green-200");
                    break;
                case "None":
                    setAlertClass("bg-slate-200");
                    break;
            }
        }
    }, [alertInfo.isHidden, alertInfo.type]);
    return (
        <div className={"m-2 flex items-center rounded-md p-2 " + alertClass}>
            <div className="grow">{alertInfo.text}</div>

            <div onClick={closeAlert} role="button" className="mx-2">
                <FaCircleXmark className="text-xl" />
            </div>
        </div>
    );
}
