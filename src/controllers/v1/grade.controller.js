const Grades = require("../../models/Grades");
const response = require("../../utils/response");
const utils = require("../../utils/utils");

const gradeCtrl = {};

// Add grade
gradeCtrl.addGrade = async (req, res) => {
  const body = req.body;

  try {
    const grade = new Grades(body);
    const data = grade.save();

    res.status(200).send(
      response.success({
        message: "New grade has been created!",
        data
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Update grade by id
/* params :gradeId
/* body {}
*/
gradeCtrl.updateGrade = async (req, res) => {
  const { gradeId } = req.params;
  const body = req.body;

  try {
    const grade = await Grades.findOneAndUpdate({ _id: grade_id }, body);
    res.status(200).send(
      response.success({
        message: "Success update data",
        data: grade
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

// Get grade
gradeCtrl.getGrade = async (req, res) => {
  try {
    const { page, size, sort, startDate, endDate } = req.query;
    const [limit, offset] = utils.GetPaginate(page, size);
    const options = {
      page,
      limit,
      offset,
      startDate,
      endDate,
      populate: {
        path: "major",
        match: { active: true },
        select: "_id major_name major_type"
      },
      sort: { createdAt: !sort ? sort : "asc" }
    };

    const query = {
      // active: true
    };

    if (startDate !== undefined) {
      var gte = new Date(new Date(startDate).setHours(00, 00, 00));
      var lte = new Date(
        new Date(!endDate ? startDate : endDate).setHours(23, 59, 59)
      );
      query["created_at"] = { $gte: gte, $lt: lte };
    }

    const grade = await Grades.paginate(query, options, (err, result) =>
      response.withPaginate({ message: "Success retrive data", result })
    );
    res.status(200).send(grade);
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Get grade by id
/* params :gradeId
*/
gradeCtrl.getGradeById = async (req, res) => {
  const { gradeId } = req.params;

  try {
    const grade = await Grades.findById(gradeId)
      .populate({
        path: "major",
        match: { active: true },
        select: "_id major_name major_type"
      })
      .where("active")
      .equals(true)
      .exec();
    res.status(200).send(
      response.success({
        message: "Success retrive data",
        data: grade
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Delete grade
/* params :gradeId
*/
gradeCtrl.deleteGrade = async (req, res) => {
  const { gradeId } = req.params;

  try {
    const grade = await Grades.deleteOne({ _id: gradeId });
    if (grade.deletedCount < 1) throw new Error("Failed delete data");

    res.status(200).send(
      response.success({
        message: "Success retrive data",
        data: grade
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

module.exports = gradeCtrl;
