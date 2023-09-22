module.exports.ERROR_STATUS = {
  CODE_400: 400,
  CODE_404: 404,
  CODE_500: 500,
};

module.exports.ERROR_MESSAGE = {
  users: {
    notFoundById: 'Пользователь по указанному ID не найден.',
    invalidDataOnCreateUser:
      'Переданы некорректные данные при создании пользователя.',
    invalidDataOnUpdateInfo:
      'Переданы некорректные данные при обновлении профиля.',
    invalidDataOnUpdateAvatar:
      'Переданы некорректные данные при обновлении аватара.',
  },
  cards: {
    notFoundById: 'Карточка с указанным ID не найдена.',
    invalidDataOnCreateCard:
      'Переданы некорректные данные при создании карточки.',
    invalidDataOnToggleLike:
      'Переданы некорректные данные при постановке/снятии лайка.',
    invalidIdOnToggleLike: 'Передан несуществующий ID карточки.',
  },
  unmatchedRoute: 'Адрес запроса указан неверно.',
  default: 'На сервере произошла ошибка.',
};

module.exports.MODEL_UPDATE_OPTIONS = {
  new: true,
  runValidators: true,
};
