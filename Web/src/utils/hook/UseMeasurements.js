import {useCookies} from "react-cookie";
import {useTranslation} from "react-i18next";

export const units = ['gram', 'ounce']

const ratios = {
    'ounce': 28.35,
    'gram': 1
}

export const useMeasurements = () => {
    const {i18n} = useTranslation()
    const [cookies, setCookie] = useCookies(['measurement'])
    const m = (value, unit = cookies['measurement']) => {
        const numberFormat = Intl.NumberFormat(i18n.resolvedLanguage, {style: 'unit', unit});
        return numberFormat.format(value / ratios[unit]);
    }
    return {
        m,
        measurements: {
            get: () => cookies['measurement'],
            set: (value) => setCookie('measurement', value, {path: '/'})
        },
        toCI: (value, unit = cookies['measurement']) => value * ratios[unit],
        toUnit: (value, unit = cookies['measurement']) => value / ratios[unit],
        getUnit: (unit = cookies['measurement']) => m(0, unit).substring(2)
    }
}