import NextImage, { ImageProps } from "next/image";
import { ImgHTMLAttributes, useContext } from "react";

import { Modal } from "./Modal";
import { modalContext } from "./ModalContext";

export function Image(props: ImageProps) {
    const mtx = useContext(modalContext);
    return (
        <>
            <NextImage {...props} alt={props.alt} onClick={() => mtx.openModal("image-popup-modal")}></NextImage>
            <Modal name="image-popup-modal">
                <p>現在準備中</p>
            </Modal>
        </>
    );
}

/* eslint "@next/next/no-img-element":"off" */
export function ImageWithoutNextImg(props: ImgHTMLAttributes<HTMLImageElement>) {
    const mtx = useContext(modalContext);
    return (
        <>
            <img {...props} alt={props.alt} onClick={() => mtx.openModal("image-popup-modal")}></img>
            <Modal name="image-popup-modal">
                <p>現在準備中</p>
            </Modal>
        </>
    );
}
