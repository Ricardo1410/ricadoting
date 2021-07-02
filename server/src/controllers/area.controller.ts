import { Request, Response } from "express";

//DB
import { connect } from "../database";

//Interfaces
import { IArea } from "../interface/interfaces";

export async function getAreas(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const conn = await connect();
    const services = await conn.query("SELECT * FROM areas");
    return res.status(200).json(services[0]);
  } catch (e) {
    console.log(e);
  }
}

export async function getArea(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  const service = await conn.query("SELECT * FROM areas WHERE id_area = ?", [
    id,
  ]);
  res.json(service[0]);
}

export async function createArea(
  req: Request,
  res: Response
): Promise<Response | void> {
  const newArea: IArea = req.body;
  const conn = await connect();
  await conn.query("INSERT INTO areas SET ?", [newArea]);
  res.json({
    message: "New Area Created",
  });
}

export async function updateArea(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const updatedArea: IArea = req.body;
  const conn = await connect();
  await conn.query("UPDATE areas SET ? WHERE id_area = ?", [updatedArea, id]);
  res.json({
    message: "Area has been updated",
  });
}

export async function deleteArea(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  await conn.query("DELETE FROM areas WHERE id_area = ?", [id]);
  res.json({
    message: "Area has been deleted",
  });
}