import React, {memo, useCallback} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import {useOpen} from "../../../utils/hook/hooks";
import {units, useMeasurements} from "../../../utils/hook/UseMeasurements";

export const SettingsDialogMenuItem = memo(
    () => {
        const {t, i18n} = useTranslation();
        const [open, onClick, onClose] = useOpen()
        const {getUnitSymbol, unit, setUnit} = useMeasurements()
        const onChange = useCallback(
            (event, measure) => setUnit(measure.props.value),
            []
        )
        const callbackfn = useCallback(
            name =>
                <MenuItem key={name} value={name}>
                    {getUnitSymbol(name)}
                </MenuItem>,
            []
        )
        return <>
            <MenuItem onClick={onClick}>
                {t("Settings")}
            </MenuItem>
            <Dialog open={open} keepMounted onClose={onClose}>
                <DialogTitle>{t("Settings")}</DialogTitle>
                <DialogContent>
                    <Stack spacing={1} direction="row" alignItems="center"  pl={3}>
                        <Typography>
                            {t("Measure units")}:
                        </Typography>
                        <Select color="inherit" variant="standard" value={unit} onChange={onChange} disableUnderline>
                            {units.map(callbackfn)}
                        </Select>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        {t("Close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    }
)