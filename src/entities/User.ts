import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { IsEmail, Length } from "class-validator";
import bcrypt from "bcrypt";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  @IsEmail()
  name!: string;
  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @Length(6, 100)
  password!: string;

  @Column({
    type: "enum",
    enum: ["adopter", "admin"],
    default: "adopter",
  })
  role!: string;
  @Column({ nullable: true }) // Campo para armazenar o token de redefinição de senha
  resetPasswordToken?: string;

  @Column({ nullable: true }) // Campo para armazenar a data de expiração do token
  resetPasswordExpires?: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
