import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { bcryptPassword } from "../utils/bcrypt";
import { UserDTO } from "./user.dto";
import { User } from "./user.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    create(UserDTO: UserDTO): Promise<User> {
        const hashedPassword = bcryptPassword(UserDTO.password);
        console.log(UserDTO);
        console.log(hashedPassword);
        
        

        return this.userModel.create({
            username: UserDTO.username,
            password: hashedPassword
        })
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    findOne(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            }
        })
    }
}