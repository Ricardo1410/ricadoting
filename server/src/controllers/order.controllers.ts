import { Request, Response } from "express";

//DB
import { connect } from "../database";

//Interfaces
import { IOrder, IUser } from "../interface/interfaces";

// ordenes

export async function getOrders(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const conn = await connect();
    const services = await conn.query("SELECT * FROM ordenes");
    return res.status(200).json(services[0]);
  } catch (e) {
    console.log(e);
  }
}

export async function getOrder(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  const order = await conn.query("SELECT * FROM ordenes WHERE id_order = ?", [
    id,
  ]);
  res.json(order[0]);
}

export async function createOrder(
  req: Request,
  res: Response
): Promise<Response | void> {
  const newOrder: IOrder = req.body;
  const conn = await connect();
  await conn.query("INSERT INTO ordenes SET ?", [newOrder]);
  res.json({
    message: "New Order Created",
  });
}

export async function updateOrder(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const updatedService: IOrder = req.body;
  const conn = await connect();
  await conn.query("UPDATE ordenes SET ? WHERE id_order = ?", [
    updatedService,
    id,
  ]);
  res.json({
    message: "Order has been updated",
  });
}

export async function deleteOrder(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  await conn.query("DELETE FROM ordenes WHERE id_order = ?", [id]);
  res.json({
    message: "Order has been deleted",
  });
}

export async function createOrder2(
  req: Request,
  res: Response
): Promise<Response | void> {
  const { name, email, id_service, details, total_price } = req.body;
  const newUser: IUser = {
    name,
    email,
  };

  const conn = await connect();
  await conn.query("START TRANSACTION;");
  await conn.query("INSERT INTO users SET ?", [newUser]);

  const result = await conn.query(
    "SELECT id_user FROM users ORDER BY id_user DESC LIMIT 1"
  );
  const result1 = JSON.parse(JSON.stringify(result[0]));

  const newOrder: IOrder = {
    id_user: result1[0].id_user,
    id_service: id_service,
    details: details,
    total_price: total_price,
  };

  await conn.query("INSERT INTO ordenes SET ?", [newOrder]);
  await conn.query("COMMIT");

  return res.json(newOrder);
}
