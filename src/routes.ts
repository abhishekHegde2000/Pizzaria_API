import { Router } from "express";
import multer from "multer";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailuserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post("/users", new CreateUserController().handle); // http://localhost:3333/users

router.post("/session", new AuthUserController().handle); // http://localhost:3333/session

router.get("/me", isAuthenticated, new DetailuserController().handle); // http://localhost:3333/me

//-- ROTAS CATEGORY
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
); // http://localhost:3333/category

router.get("/category", isAuthenticated, new ListCategoryController().handle);

//-- ROTAS PRODUCT
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

export { router };
