import {Box, Breadcrumbs, Container, Fab, Stack, Typography} from "@mui/material";
import {Paginator} from "./Paginator";
import {Preloader} from "./Preloader";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export const ListContainer = ({
                                  filter,
                                  items,
                                  loading,
                                  itemCallback,
                                  setFilter,
                                  totalCount,
                                  filters,
                                  emptyLabel
                              }) =>
    <Container>
        <Stack spacing={2}>
            {filters}
            {
                loading ? <Preloader/> : totalCount ? <>
                    <Paginator totalCount={totalCount} filter={filter} setFilter={setFilter}/>
                    {loading ? <Preloader/> : items.map(itemCallback)}
                    <Paginator totalCount={totalCount} filter={filter} setFilter={setFilter}/>
                </> : <Box>
                    <Typography variant="h4" align="center" >
                        {emptyLabel}
                    </Typography>
                </Box>
            }
        </Stack>
    </Container>;