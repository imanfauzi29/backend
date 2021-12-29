const User = require("../../models/Users");
const Role = require("../../models/Roles");
const response = require("../../utils/response");
const { getIp } = require("../../utils/utils");
const Students = require("../../models/Students");
const Teachers = require("../../models/Teachers");
const { options } = require("joi");
const utils = require("../../utils/utils");

const authCtrl = {};

authCtrl.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();

    const data = { user, token };

    res
      .status(200)
      .send(response.success({ message: "Login Successful", data }));
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

authCtrl.registerUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const role = await Role.findOne({ _id: newUser.role });
    newUser.ip_address = getIp();
    newUser.password = await newUser.encryptPassword(newUser.password);
    const result = await newUser.save();

    if (role.role_name === "Guru") {
      saveTeacher(result);
    }

    if (role.role_name === "Murid") {
      saveStudent(result);
    }

    res
      .status(200)
      .send(response.success({ message: "New user has been created!" }));
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

const saveStudent = async (result) => {
  try {
    const student = new Students({ user: result._id });
    await student.save();
  } catch (error) {
    throw new Error(error);
  }
};

const saveTeacher = async (result) => {
  try {
    const teacher = new Teachers({ user: result._id });
    await teacher.save();
  } catch (error) {
    throw new Error(error);
  }
};

authCtrl.updateUser = async (req, res) => {
  const { userId } = req.params;
  const body = req.body;

  try {
    body.ip_address = getIp();
    const user = await User.findByIdAndUpdate({ _id: userId }, body, {
      returnOriginal: false
    }).select("-password -tokens");
    res.status(200).send(
      response.success({
        message: "Success update data",
        data: user
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

authCtrl.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password -tokens");

    res.status(200).send(
      response.success({
        message: "Success retrive data",
        data: user
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

authCtrl.getAllUser = async (req, res) => {
  try {
    const { page, size, sort, startDate, endDate } = req.query;
    const [limit, offset] = utils.GetPaginate(page, size);
    const options = {
      page,
      limit,
      offset,
      startDate,
      endDate,
      select: {password: 0, tokens: 0},
      sort: { createdAt: !sort ? sort : "asc" }
    };

    const query = {}

    if (startDate !== undefined) {
        var gte = new Date(new Date(startDate).setHours(00, 00, 00))
        var lte = new Date(new Date(!endDate ? startDate : endDate).setHours(23, 59, 59))
        query["created_at"] = {$gte: gte, $lt: lte}
    }

    const user = await User.paginate(query,
      options,
      (err, result) =>
        response.withPaginate({ message: "Success retrive data", result })
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

authCtrl.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.deleteOne({ _id: userId });

    res.status(200).send(
      response.success({
        message: "Success delete data",
        data: user
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

authCtrl.registerAdminUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    newUser.ip_address = getIp();
    newUser.password = await newUser.encryptPassword(newUser.password);
    const result = await newUser.save();

    res.status(200).send(
      response.success({
        message: "New user has been created!",
        data: result
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

module.exports = authCtrl;
