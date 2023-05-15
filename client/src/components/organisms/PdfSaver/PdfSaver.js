import React from "react";

import {
  Document,
  Page,
  Text,
  View,
  pdf,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  headingMain: {
    textAlign: "right",
  },
  headingTitle: {
    fontSize: "26px",
    color: "#000",
  },
  headingSubTitle: {
    fontSize: "18px",
    color: "#bbb",
  },
  divider: {
    height: "30px",
    backgroundColor: "#000",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "5px",
  },
  headingTitleWhite: {
    fontSize: "18px",
    color: "#fff",
  },
  experienceItem: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  companyName: {
    fontSize: "16px",
    fontWeight: "bold",
    width: "200px",
  },
  dateRange: {
    fontSize: "14px",
    color: "#727272",
    marginLeft: "10px",
  },
});

const PdfSaver = ({ user = {} }) => {
  console.log("user", user);
  return (
    <Document>
      <Page
        size="A4"
        style={{
          backgroundColor: "#fff",
          padding: "15px 48px 55px 48px",
        }}
      >
        <View>
          <View style={styles.headingMain}>
            <Text
              style={styles.headingTitle}
            >{`${user.first_name} ${user.middle_name} ${user.last_name}`}</Text>
            <Text style={styles.headingSubTitle}>{user.email}</Text>
            <Text style={styles.headingSubTitle}>{user.city_id}</Text>
            <Text style={styles.headingSubTitle}>{user.phone}</Text>
          </View>
          <View style={styles.divider}>
            <Text style={styles.headingTitleWhite}>Work Experience</Text>
          </View>
          <View>
            {user.work_experience.map((experience, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.companyName}>
                  {experience.company_name}
                </Text>
                <Text style={styles.dateRange}>
                  {`${experience.start_date} - ${
                    experience.current ? "Current" : experience.end_date
                  }`}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.divider}>
            <Text style={styles.headingTitleWhite}>Skills</Text>
          </View>
          <View>
            {user.skills.map((skill, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.companyName}>{skill.skill_id}</Text>
                <Text style={styles.dateRange}>{skill.proficiency}</Text>
              </View>
            ))}
          </View>
          <View style={styles.divider}>
            <Text style={styles.headingTitleWhite}>Languages</Text>
          </View>
          <View>
            {user.languages.map((language, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.companyName}>{language.language_id}</Text>
                <Text style={styles.dateRange}>{language.proficiency}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfSaver;
