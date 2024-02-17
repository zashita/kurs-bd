import React, { ReactNode } from 'react';


export interface PortalProps{
    children: ReactNode;
    element?: HTMLElement;

}
export const Portal = (props: PortalProps) => {
    // const {
    //     children,
    //     element = document.body,
    // } = props;
    //
    // return createPortal(children, element);
};
