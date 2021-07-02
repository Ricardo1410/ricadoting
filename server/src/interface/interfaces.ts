export interface IService {
  id_servicio?: number;
  titulo:string;
  imagen:string;
  tipo:string; 
  descripcion:string; 
  precio:number;
}

export interface IOrder {
  id_order?: number;
  id_user?: number;
  id_service?: number;
  order_date?: Date;
  details: string;
  total_price: number;
}

export interface IUser {
  id_user?: number;
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

export interface IPlan {
  id_planes?: number;
  tipo: string;
  precio: number;
}

export interface IPlanDetails {
  id_detalles?: number;
  id_planes: number;
  nombre: string;
}

export interface IPartner {
  id_partner?: number;
  name: string;
  image: string;
}

export interface IArea {
  id_area?: number;
  name: string;
}

export interface IChat {
  id_chat?: number;
  id_message?: number;
}

export interface IMessage {
  id_message?: number;
  id_user?: number;
  message: string;
  message_created: Date;
}
