import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Card } from '@models/card.model';

@Table({
  tableName: 'image',
  timestamps: false,
})
export class Image extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Card)
  @Column({
    type: DataType.STRING,
    field: 'card_id',
    allowNull: false,
  })
  declare cardId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare type: string;

  @BelongsTo(() => Card, {
    foreignKey: 'cardId',
  })
  declare parentCard: Card;
}
