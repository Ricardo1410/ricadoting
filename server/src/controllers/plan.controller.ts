import { Request, Response } from "express";

//DB
import { connect } from "../database";

//Interfaces
import { IPlan } from "../interface/interfaces";

// planes

export async function getPlans(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {

    const conn = await connect();
    const plan = await conn.query("SELECT * FROM planes");
    const details = await  conn.query("SELECT * FROM plan_detalles");
    
    const resultPlan = JSON.parse(JSON.stringify(plan[0]));
    const resultDetails = JSON.parse(JSON.stringify(details[0]));

    let planes = [];

    if(resultPlan && resultDetails){
      resultPlan.forEach(item => {

        const detalles = [];

        planes.push({
          id_planes: item.id_planes,
          tipo: item.tipo,
          precio: item.precio,
          detalles: detalles
        });

        resultDetails.forEach(item2 => {
          if(item.id_plan === item2.id_plan){
          detalles.push({
            id_detalles: item2.id_detalles,
            id_planes: item2.id_planes,
            nombre: item2.nombre
          });
          }
        });
      });
    }

    return res.status(200).json(planes);  

  } catch (e) {
    console.log(e);
  }
}

export async function getPlan(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  const plan = await conn.query("SELECT * FROM planes WHERE id_plan = ?", [
    id,
  ]);
  res.json(plan[0]);
}

export async function createPlan(
  req: Request,
  res: Response
): Promise<Response | void> {
  const newPlan: IPlan = req.body;
  const conn = await connect();
  await conn.query("INSERT INTO planes SET ?", [newPlan]);
  res.json({
    message: "New Plan Created",
  });
}

export async function updatePlan(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const updatedPlan: IPlan = req.body;
  const conn = await connect();
  await conn.query("UPDATE planes SET ? WHERE id_plan = ?", [updatedPlan, id]);
  res.json({
    message: "Plan has been updated",
  });
}

export async function deletePlan(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.params.id;
  const conn = await connect();
  await conn.query("DELETE FROM planes WHERE id_plan = ?", [id]);
  res.json({
    message: "Plan has been deleted",
  });
}