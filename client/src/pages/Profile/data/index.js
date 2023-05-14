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
};
