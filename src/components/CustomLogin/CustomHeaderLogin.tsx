import { ChangeEvent } from "react";
import CustomTypography from "../CustomTypography";

export type TCustomHeaderLogin = {
    imageSrc?: string;
    title: string;
    color?: string;
    marginTop?: string;
    imageUser?: boolean | null;
    onImageChange?: (base64: string) => void;
};

const CustomHeaderLogin = (props: TCustomHeaderLogin) => {
    const onChangeUserImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            props.onImageChange?.(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <img
                src={props.imageSrc}
                alt=""
                style={{
                    maxWidth: "25%",
                    maxHeight: "45%",
                }}
            />
            {props.imageUser && (
                <input
                    type="file"
                    accept="image/*"
                    style={{ marginTop: "20px" }}
                    onChange={onChangeUserImage}
                />
            )}
            <CustomTypography title={props.title} color={props.color} marginTop={props.marginTop} />
        </>
    );
};
export default CustomHeaderLogin;
