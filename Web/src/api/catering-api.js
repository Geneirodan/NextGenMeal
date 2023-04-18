let controller = 'Catering';
export const cateringAPI = {

    get: async serviceId =>
        await get(`${controller}`, {serviceId}),

    add: async (name, street, city, state, serviceId) =>
        await post(`${controller}`, {name, street, city, state, serviceId}),

    edit: async (id, name, street, city, state, serviceId) =>
        await put(`${controller}`, {id, name, street, city, state, serviceId}),

    delete: async id =>
        await del(`${controller}`, {id}),
}