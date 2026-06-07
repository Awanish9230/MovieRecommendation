import { registerUser, loginUser, generateNewAccessToken } from './auth.service.js';
import {
    validateRegisterInput,
    validateLoginInput
} from "./auth.validation.js";

// --------------------REGISTER--------------------

export const register = async (req, res, next) => {
    try {
        validateRegisterInput(req.body);
        const data = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User Registered successfully",
            ...data
        });
    } catch (error) {
        next(error);
    }
};


// ------------------------LOGIN--------------------

export const login = async(req, res, next) => {
    try {
        validateLoginInput(req.body);
        const data = await loginUser(req.body);

        res.status(200).json({
            success : true,
            message : "Login successfully",
            ...data
        });
    } catch (error) {
        next(error);
    }
}

// ---------------------REFRESH TOKEN -----------------

export const refreshAccessToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        const accessToken = await generateNewAccessToken(refreshToken);

        res.status(200).json({
            success : true,
            accessToken
        });
    } catch (error) {
        next(error);
    }
};