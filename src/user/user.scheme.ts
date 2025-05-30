import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  telegramId: number;

  @Prop()
  firstName: string;

  @Prop()
  userName: string;

  @Prop()
  joinedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
