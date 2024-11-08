const async = require('async');
const xlsx = require('xlsx');
const Candidate = require('../models/candidateModel');

exports.uploadCandidates = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    await async.eachSeries(data, async (row) => {
      // Check if candidate email already exists in the database
      const existingCandidate = await Candidate.findOne({ email: row["Email"] });
      // Skip this candidate if duplicate is found
      if (existingCandidate) {
        console.log(`Duplicate email found: ${row["Email"]}. Skipping this candidate.`);
        return; 
      }

      // Create a new candidate object and save it to the database
      const candidate = {
        name: row["Name of the Candidate"],
        email: row["Email"],
        mobileNo: row["Mobile No."],
        dob: row["Date of Birth"],
        workExperience: row["Work Experience"],
        resumeTitle: row["Resume Title"],
        currentLocation: row["Current Location"],
        postalAddress: row["Postal Address"],
        currentEmployer: row["Current Employer"],
        currentDesignation: row["Current Designation"]
      };
// Save candidate data to MongoDB
      await Candidate.create(candidate); 
    });

    res.status(200).json({ message: "Candidates uploaded successfully, with duplicates skipped!" });
  } catch (error) {
    console.error("Error uploading candidates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
