import jwt from "jsonwebtoken";

/* -------------------- ACCESS TOKEN -------------------- */

export const generateAccessToken =
(userId) => {

    return jwt.sign(

        { id: userId },

        process.env.JWT_SECRET,

        {
            expiresIn: "15m"
        }

    );

};

/* -------------------- REFRESH TOKEN -------------------- */

export const generateRefreshToken =
(userId) => {

    return jwt.sign(

        { id: userId },

        process.env.JWT_REFRESH_SECRET,

        {
            expiresIn: "7d"
        }

    );

};

/* -------------------- VERIFY ACCESS TOKEN -------------------- */

export const verifyAccessToken =
(token) => {

    return jwt.verify(

        token,

        process.env.JWT_SECRET

    );

};

/* -------------------- VERIFY REFRESH TOKEN -------------------- */

export const verifyRefreshToken =
(token) => {

    return jwt.verify(

        token,

        process.env.JWT_REFRESH_SECRET

    );

};