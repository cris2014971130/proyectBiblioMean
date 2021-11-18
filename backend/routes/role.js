import express from "express";
import role from "../controllers/role.js";
const router = express.Router();

// router.post("/registerRole", auth, admin, role.registerRole);
// router.get("/listRole", auth, admin, role.listRole);
// router.get("/findRole/:_id", auth, admin, role.findRole);
// router.put("/updateRole", auth, admin, role.updateRole);
// router.delete("/deleteRole/:_id", auth, admin, role.deleteRole);

router.post("/registerRole",  role.registerRole);
router.get("/listRole", role.listRole);
router.get("/findRole/:_id",  role.findRole);
router.put("/updateRole", role.updateRole);
router.delete("/deleteRole/:_id", role.deleteRole);

export default router;
