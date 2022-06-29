import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity()
class Users {
  
  @PrimaryColumn({
    generated: "uuid"
  })
  id: string;
  
  @Column()
  firstName: string;
  
  @Column()
  lastName: string;
  
  @Column()
  email: string;
  
  @Column()
  passwordHash: string;
  
  @Column({
    default: false
  })
  isDeleted: boolean;

  @Column({
    enum: ['user', 'moderator', 'owner'],
    default: "user"
  })
  userLevel: "user" | "moderator" | "owner";
  
  @CreateDateColumn({
    default: new Date(Date.now())
  })
  createdAt: Date;
  
  @UpdateDateColumn({
    default: new Date(Date.now())
  })
  updatedAt: Date;
};

export default Users;