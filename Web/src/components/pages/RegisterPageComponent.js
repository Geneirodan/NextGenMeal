import {Button, Container, Stack, Typography} from "@mui/material";
import {Errors} from "../common/Errors";
import {CustomTextField} from "../common/TextFields";
import React from "react";

export const RegisterPageComponent = ({errors, formik, t}) => <form onSubmit={formik.handleSubmit}>
    <Container maxWidth="sm">
        <Stack spacing={4}>
            <Typography variant="h3" align="center">
                {t("Register")}
            </Typography>
            <Errors errors={errors} t={t}/>
            <CustomTextField name="name" formik={formik} label={t("Name")}/>
            <CustomTextField name="email" formik={formik} label={t("Email")}/>
            <CustomTextField name="password" type="password" formik={formik} label={t("Password")}/>
            <CustomTextField name="confirmPassword" type="password" formik={formik} label={t("Confirm password")}/>
            <Stack spacing={2}>
                <Button variant="contained" type="submit">
                    {t("Sign up")}
                </Button>
            </Stack>
        </Stack>
    </Container>
</form>;