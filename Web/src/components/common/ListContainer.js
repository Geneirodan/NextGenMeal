import {Box, Breadcrumbs, Container, Fab, Stack, Typography} from "@mui/material";
import {Paginator} from "./Paginator";
import {Preloader} from "./Preloader";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export const ListContainer = ({
                                  editDialog,
                                  filter,
                                  items,
                                  loading,
                                  onClick,
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
        {editDialog}
        <Fab color="primary" sx={{position: "absolute", bottom: 16, right: 16}} onClick={onClick}>
            <AddIcon/>
        </Fab>
    </Container>;