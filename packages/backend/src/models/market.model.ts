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
  tableName: 'market',
  timestamps: false,
})
export class Market extends Model {
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
    type: DataType.DATE,
    field: 'updated_at',
    allowNull: false,
  })
  declare updatedAt: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare market: string;

  @BelongsTo(() => Card, {
    foreignKey: 'cardId',
  })
  declare parentCard: Card;
}
