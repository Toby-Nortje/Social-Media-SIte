import {
    EditOutlined,
    DeleteOutlined,
    MoreHorizOutlined
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme, InputBase, Button, IconButton, useMediaQuery } from '@mui/material';
import UserImage from 'components/UserImage';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';

const Comment = ({postId}) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handleComment = async () => {
        const formData = new FormData();
        formData.append('comment', comment);


        const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
            method: "POST",
            mode: 'no-cors',
            headers: { 
                Authorization: `Bearer ${token}`,
            },
            body: formData
        });
        const updatedPosts = await response.json();
        console.log(updatedPosts);
        dispatch(setPosts({ updatedPosts }));
        setComment('');
    };

    return(
        <FlexBetween>
            <InputBase
                placeholder="Comment" 
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: '2rem',
                    padding: '1rem 2rem'
                  }}
            />
            <Button
                disabled={!comment}
                onClick={handleComment}
                sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: '3rem'
                }}
            >
                Comment
            </Button>
        </FlexBetween>
    )
};

export default Comment;