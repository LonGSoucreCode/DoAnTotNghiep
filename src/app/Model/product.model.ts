export interface product {
  product_id: string;
  product_Name: string;
  product_Price: string;
  image_Product_id: string;
  brand_id: string;
  category_id: number;
  product_Story: string;
  sale_id: string;
  view_id: string;
  isActive: boolean;
}
export interface imageproduct {
  image_Product_id: string;
  image_Product_Main: string;
  image_Product_Detail: string;
  image_Product_Ass: string;
  image_Product_Cond: string;
}
export interface brand {
  brand_id: string;
  brand_Name: string;
  nsx_id: string;
  isActive: boolean;
}
export interface brandAdd {
  brand_Name: string;
  nsx_id: string;
}
export interface Nsx {
  nsx_id: string;
  nsx_Name: string;
  isActive: boolean;
}
export interface User {
  user_id: string;
  Email: string;
  role_id: number;
  password: string;
  passwordcheck: string;
  firstName: string;
  lastName: string;
  credit: string;
}
export interface UpdateUser {
  user_id: number;
  credit: string;
}
export interface UserDetail {
  user_id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  credit: string;
}
export interface WishListUser {
  wishList_id: string;
  wishList_Count: string;
}
export interface WishListProduct {
  wishList_id: number;
  product_id: number;
  size_id: number;
}
export interface WishListProductUpdate {
  wishList_id: number;
  product_id: number;
  size_id: number;
  size_id_new: number;
}
export interface BagUser {
  bag_id: number;
  bag_Count: number;
}
export interface BagProductAdd {
  bag_id: number;
  product_id: number;
  size_id: number;
  quality: number;
}
export interface BagProduct {
  bag_id: number;
  product_id: number;
  size_id: number;
}
export interface SizeProduct {
  cT_Size_id: number;
  size_id: number;
  product_id: number;
  size_Quantity: number;
  size_Surcharges: string;
  isActive: boolean;
}
export interface Size {
  size_id: number;
  size_Number: number;
  isActive: boolean;
}
export interface SizeOut {
  price: string;
  idproduct: number;
  idsize: number;
}
export interface Category {
  category_id: number;
  category_Name: string;
  isActive: boolean;
}
export interface CTSizeOut {
  SizeID: number;
  SizeCheck: boolean;
}
export interface Bill {
  bill_id: number;
  user_id: number;
  bill_Count: number;
  bill_Total: string;
  bill_Status: boolean;
  createTime: string;
}
export interface BillProduct {
  bill_id: number;
  product_id: number;
  product_price: string;
  size_id: number;
  createTime: string;
}

export interface ListCode {
  list_code: string;
  list_name: string;
}
