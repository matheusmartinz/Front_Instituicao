import { memo } from 'react';

export type TCustomIconProps = {
    id: string;
    className: string;
    fontSize: string;
    color: string;
};

const CustomIcon = (props: TCustomIconProps) => {
    return (
        <i
            id={props.id}
            className={props.className}
            style={{ fontSize: props.fontSize, color: props.color }}
        />
    );
};

export default memo(CustomIcon);
