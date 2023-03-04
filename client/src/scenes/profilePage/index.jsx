import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendsListWidget from "scenes/widgets/FriendsListWidget";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
    const { _id } = useSelector((state) => state.user);

    const getUser = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`},
        });

        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    if(!user) return null;

    return (
    <Box>
        <Navbar/>
        <Box 
          width='100%'
          padding='2rem 6%'
          display={isNonMobileScreens ? 'flex' : 'block'}
          gap='0.5rem'
          justifyContent='space-between'
        >
            <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                <UserWidget 
                    userId={user._id}
                    picturePath={user.picturePath}
                />
                <FriendsListWidget userId={userId} isProfile/>
            </Box>

            <Box flexBasis={isNonMobileScreens ? '42%' : undefined} mt={isNonMobileScreens ? undefined : '2rem'}>
                {(userId === _id) ? (<MyPostWidget picturePath={user.picturePath}/>) : (null)}
                
                <PostsWidget
                    userId={user._id}
                    isProfile
                />
            </Box>

            {isNonMobileScreens && (
              <Box flexBasis='26%'>
                  <AdvertWidget/>
              </Box>
          )}
        </Box>
    </Box>
    )
}

export default ProfilePage;