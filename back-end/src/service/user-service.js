import { PrismaClient } from "@prisma/client";
import { loginUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import jwt from "jsonwebtoken";

const prismaClient = new PrismaClient();

const login = async (request) => {
    try {
        const loginRequest = validate(loginUserValidation, request);

        let user = await prismaClient.user.findUnique({
            where: {
                nama_karyawan: loginRequest.nama_karyawan,
            },
            select: {
                nama_karyawan: true,
                rate: true,
                token: true
            }
        });

        if (!user) {
            const newUser = await prismaClient.user.create({
                data: {
                    nama_karyawan: loginRequest.nama_karyawan,
                    rate: loginRequest.rate,
                    token: null
                }
            });

            const token = jwt.sign({ nama_karyawan: newUser.nama_karyawan, rate: newUser.rate }, 'secret', { expiresIn: '1h' });

            user = await prismaClient.user.update({
                where: {
                    nama_karyawan: newUser.nama_karyawan
                },
                data: {
                    token
                },
                select: {
                    nama_karyawan: true,
                    rate: true,
                    token: true
                }
            });
        } else {
            const updateData = {
                token: jwt.sign({ nama_karyawan: user.nama_karyawan, rate: loginRequest.rate }, 'secret', { expiresIn: '1h' })
            };

            if (user.rate !== loginRequest.rate) {
                updateData.rate = loginRequest.rate;
            }

            user = await prismaClient.user.update({
                where: {
                    nama_karyawan: loginRequest.nama_karyawan
                },
                data: updateData,
                select: {
                    nama_karyawan: true,
                    rate: true,
                    token: true
                }
            });
        }

        return {
            message: "Login success!",
            user
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const check = async (nama_karyawan) => {
    try {
        const findUser = await prismaClient.user.findUnique({
            where: {
                nama_karyawan: nama_karyawan
            },
        })

        console.log(findUser)

        return {
            message: "Token is valid!",
            user : findUser
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}   

export default {
    login,
    check
};
