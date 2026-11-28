import { DataTypes, Model } from "sequelize";
import type {
    CreationOptional,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

import { sequelize } from '../config/database.js';
import type { User } from './User.js';

export const LISTING_STATUSES = ["available", "reserved", "collected", "removed"] as const;
export type ListingStatus = (typeof LISTING_STATUSES)[number];

/**
 * A food item by a {@link User} that is ready for pickup
 */

export class Listing extends Model<InferAttributes<Listing>, InferCreationAttributes<Listing>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare city: string;

    /** Could be for stuff like vegan, LCHF etc... */
    declare tags: CreationOptional<string[]>;
    declare expiryDate: Date;
    declare status: CreationOptional<ListingStatus>;
    declare userId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}


Listing.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...LISTING_STATUSES),
            allowNull: false,
            defaultValue: 'available',
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'listings',
        underscored: true,
    },
);



