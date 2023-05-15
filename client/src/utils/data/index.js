export const Capitalize = (content) => content.toUpperCase();

export const ObjectCopy = (content = {}) => JSON.parse(JSON.stringify(content));

export const USER_TYPES = {
  RECRUITER: "RECRUITER",
  USER: "USER",
  COMMON: "COMMON",
};
