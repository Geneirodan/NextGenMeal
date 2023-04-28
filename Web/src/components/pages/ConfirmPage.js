import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useQueryParam} from 'use-query-params';
import {confirmEmail, selectors} from "../../store/account/login";
import {Preloader} from "../common/Preloader";

export const ConfirmPage = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation();
  const [id, setId] = useQueryParam("id")
  const [code, setCode] = useQueryParam("code")
  const confirmed = useSelector(selectors.confirmed)
  if(id && code){
    dispatch(confirmEmail({id,code}))
  }
  else return <div>Invalid</div>
  return confirmed === null ? <Preloader/> : confirmed ? <div>Confirmed</div> : <div>Not confirmed</div>;
}
