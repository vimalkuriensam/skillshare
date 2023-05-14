export const PROFILE_MANDATORY_FIELDS = {
  1: {
    fields: [
      "firstName",
      "lastName",
      "dob",
      "phone",
      "addressLine1",
      "city",
      "pincode",
    ],
    error: {
      firstName: "First Name is required field",
      lastName: "Last Name is required field",
      dob: "Please enter a date of birth",
      phone: "Please enter a valid phone number",
      addressLine1: "Please enter an address for line 1",
      city: "Please enter a city and country",
      pincode: "Please enter a valid pincode",
    },
  },
  2: {
    fields: ["companyName", "startDate", "city"],
    error: {
      companyName: "Please enter the company name",
      startDate: "Please enter the start date",
      endDate: "Please enter the end date or check the currently working box",
      city: "Please select the city",
    },
  },
};

export const USER_FIELDS = {
  workExperience: {
    companyName: "",
    startDate: "",
    endDate: "",
    current: false,
    city: "",
    summary: "",
  },
  skills: {
    skill: "",
    proficiency: "",
  },
  languages: { language: "", proficiency: "" },
};

export const DISPLAY_VALUES_CONSTANT = {
  basicInfo: { country: [], city: [] },
  workExperience: [{ country: [], city: [] }],
};
