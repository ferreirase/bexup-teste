import { IsNotEmpty } from 'class-validator';

export default class User {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  organization: string;

  @IsNotEmpty()
  sector: string;

  @IsNotEmpty()
  refresh_token?: string;

  constructor(user?: Partial<User>) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.sector = user.sector;
  }
}
