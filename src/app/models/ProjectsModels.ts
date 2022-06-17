import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity()
class Project {
  
  @PrimaryColumn()
  id: string;
  
  @Column()
  title: string;
  
  @Column()
  description: string;
  
  @Column({
    nullable: false
  })
  githubUrl: string;
  
  @Column({
    nullable: true
  })
  hostUrl: string;

  @CreateDateColumn({
    default: new Date(Date.now())
  })
  createdAt: Date;
  
  @UpdateDateColumn({
    default: new Date(Date.now())
  })
  updatedAt: Date;
};