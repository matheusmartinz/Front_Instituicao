import { Menu } from '@mui/material';
import { ReactNode } from 'react';

export type TCustomMenuProps = {
    open: boolean;
    anchorEl: null | HTMLElement;
    onClose: () => void;
    children: ReactNode;
};

const CustomMenu = (props: TCustomMenuProps) => {
    return (
        <>
            <Menu
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.onClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {props.children}
            </Menu>
        </>
    );
};

export default CustomMenu;
