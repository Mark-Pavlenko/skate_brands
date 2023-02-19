interface IStateLanguage {
  lang: string
}

export default {
  namespaced: true,
  state: {
    lang: "ja"
  } as IStateLanguage,
  actions: {

  },
  mutations: {
    SET_LANG(state: IStateLanguage, lang: string) {
      state.lang = lang;
    }
  }
}
