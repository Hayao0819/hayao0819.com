import SideBar from "@/components/SideBar/SideBar";

export default function Layout({children}){
    return (
        <>
            <header>
                <SideBar />
            </header>
            <main>
                { children }
            </main>
        </>
    )
}
