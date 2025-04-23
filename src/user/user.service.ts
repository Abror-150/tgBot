import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.scheme';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async findUser(from: any) {
    const exiting = await this.user.findOne({ telegramId: from.id });
    if (exiting) return exiting;
    const createUser = await this.user.create({
      telegramId: from.id,
      firstName: from.firstName,
      userName: from.firstName,
      joinedAt: new Date(),
    });
    return createUser.save();
  }
}
