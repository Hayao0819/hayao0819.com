export const dateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}/${month}/${day}`;
};

export const recursivePath = (pathName: string) => {
    const splited = pathName.split("/").filter((s) => s !== "");

    return splited.map((d, i) => {
        //return path.join(...splited.slice(undefined, i), d);
        // path.joinを使わない
        return splited.slice(undefined, i + 1).join("/");
    });
};
