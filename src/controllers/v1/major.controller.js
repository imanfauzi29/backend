const Majors = require("../../models/Majors");
const response = require("../../utils/response");
const utils = require("../../utils/utils");

const majorCtrl = {};

// Add major
majorCtrl.addMajor = async (req, res) => {
  const body = req.body;

  try {
    const major = await new Majors(body);
    const data = await major.save();

    res.status(200).send(
      response.success({
        message: "New major has been created!",
        data
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Update major by id
/* params :majorId
/* body {}
*/
majorCtrl.updateMajor = async (req, res) => {
  const { majorId } = req.params;
  const body = req.body;

  try {
    const major = await Majors.findByIdAndUpdate(majorId, body);
    res.status(200).send(
      response.success({
        message: "Success update data!",
        data: major
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

// Get major
majorCtrl.getMajor = async (req, res) => {
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

    const major = await Majors.paginate(query, options, (err, result) =>
      response.withPaginate({ message: "Success retrive data", result })
    );
    res.status(200).send(major);
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Get major by id
/* params :majorId
*/
majorCtrl.getMajorById = async (req, res) => {
  const { majorId } = req.params;

  try {
    const major = await Majors.findById({ _id: majorId });

    res.status(200).send(
      response.success({
        message: "Success retrive data!",
        data: major
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Delete major
/* params :majorId
*/
majorCtrl.deleteMajor = async (req, res) => {
  const { majorId } = req.params;

  try {
    const major = await Majors.deleteOne({ _id: majorId });
    if (major.deletedCount < 1) throw new Error("Failed to delete data");

    res.status(200).send(
      response.success({
        message: "Success retrive data!",
        data: major
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

module.exports = majorCtrl;
