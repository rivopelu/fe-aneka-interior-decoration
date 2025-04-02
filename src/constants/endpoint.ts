export const ENDPOINT = {
  LIST_KEYWORD: () => `/master-data/v1/keyword/list`,
  SIGN_IN: () => `/auth/v1/sign-in`,
  LIST_TOPIC: () => `/master-data/v1/topic/list`,
  CREATE_TOPIC: () => `/master-data/v1/topic/create`,
  CREATE_KEYWORD: () => `/master-data/v1/keyword/create`,
  CREATE_NEW_POST: () => `/post/v1/new`,
  LIST_POST: () => `/post/v1/cms/list`,
  DETAIL_POST: (id: string) => `/post/v1/cms/detail/${id}`,
  PUBLISH_POST: (id: string) => `/post/v1/publish/${id}`,
};
