import role from "../models/role.js";
import auth from "./auth.js";

const admin = async (req, res, next) => {
    const adminRole = await role.findById({_id:req.user.roleId});
    if(!adminRole) return res.status(400).send({message: "Role not found"});

    return adminRole.name === "admin" ? next() : res.status(400).send({message: "Unauthorized user"});
}

export default admin;