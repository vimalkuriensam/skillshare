import { USER_TYPES } from "../../../../utils/data";

export const NAVCONTENTS = [
  {
    title: "dashboard",
    link: "/dashboard",
    icon: "Dashboard",
    type: USER_TYPES.USER,
  },
  {
    title: "dashboard",
    link: "/recruiter-dashboard",
    icon: "Dashboard",
    type: USER_TYPES.RECRUITER,
  },
  {
    title: "profile",
    link: "/profile",
    icon: "Notepad",
    type: USER_TYPES.COMMON,
  },
  {
    title: "settings",
    link: "/settings",
    icon: "Gear",
    type: USER_TYPES.COMMON,
  },
];
