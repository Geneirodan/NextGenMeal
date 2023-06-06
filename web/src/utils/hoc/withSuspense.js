import React from "react"
import {Preloader} from "../../components/common/Preloader";

export const withSuspense = WrappedComponent =>
    props => {
        return <React.Suspense fallback={<Preloader/>}>
            <WrappedComponent {...props} />
        </React.Suspense>
    };