
import {Box, Container, Stack, Typography} from "@mui/material";
import {Paginator} from "./Paginator";
import {Preloader} from "./Preloader";
import React, {memo} from "react";

export const ListContainer = memo(
    ({filter, items, loading, itemCallback, setFilter, totalCount, filters, emptyLabel, ...restProps}) =>
        <Container {...restProps}>
            <Stack spacing={2}>
                {filters}
                {
                    totalCount
                        ? <>
                            {
                                loading
                                    ? <Preloader/>
                                    : items.map(itemCallback)
                            }
                            <Paginator totalCount={totalCount} filter={filter} setFilter={setFilter}/>
                        </>
                        : <Box>
                            <Typography variant="h4" align="center">
                                {emptyLabel}
                            </Typography>
                        </Box>
                }
            </Stack>
        </Container>
)