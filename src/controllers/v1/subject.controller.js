const Subjects = require("../../models/Subjects");
const response = require("../../utils/response");
const utils = require("../../utils/utils");

const subjectCtrl = {};

// Add Subjects
subjectCtrl.addSubject = async (req, res) => {
  const body = req.body;

  try {
    const subject = await new Subjects(body);
    const data = await subject.save();

    res.status(200).send(
      response.success({
        message: "New subject has been created!",
        data
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Update Subjects by id
/* params :subjectId
/* body {}
*/
subjectCtrl.updateSubject = async (req, res) => {
  const { subjectId } = req.params;
  const body = req.body;

  try {
    const subject = await Subjects.findOneAndUpdate({ _id: subjectId }, body, {
      returnOriginal: false
    });
    res.status(200).send(
      response.success({
        message: "Success update data!",
        data: subject
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

// Get Subjects
subjectCtrl.getSubject = async (req, res) => {
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

    const subject = await Subjects.paginate(query, options, (err, result) =>
      response.withPaginate({ message: "Success retrive data", result })
    );
    res.status(200).send(subject);
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Get Subjects by id
/* params :subjectId
*/
subjectCtrl.getSubjectById = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const subject = await Subjects.findById(subjectId);
    res.status(200).send(
      response.success({
        message: "Success retrive data!",
        data: subject
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Delete Subjects
/* params :subjectId
*/
subjectCtrl.deleteSubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const subject = await Subjects.findOneAndDelete({ _id: subjectId });

    res.status(200).send(
      response.success({
        message: "Success delete data!",
        data: subject
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

module.exports = subjectCtrl;
