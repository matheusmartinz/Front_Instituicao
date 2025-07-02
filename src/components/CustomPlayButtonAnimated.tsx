// import { keyframes } from '@emotion/react';
// import CustomWhiteButton from './CustomWhiteButton';

// const fadeInUp = keyframes`
//   from {
//     opacity: 0;
//     transform: translate(-50%, -50%) translateY(8px);
//   }
//   to {
//     opacity: 1;
//     transform: translate(-50%, -50%) translateY(0);
//   }
// `;

// const CustomPlayButtonAnimated = () => {
//     return (
//         <CustomWhiteButton
//             icon="fas fa-play"
//             sx={{
//                 top: '50%',
//                 left: '50%',
//                 transform: `translate(-50%, -50%) translateY(0px)`,
//                 opacity: 1,
//                 animation: `${fadeInUp} 0.3s ease-out`,
//                 fontSize: 18,
//                 color: 'white',
//                 pointerEvents: 'none',
//                 width: '50px',
//                 height: '50px',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: '50%',
//                 position: 'absolute',
//             }}
//         />
//     );
// };

// export default CustomPlayButtonAnimated;

import { keyframes } from '@emotion/react';
import { Button } from '@mui/material';
import CustomIcon from './CustomIcon';

const fadeInUp = keyframes`
 from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const CustomPlayButtonAnimated = () => {
    return (
        <Button
            disableRipple
            sx={{
                bottom: '80px',
                right: '25px',
                opacity: 1,
                animation: `${fadeInUp} 0.3s ease-out`,
                fontSize: 18,
                color: 'black',
                pointerEvents: 'none',
                width: '50px',
                height: '50px',
                minWidth: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: '#1ED760',
            }}
        >
            <CustomIcon
                className="fas fa-play"
                fontSize="20px"
                color="black"
                id={''}
            />
        </Button>
    );
};

export default CustomPlayButtonAnimated;
