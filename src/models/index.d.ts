import { publicDecrypt } from "crypto";

interface IPostLogin  {
  UserName: string;
  Password: string;
};

interface IDModel
	{
     Id?  : string; 
   }

interface IVisitors {
  firstName?: string;
  lastName?: string;
  nricNumber?: string;
  plateNumber?: string;
  companyName?: string ;
  designation?: string;
  buildingId?: string ;
  levelId?: string ;
  roomId?: string ;
  isStayHomeNotice: boolean;
  isConfirmed14Day: boolean;
  isFever: boolean;
  isAcknowledged: boolean;
}

 interface IVisitorswithId extends IVisitors
 {
  visitorId : string;
  buildingName :string;
  roomName :string;
  levelName :string;
  room : IRoom;
  building : IBuilding;
  level : ILevel
 }

interface IRoom {
   roomId : string;
   roomName : string;
   roomCode : string;
   levelId : string;
}

interface ILevel {
  levelId : string;
  roomName : string;
  roomCode : string;
  buildingId : string;
}

interface IBuilding {
  buildingId : string;
  buildingName : string;
  buildingCode : string;
}

type TResponse<T>= {
  code : number;
  message : string; 
  data : {T};
}

type TLoginResponse = {
  "code": int,
  "message": string;
  "Data" : {}
};
interface TApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

  
  
export { IPostLogin,TLoginResponse ,IVisitors,TResponse ,IRoom,ILevel,IBuilding ,IVisitorswithId,IDModel,TApiResponse};
