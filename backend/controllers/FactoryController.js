const APIFeatures = require("../utils/api-features");

/**
 * Delete one document by ID
 */
const deleteOne = (Model) => async (req, res, next) => {
  try {
    const result = await Model.deleteOne({ _id: req.params.id });

    console.log(result);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "No document found with that ID" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/**
 * Update one document by ID
 */
const updateOne = (Model) => async (req, res, next) => {
  try {
    // Prevent password updates in generic controller
    if (req.body.password) {
      delete req.body.password;
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return res
        .status(404)
        .json({ status: "fail", message: "No document found with that ID" });
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new document
 */
const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get one document by ID
 */
const getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return res
        .status(404)
        .json({ status: "fail", message: "No document found with that ID" });
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all documents
 */
const getAll = (Model) => async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.role) filter = { role: req.query.role };

    const totalResults = await Model.countDocuments(filter);

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      totalResults,
      results: doc.length,
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
};
