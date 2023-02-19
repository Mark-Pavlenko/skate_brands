const Joi = require('@hapi/joi');

module.exports.createUser = Joi.object({
  verification_code: Joi.string().required(),
  wallet_address: Joi.string().required(),
});

module.exports.updateUser = Joi.object({
  nickname: Joi.string().max(24).allow(null, ''),
  profile_image_url: Joi.string().max(500).allow(null, ''),
});

module.exports.verifyCode = Joi.object({
  verification_code: Joi.string().required(),
});

module.exports.comment = Joi.object({
  comment: Joi.string().max(400).required(),
});

module.exports.post = Joi.object({
  dao_id: Joi.string().required(),
  text: Joi.string().max(400).allow(null, ''),
  theme_id: Joi.string().allow(null, ''),
  image_url: Joi.string().max(500).allow(null, ''),
});

module.exports.report = Joi.object({
  dao_id: Joi.string().required(),
  reporter_user_id: Joi.string().required(),
  reported_message: Joi.string().required(),
});

module.exports.dao = Joi.object({
  dao_name: Joi.string().allow(null, ''),
  cover_image_url: Joi.string().allow(null, ''),
  bulletin_title: Joi.string().max(30).allow(null, ''),
  bulletin_text: Joi.string().max(1000).allow(null, ''),
  bulletin_external_url: Joi.string().max(500).allow(null, ''),
  bulletin_image_url: Joi.string().max(500).allow(null, ''),
});

module.exports.userAction = Joi.object({
  action_name: Joi.string().required(),
  dao_id: Joi.string().required(),
  options: Joi.array().items(Joi.object({
    key: Joi.string().max(500).required(),
    value: Joi.string().max(500).required(),
  }))
});

module.exports.voteForPost = Joi.object({
  dao_id: Joi.string().required(),
});
