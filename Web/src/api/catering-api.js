export const cateringAPI = {

    get: async serviceId =>
        await get(`Catering`, {serviceId}),

    add: async (name, street, city, state, serviceId) =>
        await post(`Catering`, {name, street, city, state, serviceId}),

    edit: async (id, name, street, city, state, serviceId) =>
        await put(`Catering`, {id, name, street, city, state, serviceId}),

    delete: async id =>
        await del(`Catering`, {id}),
}