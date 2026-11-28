import { Listing } from './Listing.js';
import { Reservation } from './Reservation.js';
import { User } from './User.js';

// User <-> Listing
User.hasMany(Listing, { foreignKey: 'userId', as: 'listings' });
Listing.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

// User <-> Reservation
User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Listing <-> Reservation 1:1
Listing.hasOne(Reservation, { foreignKey: 'listingId', as: 'reservation' });
Reservation.belongsTo(Listing, { foreignKey: 'listingId', as: 'listing' });

export { User, Listing, Reservation };