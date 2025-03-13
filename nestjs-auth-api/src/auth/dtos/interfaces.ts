export interface LoginResponse {
    access_token: string
}

export interface FetchUserResponse {
    email: string;
    createdAt: Date
}


export interface JwtPayload {
    id: string;
    email: string
}