import {useTranslation} from "react-i18next";
import {MenuItem, Select, Stack, Typography} from "@mui/material";
import {units, useMeasurements} from "../../utils/hook/UseMeasurements";
import React, {memo, useCallback} from "react";

export const MeasureSelect = memo(
    () => {
        const {t, i18n} = useTranslation();
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
        return <Stack spacing={1} direction="row" alignItems="center">
            <Typography>
                {t("Measure units")}:
            </Typography>
            <Select color="inherit"
                    variant="standard"
                    value={unit}
                    onChange={onChange}
                    disableUnderline
                    sx={{
                        color: "inherit",
                        ".MuiSvgIcon-root ": {
                            fill: "white !important",
                        }
                    }}>
                {
                    units.map(callbackfn)
                }
            </Select>
        </Stack>
    }
)