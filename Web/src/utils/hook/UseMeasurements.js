import {useCookies} from "react-cookie";
import {useTranslation} from "react-i18next";

export const units = ['gram', 'ounce']

const ratios = {
    'ounce': 28.35,
    'gram': 1
}

const measurement = 'measurement';
export const useMeasurements = () => {
    const {i18n} = useTranslation()
    const [cookies, setCookie] = useCookies([measurement])
    if(!cookies[measurement])
        setCookie(measurement, units[0], {path: '/'})
    const m = (value, unit = cookies[measurement]) => {
        const numberFormat = Intl.NumberFormat(i18n.resolvedLanguage, {style: 'unit', unit});
        return numberFormat.format(value / ratios[unit]);
    }
    return {
        m,
        unit: cookies[measurement],
        setUnit: value => setCookie(measurement, value, {path: '/'}),
        toCI: (value, unit = cookies[measurement]) => value * ratios[unit],
        toUnit: (value, unit = cookies[measurement]) => value / ratios[unit],
        getUnitSymbol: (unit = cookies[measurement]) => m(0, unit).substring(2)
    }
}