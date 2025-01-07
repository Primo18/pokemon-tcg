import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Set } from '@models/set.model';
import { Image } from '@models/image.model';
import { Market } from '@models/market.model';

@Table({
  tableName: 'card',
  timestamps: false,
})
export class Card extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare supertype: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  declare subtypes: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  declare types: string[];

  @ForeignKey(() => Set)
  @Column({
    type: DataType.STRING,
    field: 'set_id',
    allowNull: false,
  })
  declare setId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare number: string;

  @Column(DataType.STRING)
  declare rarity: string;

  @BelongsTo(() => Set, {
    foreignKey: 'setId',
    as: 'cardSet',
  })
  declare cardSet: Set;

  @HasMany(() => Image)
  declare images: Image[];

  @HasMany(() => Market)
  declare markets: Market[];
}
