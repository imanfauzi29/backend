const Quest = require("../../models/Quest");
const User = require("../../models/Users");
const response = require("../../utils/response");
const utils = require("../../utils/utils");

const questCtrl = {};

// Add Quest
questCtrl.addQuest = async (req, res) => {
  const body = req.body;

  try {
    const quest = await new Quest(body);
    const data = await quest.save();

    res.status(200).send(
    response.success({
        message: "New quest has been created!",
        data
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Update Quest by id
/* params :questId
/* body {}
*/
questCtrl.updateQuest = async (req, res) => {
  const { questId } = req.params;
  const body = req.body;

  try {
    const quest = await Quest.findByIdAndUpdate(questId, body, {
      returnOriginal: false
    });

    res.status(200).send(
    response.success({
        message: "Update quest success!",
        data: quest
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

// Get Quest
questCtrl.getQuest = async (req, res) => {
  try {
    const { page, size, sort, startDate, endDate } = req.query;
    const [limit, offset] = utils.GetPaginate(page, size);
    const options = {
      page,
      limit,
      offset,
      startDate,
      endDate,
      populate: [
        {
          path: "teacher",
          select: "_id nip",
          // match: { active: 1 },
          populate: {
            path: "user",
            model: "User",
            select: "-_id username first_name last_name"
          }
        },
        {
          path: "subject",
          match: { active: 1 },
          select: "-_id subject_name subject_code"
        },
        {
          path: "grade",
          match: { active: 1 },
          select: "-_id grade_name"
        }
      ],
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

    const quest = await Quest.paginate(query, options, (err, result) =>
      response.withPaginate({ message: "Success retrive data", result })
    );
    res.status(200).send(quest);
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Get Quest by id
/* params :questId
*/
questCtrl.getQuestById = async (req, res) => {
  const { questId } = req.params;

  try {
    const quest = await Quest.findById(questId)
      .populate({
        path: "teacher",
        select: "_id nip",
        // match: { active: 1 },
        populate: {
          path: "user",
          model: "User",
          select: "-_id username first_name last_name"
        }
      })
      .populate({
        path: "subject",
        match: { active: 1 },
        select: "-_id subject_name subject_code"
      })
      .populate({
        path: "grade",
        match: { active: 1 },
        select: "-_id grade_name"
      })
      .exec();

    res.status(200).send(
      response.success({
        message: "Success retrive data",
        data: quest
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

/** 
/* Delete Quest
/* params :questId
*/
questCtrl.deleteQuest = async (req, res) => {
  const { questId } = req.params;

  try {
    const quest = await Quest.findByIdAndDelete(questId);

    res.status(200).send(
      response.success({
        message: "Success delete data",
        data: quest
      })
    );
  } catch (error) {
    res.status(400).send(response.failed({ message: error.message }));
  }
};

module.exports = questCtrl;
