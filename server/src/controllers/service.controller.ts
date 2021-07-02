import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";

//DB
import { connect } from "../database";

//Interfaces
import { IService } from "../interface/interfaces";

//Services

export async function getServices(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const conn = await connect();
    const servicios = await conn.query("SELECT * FROM servicios");
    return res.status(200).json(servicios[0]);
  } catch (e) {
    console.log(e);
  }
}

export async function getService(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  const service = await conn.query(
    "SELECT * FROM servicios WHERE id_servicio = ?",
    [id]
  );
  res.json(service[0]);
}

export async function createService(
  req: Request,
  res: Response
): Promise<Response | void> {
  const { titulo, tipo, descripcion, precio } = req.body;
  const newService: IService = {
    titulo: titulo,
    tipo: tipo,
    descripcion: descripcion,
    precio: precio,
    imagen: req.file.path,
  };
  const conn = await connect();
  await conn.query("INSERT INTO servicios SET ?", [newService]);
  return res.json({
    message: "Service successfully created",
  });
}

export async function updateService(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const { titulo, tipo, descripcion, precio } = req.body;
  const updatedService: IService = {
    titulo: titulo,
    tipo: tipo,
    descripcion: descripcion,
    precio: precio,
    imagen: req.file.path,
  };
  console.log(updateService);
  const conn = await connect();
  await conn.query("UPDATE servicios SET ? WHERE id_servicio = ?", [
    updatedService,
    id,
  ]);
  res.json({
    message: "Service has been updated",
  });
}

export async function deleteService(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  const info = await conn.query(
    "SELECT imagen FROM servicios WHERE id_servicio = ?",
    [id]
  );
  await conn.query("DELETE FROM servicios WHERE id_servicio = ?", [id]);

  if (info[0][0].image) {
    await fs.unlink(path.resolve(info[0][0].image));
  }

  res.json({
    message: "Service has been deleted",
  });
}
