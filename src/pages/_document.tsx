import { Html, Head } from 'next/document'
import { Main, NextScript } from "next/document"
import SideBar from '@/components/SideBar/SideBar'
import Metadata from "../const/meta"


export default function Document(){
    return (
        <Html lang='ja'>
            <Head>
                <Meta />
            </Head>
            <Body />
        </Html>
    )
}

function Meta(){
    return (
        <>
            <meta name="description" content={Metadata.description} />
        </>
    )
}

function Body(){
    return (
        <body>
            <div className="container-fluid h-100">
                <SideBar />
                <Main />
                <NextScript />
            </div>
        </body>
    )
}
