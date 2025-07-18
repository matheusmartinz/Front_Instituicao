import CustomTypography from '../CustomTypography';

export type TCustomHeaderLogin = {
   imageSrc?: string;
   title: string;
   color?: string;
   marginTop?: string;
   imageUser?: boolean | null;
   onImageChange?: (base64: string, file?: File) => void;
};

const CustomHeaderLogin = (props: TCustomHeaderLogin) => {
   return (
      <>
         <img
            src={props.imageSrc}
            alt=""
            style={{
               maxWidth: '25%',
               maxHeight: '45%',
            }}
         />

         <CustomTypography title={props.title} color={props.color} marginTop={props.marginTop} />
      </>
   );
};
export default CustomHeaderLogin;
