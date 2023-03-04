import { Box } from '@mui/material';
import { convertLength } from '@mui/material/styles/cssUtils';

const UserImage = ({ image, size = '60px'}) => {
    return(
        <Box width={size} height={size}>
        <img 
            style={{ objectFit: convertLength, borderRadius: '50%'}}
            width={size}
            height={size}
            alt='user'
            src={`http://localhost:3001/assets/${image}`}
        />
        </Box>
    );
}

export default UserImage;