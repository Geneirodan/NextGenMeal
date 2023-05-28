import React, {memo, useCallback} from "react";
import {Card, Stack, Typography} from "@mui/material";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {block, unblock} from "../../../store/admin"
export const UserListItem = memo(
    ({user, isLocked}) => {
        const {t} = useTranslation()
        const dispatch = useDispatch()
        const onLock = useCallback(
            () => dispatch(block(user.id)),
            [dispatch, user.id]
        )
        const onUnlock = useCallback(
            () => dispatch(unblock(user.id)),
            [dispatch, user.id]
        )
        return <Card sx={{padding: 1}}>
            <Stack direction="row" justifyContent="space-between" alignItems="end">
                <Typography>
                    {t("Full name")}: {user.name}<br/>
                    {user.country && `${t("Country")}: ${user.country}`}
                </Typography>
                {
                    isLocked
                        ? <Button variant="outlined" color="success" onClick={onUnlock}
                                  startIcon={<LockOpenOutlinedIcon/>}>
                            {t("Unlock")}
                        </Button>
                        : <Button variant="outlined" color="primary" onClick={onLock} startIcon={<LockOutlinedIcon/>}>
                            {t("Lock")}
                        </Button>
                }
            </Stack>
        </Card>;
    }
);