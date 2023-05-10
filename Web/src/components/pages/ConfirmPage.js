import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useQueryParam} from 'use-query-params';
import {confirmEmail, selector} from "../../store/account/login";
import {Preloader} from "../common/Preloader";

export const ConfirmPage = () => {
  const dispatch = useDispatch()
  const [id] = useQueryParam("id")
  const [code] = useQueryParam("code")
  const confirmed = useSelector(selector("confirmed"))
  if(id && code){
    dispatch(confirmEmail({id,code}))
  }
  else return <div>Invalid</div>
  return confirmed === null ? <Preloader/> : confirmed ? <div>Confirmed</div> : <div>Not confirmed</div>;
}
