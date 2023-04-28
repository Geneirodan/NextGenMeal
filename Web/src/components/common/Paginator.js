import {NumberParam, useQueryParam} from "use-query-params";
import React, {useEffect} from "react";
import {Pagination, Stack} from "@mui/material";

export const Paginator = ({filter, setFilter, totalCount}) => {
    const [page, setPage] = useQueryParam('page', NumberParam)
    useEffect(() => {
        if (page)
            setFilter({...filter, page})
    }, [page])
    const onChange = (e, page) => setPage(page);
    return <Stack alignItems="center">
        <Pagination count={Math.ceil(totalCount / 10)} onChange={onChange} page={page} showFirstButton showLastButton/>
    </Stack>
};