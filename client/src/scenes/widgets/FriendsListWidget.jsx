import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendsListWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const profile = isProfile;
    
    const getFriends = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`,{
            method: "GET",
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
          }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    }

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { palette } = useTheme();


    return(
        <WidgetWrapper>
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight='500'
            sx={{ mb: '1.5rem'}}
          >
            Friends List
          </Typography>
          <Box display='flex' flexDirection='column' gap='1.5rem'>
            {friends.map((friend) => (
                <Friend 
                key={friend._id}
                friendId={friend._id} 
                name={`${friend.firstName} ${friend.lastName}`} 
                subtitle={friend.location} 
                userPicturePath={friend.picturePath}
                profile={profile}
                />
            ))}
          </Box>
        </WidgetWrapper>
    )
};

export default FriendsListWidget;