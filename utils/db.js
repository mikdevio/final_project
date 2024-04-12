import Product from "../models/product.model.js";
import Customer from "../models/customer.model.js"
import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Role from "../models/role.model.js";

// TODO: Complete this DB initialization
export const initializeDB = async () => {
  // Insert data on products collection
  await Product.insertMany([
    {
      name: "Printer EPSON MFG145",
      price: 245.15,
      cost: 156.23,
      tax: 0.15,
      discount: 0.1,
      description: "Desktop laser printer with injection ink system.",
      quantity: 40,
    },
    {
      name: "Monitor Samsung SynMaster Z4586",
      price: 180.01,
      cost: 110.45,
      tax: 0.12,
      discount: 0.05,
      description: "LCD Monitor 24 inch Multi video input",
      quantity: 24,
    },
    {
      name: "Keyboard Lat-Es Schema Genius JK4561A",
      price: 25.34,
      cost: 14.12,
      tax: 0.12,
      discount: 0.05,
      description: "Desktop keyboard black color 124 keys",
      quantity: 37,
    },
  ]);

  // Insert data on customers collection
  await Customer.insertMany([
    {
      first_name: "Pablo",
      last_name: "Contreras",
      tax_number: "ERDF12463215A",
      email: "pablo.cont@gmail.com",
      phone: "593945623158",
      password: "123456",
    },
    {
      first_name: "María",
      last_name: "Valladares",
      tax_number: "ERDF4578996246Z",
      email: "mar.vall@gmail.com",
      phone: "593985632147",
      password: "123456",
    },
  ]);

  // Insert data on users collection
  await User.insertMany([
    {
      first_name: "Miguel",
      last_name: "Villacis",
      email: "villacis.mhva@gmail.com",
      role: "Manager",
      password: "12345",
    },
    {
      first_name: "Pablo",
      last_name: "Tonato",
      email: "tonato.potm@hotmail.com",
      role: "Seller",
      password: "12345",
    },
    {
      first_name: "Borrable",
      last_name: "Borrado",
      email: "borrable.usuario@gmail.com",
      password: "12345",
      role: "Seller",
      __v: 0,
    },
    {
      first_name: "Usuario",
      last_name: "Borrable",
      email: "usuario@gmail.com",
      password: "123456",
      role: "Manager",
      __v: 0,
    },
  ]);

  // Insert data on categories collection
  await Category.insertMany([
    {
      name: "Printers",
      description: "Device to print in paper or other",
    },
    {
      name: "Computers",
      description: "Devices like desktops and laptops",
    },
    {
      name: "Computer accesories",
      description: "Accesories for computers and laptops",
    },
    {
      name: "Movile phones",
      description: "Cellphones and tablets",
    },
  ]);

  // Insert data on roles collection
  await Role.insertMany([
    {
      name: "Manager",
      description: "CEO of the bussines",
      permissions: [
        "users",
        "roles",
        "customers",
        "products",
        "categories",
        "sales",
        "bills",
      ],
    },
    {
      name: "Seller",
      description: "Employee that sale products",
      permissions: ["customers", "products", "categories", "sales", "bills"],
    },
    {
      name: "Supervisor",
      description: "Invetory supervisor",
      permissions: ["products", "categories"],
    },
  ]);
};