import { memo } from 'react';

export type TCustomIconProps = {
    id: string;
    className: string;
    fontSize?: string;
    color?: string;
    bgColor?: string;
    marginRight?: string;
    marginLeft?: string;
    marginTop?: string;
    cursor?: string;
    onClick?: () => void;
};

const CustomIcon = (props: TCustomIconProps) => {
    return (
        <i
            id={props.id}
            className={props.className}
            style={{
                fontSize: props.fontSize ?? '14px',
                color: props.color ?? 'white',
                marginRight: props.marginRight,
                marginLeft: props.marginLeft,
                marginTop: props.marginTop,
                cursor: props.cursor,
                backgroundColor: props.bgColor,
            }}
            onClick={props.onClick}
        />
    );
};

export default memo(CustomIcon);
