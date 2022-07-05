import jwt from "jsonwebtoken";


const {SECRET} = process.env;

interface PayloadType {
    id: string;
    email: string;
    userLevel: "user" | "moderator" | "owner"
}

export default (payload: PayloadType) => {
    if (!SECRET) {
        console.error("Not secret key found", 404);
        return;
    }
    return jwt.sign(payload, SECRET, {
        expiresIn: "30m"
    });
}