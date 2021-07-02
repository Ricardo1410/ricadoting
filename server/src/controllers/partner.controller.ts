import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";
//DB
import { connect } from "../database";

//Interfaces
import { IPartner } from "../interface/interfaces";

// socios

export async function getPartners(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const conn = await connect();
    const services = await conn.query("SELECT * FROM socios");
    return res.status(200).json(services[0]);
  } catch (e) {
    console.log(e);
  }
}

export async function getPartner(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  const service = await conn.query(
    "SELECT * FROM socios WHERE id_partner = ?",
    [id]
  );
  res.json(service[0]);
}

export async function createPartner(
  req: Request,
  res: Response
): Promise<Response | void> {
  const { name } = req.body;

  const newPartner: IPartner = {
    name: name,
    image: req.file.path,
  };

  const conn = await connect();
  await conn.query("INSERT INTO socios SET ?", [newPartner]);
  res.json({
    message: "New Partner Created",
  });
}

export async function updatePartner(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;

  const { id_partner, name } = req.body;

  const updatedPartner: IPartner = {
    name: name,
    image: req.file.path,
  };

  const conn = await connect();
  await conn.query("UPDATE socios SET ? WHERE id_partner = ?", [
    updatedPartner,
    id,
  ]);
  res.json({
    message: "Partner has been updated",
  });
}

export async function deletePartner(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  const info = await conn.query(
    "SELECT image FROM socios WHERE id_partner = ?",
    [id]
  );
  await conn.query("DELETE FROM socios WHERE id_partner = ?", [id]);

  if (info[0][0].image) {
    await fs.unlink(path.resolve(info[0][0].image));
  }
  res.json({
    message: "Partner has been deleted",
  });
}
