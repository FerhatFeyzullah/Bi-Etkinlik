import React from 'react'
import '../../css/Admin/AdminNavbar.css'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutFromSystem } from '../../redux/slices/authSlice';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormLabel } from '@mui/material';
import { SetLanguage, UpdateLanguage } from '../../redux/slices/userSettingSlice';


function AdminNavbar() {
    const { t: tButton } = useTranslation("button");
    const { t: tText } = useTranslation("text");
    const { t: tTooltip } = useTranslation("tooltip");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { i18n } = useTranslation();

    const { language } =
        useSelector((store) => store.userSetting);


    const UserId = localStorage.getItem("UserId");

    const HandleChangeLanguage = (event) => {
        const newLanguage = event.target.value;
        dispatch(SetLanguage(newLanguage));
        i18n.changeLanguage(newLanguage);
        dispatch(UpdateLanguage({ AppUserId: UserId, Language: newLanguage }));
    };

    const SignOut = async () => {
        try {
            await dispatch(LogoutFromSystem()).unwrap();
            localStorage.clear();
            dispatch({ type: "auth/logout" });
            navigate("/girisyap");
        } catch (error) {
            console.error("Çıkış başarısız:", error);
        }
    };

    return (
        <div className='admin-navbar-container'>
            <div className='flex-row-justify-space-between admin-navbar-title'>
                <div className="flex-column" style={{ marginLeft: "10px" }}>
                    <div className='admin-navbar-language-title'>Sistem Dili</div>
                    <FormControl sx={{ width: "110px" }} size="small">
                        <Select value={language} onChange={HandleChangeLanguage}>
                            <MenuItem value={"tr"}>{tText("turkish")}</MenuItem>
                            <MenuItem value={"en"}>{tText("english")}</MenuItem>
                            <MenuItem value={"de"}>{tText("deutsch")}</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div style={{ marginLeft: "60px" }}>
                    <h1>
                        {tText("adminNavbarHeader")}
                    </h1>
                </div>

                <div>
                    <Button variant="outlined"
                        color="error"
                        fullWidth
                        sx={{ width: "150px", marginRight: "20px" }}
                        startIcon={<LogoutIcon />}
                        onClick={SignOut}

                    >
                        {tButton("signOut")}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar