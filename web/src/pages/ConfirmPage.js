import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import { useQueryParam } from 'use-query-params';
import {confirmEmail} from "../store/user/thunks";
import {userSelectors} from "../store/user/selectors";
import {Preloader} from "../components/common/Preloader";

export const ConfirmPage = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation();
  const [id, setId] = useQueryParam("id")
  const [code, setCode] = useQueryParam("code")
  const confirmed = useSelector(userSelectors.confirmed)
  console.log({id,code})
  if(id && code){
    dispatch(confirmEmail({id,code}))
  }
  else return <div>Invalid</div>
  return confirmed === null ? <Preloader/> : confirmed ? <div>Confirmed</div> : <div>Not confirmed</div>;
}
