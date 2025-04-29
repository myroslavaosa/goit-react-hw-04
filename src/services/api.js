import axios from "axios";

const ACCESS_KEY = "LJqbt5yV5FqlrZSyObhKv23qwa4p_AYcuTtdZZNnKQo";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = async(query, page = 1, perPage = 12) => {
    const response = await axios.get('/search/photos', {
        params: {
            query,
            page,
            per_page: perPage,
            client_id: ACCESS_KEY,
        },
    });
    return response.data;
};