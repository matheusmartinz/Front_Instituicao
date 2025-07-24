import { memo, useState } from 'react';

export type TCustomIconProps = {
   id: string;
   className: string;
   fontSize?: string;
   color?: string;
   bgColor?: string;
   hoverBgColor?: string; // NOVO: cor no hover
   marginRight?: string;
   marginLeft?: string;
   marginTop?: string;
   cursor?: string;
   // eslint-disable-next-line no-undef
   onClick?: (event: React.MouseEvent<HTMLElement>) => void;
   padding?: string;
   border?: string;
   hoverEffect?: boolean;
};

const CustomIcon = (props: TCustomIconProps) => {
   const [isHovered, setIsHovered] = useState(false);

   const handleMouseEnter = () => {
      if (props.hoverEffect) setIsHovered(true);
   };

   const handleMouseLeave = () => {
      if (props.hoverEffect) setIsHovered(false);
   };

   const backgroundColor =
      isHovered && props.hoverEffect
         ? props.hoverBgColor ?? '#7F7F7F' // padrão branco
         : props.bgColor;

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
            backgroundColor,
            padding: props.padding,
            borderRadius: props.border,
            transition: 'background-color 0.1s',
         }}
         onClick={props.onClick}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      />
   );
};

export default memo(CustomIcon);
