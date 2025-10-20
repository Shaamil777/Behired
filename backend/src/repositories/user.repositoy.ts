    import User from "../models/user.model";

    export class UserRepository {
        async findByEmail(email:string){
            return await User.findOne({email})
        }
        async createUser(data: {
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  isActive?: boolean;
  startedAt?: Date;
  plan?: string;
  googleId?: string | null | undefined; // already done
}) {
  return await User.create(data);
}

        async updatePassword(email:string,hashedPassword:string){
            return await User.updateOne(
                {email},
                {$set:{password:hashedPassword}}
            )
        }
    }