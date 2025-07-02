import { Tooltip } from '@mui/material';
import CustomIcon from './CustomIcon';

const IconsFooter = () => {
    return (
        <>
            <Tooltip title={'Instagram'} placement="bottom-start">
                <CustomIcon
                    className="fab fa-instagram"
                    id={''}
                    fontSize="18px"
                    bgColor="#292929"
                    padding="10px"
                    border="50px"
                    onClick={() => {}}
                    hoverEffect={true}
                />
            </Tooltip>
            <CustomIcon
                className="fab fa-twitter"
                id=""
                fontSize="18px"
                bgColor="#292929"
                padding="10px"
                border="50px"
                marginLeft="13px"
                onClick={() => {}}
                hoverEffect={true}
            />
            <CustomIcon
                className="fab fa-facebook"
                id=""
                fontSize="18px"
                bgColor="#292929"
                padding="10px"
                border="50px"
                marginLeft="13px"
                onClick={() => {}}
                hoverEffect={true}
            />
        </>
    );
};

export default IconsFooter;
