import React, {memo} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import {useErrors} from "../../../utils/hook/hooks";

export const EditDialog = memo(
    ({title, formik, onClose, open, fields}) => {
        const {t} = useTranslation()
        const errors = useErrors()
        return <Dialog open={open} keepMounted onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogTitle>{title}</DialogTitle>
                    <Stack spacing={2}>
                        {errors && errors["Common"]?.map(error =>
                            <Typography variant="body1" align="center" key={error}>
                                {t(error)}
                            </Typography>)}
                    </Stack>
                    <Stack spacing={2}>
                        {fields}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Revert</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>;
    }
)