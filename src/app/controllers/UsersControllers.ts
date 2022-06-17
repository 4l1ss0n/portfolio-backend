import { Response as Res, Request as Req } from "express";
import Database from "../../database/connection";
import Users from "../models/UsersModels";
import bcrypt from "bcrypt";


class UsersControllers {
  async Index(req: Req, res: Res): Promise<Res<any>> {
    try {
      const UserR = Database.getRepository(Users);
      const response = await UserR.find();
      return res.status(200).json({response});
    } catch (err) {
      return res.status(500).json({
        err
      })
    }
  };

  async Register(req: Req, res: Res): Promise<Res<any>> {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    try {
      const UserR = Database.getRepository(Users);

      const passwordHash = bcrypt.hashSync(password, 2);

      const user = UserR.create({
        firstName,
        lastName,
        email,
        passwordHash
      })

      await UserR.save(user);

      return res.status(200).json({id: user.id})
    } catch (err) {
      return res.status(500).json({
        err
      })
    }
  };
  async Login(req: Req, res: Res): Promise<Res<any>> {
    const credentials = req.headers.authorization;
    try {
      const UserR = Database.getRepository(Users);
      
      if (!credentials) return res.status(404).json({err: "not credentials found"});
      const [basic, hash] = credentials.split(" ");
      if (!hash) return res.status(401).json({err: "bad formed credentials"});
      const [email, password] = Buffer.from(hash, "base64").toString().split(":");

      const response = await UserR.findOne({
        where: {
          email
        }
      });

      if (!response) return res.status(404).json({err: "user not found with this email"});
      if (!bcrypt.compareSync(password, response.passwordHash)) return res.status(401).json({err: "incorrect passoword"});

      return res.status(200).json({response});
    } catch (err) {
      return res.status(500).json({
        err
      })
    }
  }
}

export default UsersControllers;