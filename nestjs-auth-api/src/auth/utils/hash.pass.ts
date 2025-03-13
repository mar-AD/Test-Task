import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        throw new InternalServerErrorException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to hash password',
        });
    }
};


export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

