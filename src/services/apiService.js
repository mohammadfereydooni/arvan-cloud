// services/apiService.js

import axios from 'axios';

const API_URL = 'http://5.34.201.164:3000/api';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, { user: userData });
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, loginData);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

export const getArticles = async () => {
    try {
        const response = await axios.get(`${API_URL}/articles`);
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
}


export const addArticle = async (articleData) => {
    try {
        const response = await axios.post(`${API_URL}/articles`, { article: articleData });
        return response.data;
    } catch (error) {
        console.error("Error adding article:", error);
        throw error;
    }
};

export const getTags = async () => {
    try {
        const response = await axios.get(`${API_URL}/tags`);
        return response.data;
    } catch (error) {
        console.log('error tagging:', error);
        throw error;
    }
};
