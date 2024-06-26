import {withRole} from "../../../utils/hoc/withRole";
import {useDispatch, useSelector} from "react-redux";
import React, {memo, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getEmployees, register, selector} from "../../../store/employee";
import {SearchComponent} from "../../common/inputs/SearchComponent";
import {ListContainer} from "../../common/ListContainer";
import {useTranslation} from "react-i18next";
import {AddFab} from "../../common/buttons/AddFab";
import {EditDialogButton} from "../../common/dialogs/EditDialogButton";
import {useUpdate} from "../../../utils/hook/hooks";
import {EmployeeListItem} from "../../common/listItems/EmployeeListItem";
import {EmployeeRegisterDialog} from "../../common/dialogs/EmployeeRegisterDialog";
import {roles} from "../../../utils/constants";
import {setUpdated} from "../../../store/common";

export const EmployeesPage = memo(
    withRole(roles.Service)(
        () => {
            const {t} = useTranslation()
            const {cateringId} = useParams()
            const {items, totalCount} = useSelector(selector("employees"))
            const updated = useUpdate()
            const dispatch = useDispatch()
            const [filter, setFilter] = useState({cateringId})
            const [loading, setLoading] = useState(false)
            const itemCallback = useCallback(
                employee => <EmployeeListItem key={employee.id} employee={employee}/>,
                []
            )
            useEffect(
                () => {
                    setLoading(true)
                    dispatch(getEmployees(filter))
                    updated && dispatch(setUpdated(false))
                },
                [filter, updated]
            )
            useEffect(
                () => setLoading(false),
                [items]
            )
            return <>
                <ListContainer filter={filter}
                               filters={<SearchComponent filter={filter} setFilter={setFilter}/>}
                               setFilter={setFilter}
                               items={items}
                               loading={loading}
                               itemCallback={itemCallback}
                               totalCount={totalCount}
                               emptyLabel={t("No employee found")}/>
                <EditDialogButton EditDialog={EmployeeRegisterDialog} EditButton={AddFab} editAction={register}
                                  cateringId={cateringId}/>
            </>
        }
    )
)