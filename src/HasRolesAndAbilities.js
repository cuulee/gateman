const claim = require('./Models/Claim');
const userClaim = require('./Models/UserClaim');
const userRole =  require('./Models/UserRole');

class HasRolesAndAbilities {
   to(claimName){
       claim.where('name', claimName).limit(1).exec((err, c)=>{
        if(c.length>0){
            userClaim.create({user: this._id, claim: c[0]._id},function(err,usrClaim){
                if(err) throw err;
                return usrClaim;
            })
        }else{
            claim.create({name:claimName},(err,clm) =>{
                 if(err) throw err;
                 userClaim.create({user: this._id,claim: clm._id},function(err,usrClaim){
                     if(err) throw err;
                     return usrClaim;
                 })
            })
        }
       });
    }

    getClaims(){
        userClaim.where('user',this._id).exec((err,c)=>{
            if(err) throw (err);
            return c;
            
        })
    }


}

module.exports = HasRolesAndAbilities;