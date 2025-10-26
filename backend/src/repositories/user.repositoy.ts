    import User from "../models/user.model";

    export class UserRepository {
        async findByEmail(email:string){
            return await User.findOne({email})
        }
        async createUser(data: {
  firstname?: string | undefined;
  lastname?: string | undefined;
  email: string;
  password?: string | undefined;
  isActive?: boolean | undefined;
  startedAt?: Date | undefined;
  plan?: string | undefined;
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

        async findAllUsers(){
            return await User.find({role:'user'},"-password").sort({createdAt:-1})
        }

        async toggleUserStatus(userId:string){
            const user = await User.findById(userId)
            if(!user) throw new Error("User not found")

            user.isActive = !user.isActive
            await user.save()

            return {
                id:user._id,
                isActive:user.isActive
            }
        }
    }