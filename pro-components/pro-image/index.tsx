import React from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface Props extends React.ComponentProps<"img"> {

}

export const ProImage = (props: Props) => {
    return (
        <Zoom>
            <img {...props} />
        </Zoom>
    )
}