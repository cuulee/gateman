const mongoose = require('mongoose');
const roleClaim = require('./RoleClaim');
const userRole = require('./UserRole');
const claim = require('./Claim');

var RoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Sorry, the role name is required'],
        unique: true
    }
});

RoleSchema.methods.to = async function (claimOrUser) {
    if (typeof claimOrUser === "string") {
        let userClaim = await claim.where('name', claimOrUser);
        if (claim.length) {
            return roleClaim.create({ role: this._id, claim: userClaim[0]._id });
        } else {
            userClaim = await claim.create({ name: claimOrUser });
            return roleClaim.create({ role: this._id, claim: userClaim._id });
        }
    } else {
        return userRole.create({ user: claimOrUser._id, role: this._id })
    }

}
RoleSchema.methods.from = () => {

}

module.exports = mongoose.model('Role', RoleSchema); 