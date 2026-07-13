import { redirect } from "next/navigation";

const page = async () => {
    redirect("/something");
};

export default page;
