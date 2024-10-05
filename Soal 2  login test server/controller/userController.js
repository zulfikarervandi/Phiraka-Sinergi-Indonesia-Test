const e = require("express");
const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { tbl_user } = require("../models");
const axios = require("axios");

class userController {
  static async login(req, res, next) {
    console.log(req.body, "re>>>");
    try {
      const { captchaValue, Username, Password } = req.body;
      if (!captchaValue) {
        throw { name: "required-captcha" };
      }
      const secretKey = process.env.RECAPTCHA_SECRET; 
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: secretKey,
            response: captchaValue,
          },
        }
      );

      const { success } = response.data;
      console.log(success, "success>>>>>>??");
    //   if (!success) {
    //     return res.status(400).json({ message: "Captcha verification failed." });
    //   }

      if (!Username) {
        throw { name: "required-username" };
      }
      if (!Password) {
        throw { name: "required-password" };
      }

      const user = await tbl_user.findOne({ where: { Username } });
      console.log(user, "user");
      if (!user) {
        throw { name: "invalid-credentials" };
      }

      const validPassword = comparePassword(Password, user.Password);
      console.log(validPassword, "validPassword");
      if (!validPassword) {
        throw { name: "invalid-credentials" };
      }

      const accessToken = signToken({ id: user.id });
      console.log(accessToken, "accessToken");
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
      //   console.log(error);
    }
  }

  static async register(req, res, next) {
    try {
      console.log(req.body, ">>>");
      const { Username, Password } = req.body;
      const user = await tbl_user.create({ Username, Password });
      res.status(201).json({ message: "Register successful" });
    } catch (error) {
      next(error);
      //   console.log(error);
      //   res.send(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await tbl_user.findByPk(id);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async profile(req, res, next) {
    try {
      const user = await tbl_user.findAll();
      res.status(200).json({ user });
    } catch (error) {
      //   next(error);
      res.send(error);
      console.log(error);
    }
  }
  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const { Username, Password } = req.body;
      const user = await tbl_user.update(
        { Username, Password },
        { where: { id } }
      );
      if (!user) {
        throw { name: "user-not-found" };
      }
      res.status(200).json({ message: "Edit successful" });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await tbl_user.destroy({ where: { id } });
      if (!user) {
        throw { name: "user-not-found" };
      }
      res.status(200).json({ message: "Delete successful" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
