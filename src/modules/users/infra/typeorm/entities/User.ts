import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  public _id: string;

  @Column()
  public discord_id: number;

  @Column()
  public name: string;

  @Column()
  public profile_pic: string;

  @Column({ default: 0 })
  public warns: number;

  @Column({ default: 0 })
  public all_time_warns: number;
}
