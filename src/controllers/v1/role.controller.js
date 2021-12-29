const Role = require("../../models/Roles");
const response = require("../../utils/response");
const utils = require("../../utils/utils");

const roleCtrl = {};

roleCtrl.addRole = async (req, res) => {
  const newRole = new Role(req.body);
  try {
    await newRole.save();
    res
      .status(200)
      .send(response.success({ message: "Role has been created!" }));
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

roleCtrl.getAllRole = async (req, res) => {
  try {
    const { page, size, sort, startDate, endDate } = req.query;
    const [limit, offset] = utils.GetPaginate(page, size);
    const options = {
      page,
      limit,
      offset,
      startDate,
      endDate,
      sort: { createdAt: !sort ? sort : "asc" }
    };

    const query = {};

    if (startDate !== undefined) {
      var gte = new Date(new Date(startDate).setHours(00, 00, 00));
      var lte = new Date(
        new Date(!endDate ? startDate : endDate).setHours(23, 59, 59)
      );
      query["created_at"] = { $gte: gte, $lt: lte };
    }

    const role = await Role.paginate(query, options, (err, result) =>
      response.withPaginate({ message: "Success retrive data", result })
    );
    res.status(200).send(role);
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

roleCtrl.getRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await Role.findById(roleId);

    res.status(200).send(
      response.success({
        message: "Success retrive data",
        data: role
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

roleCtrl.updateRole = async (req, res) => {
  const { roleId } = req.params;
  const body = req.body;

  try {
    const role = await Role.findByIdAndUpdate({ _id: roleId }, body, {
      returnOriginal: false
    });

    res.status(200).send(
      response.success({
        message: "Success update data",
        data: role
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

roleCtrl.deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await Role.deleteOne({ _id: roleId });

    res.status(200).send(
      response.success({
        message: "Success delete data",
        data: role
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

module.exports = roleCtrl;
