import { BaseObjInterface } from "./baseObjectInterface";

export interface ResponseInterface {
  data: any;
  status: number;
  statusText: string;
}

export interface CategoryInterface extends BaseObjInterface {
  name: string;
}
export interface RecipeInterface extends BaseObjInterface {
  name: string;
  image1: string | null;
  rate: string;
  cooking_time: string;
}

export interface GetRecipeInteface extends BaseObjInterface {
  name: string;
  image1: string | undefined;
  rate: number;
  cooking_time: string;
  id: string;
  image2: string | undefined;
  image3: string | undefined;
  link: string | undefined;
  serve_qty: number;
}

export interface GetPopularInterface extends BaseObjInterface {
  recipe: {
    name: string;
    image1: string | undefined;
    rate: string;
    cooking_time: string;
    id: string;
    image2: string | undefined;
    image3: string | undefined;
    link: string | undefined;
    serve_qty: number;
  };
}

export interface GetNewInteface extends BaseObjInterface {
  name: string;
  image1: string | undefined;
  rate: number;
  cooking_time: string;
  id: string;
  image2: string | undefined;
  image3: string | undefined;
  link: string | undefined;
  serve_qty: number;
}

export interface GetTrendingInterface extends BaseObjInterface {
  recipe: {
    name: string;
    image1: string | undefined;
    rate: string;
    cooking_time: string;
    id: string;
    image2: string | undefined;
    image3: string | undefined;
    link: string | undefined;
    serve_qty: number;
  };
}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  profession: string;
  description: string;
  profile_pic: string;
}

// {
//   "id": "9e81cc5a-f0ad-4aba-9633-e1343283ea2d",
//   "name": "Rida Patel",
//   "email": "rida@mail.com",
//   "is_admin": true,
//   "profession": null,
//   "description": "description updated",
//   "otp": null,
//   "is_verified": false,
//   "chef_status": "Pre-processed",
//   "profile_pic": "/media/accounts/Amul_official_logo.svg.png",
//   "registered_on": "2024-01-08T09:04:01.558391Z"
// }

export interface GetIngredientInterface {
  name: string;
  id: string;
}

export interface InputIngredientInterface {
  name: string | null;
  quantity: string;
  unit?: string;
}

export interface FilterDataInterface {
  categories: Array<string>;
  time: string | null;
  rate: number | null;
}
export interface GetProfileInterface {
  name: string;
  id: string;
  profession: string;
  description: string;
  recipes: Array<RecipeInterface>;
  profile_pic: string;
}

export interface NotificationInterface {
  id: string;
  created_on: string;
  updated_on: string;
  recipe: {
    id: string;
    name: string;
    rate: number;
    is_saved: boolean;
    cooking_time: string;
    image1: string;
  };
}

export interface IngredientInterface extends BaseObjInterface {
  name: string;
  quantity: string;
}

export interface ProcedureInterface extends BaseObjInterface {
  description: string;
  order: string;
}

export interface RecipeDetailInterface extends BaseObjInterface {
  name: string;
  image1: string | undefined;
  rate: string;
  cooking_time: string;
  id: string;
  image2: string | undefined;
  image3: string | undefined;
  link: string | undefined;
  serve_qty: number;
  category: {
    id: string;
    name: string;
  }[];
  ingredients: IngredientInterface[];
  procedures: ProcedureInterface[];
}
