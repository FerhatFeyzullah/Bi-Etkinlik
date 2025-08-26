import React from 'react'
import '../../css/Admin/ReviewUserCard.css'
import { IconButton } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import { SetRemoveAccountDialog, SetTheRemovedAccount } from '../../redux/slices/accountSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


function ReviewUserCard({ user }) {
    const { t: tText } = useTranslation("text");
    const dispatch = useDispatch();

    const DeleteUser = () => {
        dispatch(SetTheRemovedAccount(user.id))
        dispatch(SetRemoveAccountDialog(true))
    }
    return (
        <div className='review-user-card-container flex-row'>

            <div className='flex-column-align-start review-user-card-name-phase' >
                <div style={{ margin: "2px" }}>
                    {user.firstName} {user.lastName}
                </div>
                <div style={{ margin: "2px" }}>
                    {user.userName}
                </div>
                <div style={{ margin: "2px" }}>
                    {tText("communityScore")} {user.score}
                </div>
            </div>
            <IconButton onClick={DeleteUser}>
                <DeleteIcon fontSize='large' />
            </IconButton>

        </div>
    )
}

export default ReviewUserCard