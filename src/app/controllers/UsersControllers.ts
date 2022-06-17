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
    try {
      return res.status(200).json({ok: true})
    } catch (err) {
      return res.status(500).json({
        err
      })
    }
  }
}

export default UsersControllers;