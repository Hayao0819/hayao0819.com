import NextImage, { ImageProps } from "next/image";
import { ImgHTMLAttributes } from "react";

import { Modal } from "./Modal";
import { useModal } from "./ModalContext";

export function Image(props: ImageProps) {
    const mtx = useModal();
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
    const mtx = useModal();
    return (
        <>
            <img {...props} alt={props.alt} onClick={() => mtx.openModal("image-popup-modal")}></img>
            <Modal name="image-popup-modal">
                <p>現在準備中</p>
            </Modal>
        </>
    );
}
