import { DataTypes, Model } from 'sequelize';
import type {
    CreationOptional,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../config/database.js';
import type { Listing } from './Listing.js';
import type { User } from './User.js';

export const RESERVATION_STATUSES = ['active', 'cancelled', 'collected'] as const;
export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];


/**
 * Reservation made on {@link Listing} 
 */
export class Reservation extends Model<
    InferAttributes<Reservation>,
    InferCreationAttributes<Reservation>
> {
    declare id: CreationOptional<number>;
    declare listingId: ForeignKey<Listing['id']>;
    declare userId: ForeignKey<User['id']>;
    declare status: CreationOptional<ReservationStatus>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Reservation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        listingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'listings',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        status: {
            type: DataTypes.ENUM(...RESERVATION_STATUSES),
            allowNull: false,
            defaultValue: 'active',
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'reservations',
        underscored: true,
    },
);