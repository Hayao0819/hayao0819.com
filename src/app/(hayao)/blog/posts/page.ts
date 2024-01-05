import { redirect } from "next/navigation";

const page = async () => {
    redirect("/blog/1");
};

export default page;
