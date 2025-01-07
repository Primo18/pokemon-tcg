import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Card } from '@models/card.model';

@Table({
  tableName: 'set',
  timestamps: false,
})
export class Set extends Model {
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
  declare series: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'printed_total',
  })
  declare printedTotal: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare total: number;

  @Column({
    type: DataType.STRING,
    field: 'ptcgo_code',
  })
  declare ptcgoCode: string;

  @Column({
    type: DataType.DATE,
    field: 'release_date',
  })
  declare releaseDate: Date;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  declare updatedAt: Date;

  @Column({
    type: DataType.STRING,
    field: 'symbol_url',
  })
  declare symbolUrl: string;

  @Column({
    type: DataType.STRING,
    field: 'logo_url',
  })
  declare logoUrl: string;

  @HasMany(() => Card)
  declare cards: Card[];
}
