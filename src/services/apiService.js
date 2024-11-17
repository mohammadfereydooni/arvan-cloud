// services/apiService.js

import axiosInstance from '../interceptor/axiosInstance';
import notificationService from "@/services/notificationService";


const API_URL = 'http://5.34.201.164:3000/api';

export const registerUser = async (userData) => {
        const response =  await axiosInstance.post(`${API_URL}/users`, { user: userData });
        return response.data;
};

export const loginUser = async (loginData) => {

        const response =  await axiosInstance.post(`${API_URL}/users/login`, loginData);
        return response.data;

};

export const getArticles = async () => {
    try {
        const response =  await axiosInstance.get(`${API_URL}/articles`);
        return response.data.articles;
    } catch (error) {
        notificationService.error(error);
    }
}


export const addArticle = async (articleData) => {
        const response =  await axiosInstance.post(`${API_URL}/articles`,  articleData);
        return response.data;
};

export const getTags = async () => {
    try {
        const response =  await axiosInstance.get(`${API_URL}/tags`);
        return response.data;
    } catch (error) {
        notificationService.error(error);
        throw error;
    }
};

export const updateArticle = async (slug, payload) => {
        const response = await axiosInstance.put(`${API_URL}/articles/${slug}`, payload);
        return response.data;

};


export const getArticleBySlug = async (slug) => {
    const response = await axiosInstance.get(`${API_URL}/articles/${slug}`);
    return response.data;
};

export const deleteArticle = async (slug) =>{
    const response = await axiosInstance.delete(`${API_URL}/articles/${slug}`);
    return response.data;
}

