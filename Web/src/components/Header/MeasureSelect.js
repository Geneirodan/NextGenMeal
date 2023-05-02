import {useTranslation} from "react-i18next";
import {MenuItem, Select, Stack, Typography} from "@mui/material";
import {units} from "../../utils/hook/UseMeasurements";
import React from "react";
import {useMeasurements} from "../../utils/hook/UseMeasurements";

export const MeasureSelect = () => {
    const {t, i18n} = useTranslation();
    const {getUnit, measurements} = useMeasurements()

    const onChange = (event, measure) => measurements.set(measure.props.value);

    return <Stack spacing={1} direction="row" alignItems="center">
        <Typography>
            {t("Measure units")}:
        </Typography>
        <Select color="inherit"
                   variant="standard"
                   value={measurements.get()}
                   onChange={onChange}
                   disableUnderline={true}
                   sx={{
                       color: "inherit",
                       ".MuiSvgIcon-root ": {
                           fill: "white !important",
                       }
                   }}>
        {
            units.map(
                (name) =>
                    <MenuItem key={name} value={name}>
                        {getUnit(name)}
                    </MenuItem>)
        }
    </Select>
    </Stack>;
};